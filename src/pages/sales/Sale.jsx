import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Stack,
  FormControlLabel,
  Checkbox,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Tooltip from "@mui/material/Tooltip";

// Mock data for demonstration
const mockArticles = [
  { id: 1, name: "Продукт 1", price: 10 },
  { id: 2, name: "Продукт 2", price: 20 },
  // Add more mock articles...
];

const mockClients = [
  { id: 1, name: "Клиент 1", accPerson: "Го6о Пе6ев" },
  { id: 2, name: "Клиент 2" },
  // Add more mock clients...
];

export default function Sale() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [sale, setSale] = useState({
    client: {
      name: "",
      number: "",
      vatNumber: "",
      accPerson: "",
      address: "",
    },
    items: [
      {
        article: null,
        quantity: 1,
        price: 0,
        discount: 0,
        total: 0,
      },
    ],
    subtotal: 0,
    discount: 0,
    vat: 0,
    total: 0,
    createInvoice: false,
  });

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (isEditMode) {
      // TODO: Fetch sale data from API
      // setSale(fetchedSaleData);
    }
  }, [isEditMode, id]);

  const handleClientChange = (_, newValue) => {
    if (newValue) {
      setSale((prev) => ({
        ...prev,
        client: {
          name: newValue.name || "",
          number: newValue.number || "",
          vatNumber: newValue.vatNumber || "",
          accPerson: newValue.accPerson || "",
          address: newValue.address || "",
        },
      }));
    }
  };

  const handleClientFieldChange = (field, value) => {
    setSale((prev) => ({
      ...prev,
      client: {
        ...prev.client,
        [field]: value,
      },
    }));
  };

  const handleItemChange = (index, field, value) => {
    setSale((prev) => {
      const newItems = [...prev.items];
      const item = { ...newItems[index] };

      if (field === "article") {
        item.article = value;
        item.price = value?.price || 0;
      } else {
        // Handle empty or invalid values
        if (field === "price" || field === "quantity" || field === "discount") {
          item[field] = value === "" || isNaN(value) ? 0 : value;
        } else {
          item[field] = value;
        }
      }

      // Calculate total with proper number handling
      const quantity = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.price) || 0;
      const discount = parseFloat(item.discount) || 0;
      item.total = quantity * price * (1 - discount / 100);

      newItems[index] = item;

      // Calculate subtotal with proper number handling
      const subtotal = newItems.reduce((sum, item) => {
        const itemTotal = parseFloat(item.total) || 0;
        return sum + itemTotal;
      }, 0);

      const vat = subtotal * 0.2; // 20% VAT
      const totalDiscount = parseFloat(prev.discount) || 0;
      const total = (subtotal + vat) * (1 - totalDiscount / 100);

      return {
        ...prev,
        items: newItems,
        subtotal,
        vat,
        total,
      };
    });
  };

  const handleAddItem = () => {
    setSale((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          article: null,
          quantity: 1,
          price: 0,
          discount: 0,
          total: 0,
        },
      ],
    }));
  };

  const handleRemoveItem = (index) => {
    setSale((prev) => {
      const newItems = prev.items.filter((_, i) => i !== index);
      const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
      const vat = subtotal * 0.2; // 20% VAT
      const total = (subtotal + vat) * (1 - prev.discount / 100);

      return {
        ...prev,
        items: newItems,
        subtotal,
        vat,
        total,
      };
    });
  };

  const handleDiscountChange = (event) => {
    const discount = parseFloat(event.target.value) || 0;
    setSale((prev) => {
      const subtotal = prev.items.reduce((sum, item) => {
        const itemTotal = parseFloat(item.total) || 0;
        return sum + itemTotal;
      }, 0);
      const vat = subtotal * 0.2;
      const total = (subtotal + vat) * (1 - discount / 100);

      return {
        ...prev,
        discount,
        total,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save API call
    console.log("Saving sale:", sale);
    navigate("/sales");
  };

  const handleOpenNewClientWithName = () => {
    setSearchText((prev) => prev);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper
        elevation={0}
        sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          {isEditMode ? "Редактиране на продажба" : "Нова продажба"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ mt: 2 }}>
              <Autocomplete
                options={mockClients}
                getOptionLabel={(option) => option.name || ""}
                value={sale.client.name ? sale.client : null}
                onChange={handleClientChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Търсене на клиент"
                    size="small"
                    fullWidth
                  />
                )}
                sx={{ mb: 2 }}
              />

              <Paper
                elevation={0}
                sx={{ p: 2, border: "1px solid", borderColor: "divider" }}
              >
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Фирма"
                    value={sale.client.name}
                    onChange={(e) =>
                      handleClientFieldChange("name", e.target.value)
                    }
                    required
                  />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="ЕИК"
                      value={sale.client.number}
                      onChange={(e) =>
                        handleClientFieldChange("number", e.target.value)
                      }
                      required
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="ЗДДС"
                      value={sale.client.vatNumber}
                      onChange={(e) =>
                        handleClientFieldChange("vatNumber", e.target.value)
                      }
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="МОЛ"
                      value={sale.client.accPerson}
                      onChange={(e) =>
                        handleClientFieldChange("accPerson", e.target.value)
                      }
                      required
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Адрес"
                      value={sale.client.address}
                      onChange={(e) =>
                        handleClientFieldChange("address", e.target.value)
                      }
                      required
                    />
                  </Stack>
                </Stack>
              </Paper>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 2 }}>
                Артикули
              </Typography>

              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ border: "1px solid", borderColor: "divider" }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Описание</TableCell>
                      <TableCell width={120}>Количество</TableCell>
                      <TableCell width={120}>Ед. цена</TableCell>
                      <TableCell width={120}>Отстъпка (%)</TableCell>
                      <TableCell width={120}>Обща сума</TableCell>
                      <TableCell width={70} align="center">
                        Действия
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sale.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Autocomplete
                            size="small"
                            options={mockArticles}
                            getOptionLabel={(option) => option.name || ""}
                            value={item.article}
                            onChange={(_, newValue) =>
                              handleItemChange(index, "article", newValue)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                required
                                placeholder="Изберете артикул"
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={item.quantity || ""}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            required
                            fullWidth
                            inputProps={{ min: 1 }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={item.price || ""}
                            onChange={(e) =>
                              handleItemChange(index, "price", e.target.value)
                            }
                            required
                            fullWidth
                            inputProps={{ min: 0 }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={item.discount || ""}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "discount",
                                e.target.value
                              )
                            }
                            fullWidth
                            inputProps={{ min: 0, max: 100 }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={item.total.toFixed(2)}
                            disabled
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleRemoveItem(index)}
                            disabled={sale.items.length === 1}
                            size="small"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddItem}
                  variant="contained"
                  size="small"
                  sx={{ height: "fit-content" }}
                >
                  Нов артикул
                </Button>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    minWidth: 300,
                  }}
                >
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Сума:</Typography>
                      <Typography>{sale.subtotal.toFixed(2)} BGN</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>ДДС (20%):</Typography>
                      <Typography>{sale.vat.toFixed(2)} BGN</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>Отстъпка (%):</Typography>
                      <TextField
                        size="small"
                        type="number"
                        value={sale.discount}
                        onChange={handleDiscountChange}
                        sx={{ width: 120 }}
                        inputProps={{ min: 0, max: 100 }}
                      />
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography fontWeight="500">Общо:</Typography>
                      <Typography fontWeight="600">
                        {sale.total.toFixed(2)} BGN
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Stack>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={sale.createInvoice}
                  onChange={(e) =>
                    setSale((prev) => ({
                      ...prev,
                      createInvoice: e.target.checked,
                    }))
                  }
                />
              }
              label="Създай фактура"
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={() => navigate("/sales")}
              >
                Отказ
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Запази
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
