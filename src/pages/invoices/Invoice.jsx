import React, { useState } from "react";

// libraries
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function Invoice() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    currency: "BGN",
    paymentMethod: "",
    seller: {
      name: "",
      address: "",
      vatNumber: "",
      bankAccount: "",
    },
    buyer: {
      name: "",
      address: "",
      vatNumber: "",
    },
    items: [
      {
        description: "",
        quantity: 0,
        unitPrice: 0,
        discount: 0,
        totalPrice: 0,
      },
    ],
    subtotal: 0,
    vat: 0,
    totalAmount: 0,
    dealLocation: "",
    author: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSellerChange(e) {
    const { name, value } = e.target;

    setInvoice((prev) => ({
      ...prev,
      seller: {
        ...prev.seller,
        [name]: value,
      },
    }));
  }

  function handleBuyerChange(e) {
    const { name, value } = e.target;

    setInvoice((prev) => ({
      ...prev,
      buyer: {
        ...prev.buyer,
        [name]: value,
      },
    }));
  }

  function handleItemChange(index, e) {
    const { name, value } = e.target;
    const updatedItems = [...invoice.items];

    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };

    if (name === "quantity" || name === "unitPrice" || name === "discount") {
      const quantity = parseFloat(updatedItems[index].quantity) || 0;
      const unitPrice = parseFloat(updatedItems[index].unitPrice) || 0;
      const discount = parseFloat(updatedItems[index].discount) || 0;

      const totalBeforeDiscount = quantity * unitPrice;
      const discountAmount = (totalBeforeDiscount * discount) / 100;
      updatedItems[index].totalPrice = totalBeforeDiscount - discountAmount;
    }

    setInvoice((prev) => ({
      ...prev,
      items: updatedItems,
    }));

    const subtotal = updatedItems.reduce((sum, item) => {
      return sum + item.totalPrice;
    }, 0);
    const vat = subtotal * 0.2;
    const totalAmount = subtotal + vat;

    setInvoice((prev) => ({
      ...prev,
      subtotal,
      vat,
      totalAmount,
    }));
  }

  function handleAddItem() {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          quantity: 1,
          unitPrice: 0,
          discount: 0,
          totalPrice: 0,
        },
      ],
    }));
  }

  function handleRemoveItem(index) {
    const updatedItems = invoice.items.filter((_, i) => {
      return i !== index;
    });

    setInvoice((prev) => ({
      ...prev,
      items: updatedItems,
    }));

    const subtotal = updatedItems.reduce((sum, item) => {
      return sum + item.totalPrice;
    }, 0);
    const vat = subtotal * 0.2;
    const totalAmount = subtotal + vat;

    setInvoice((prev) => ({
      ...prev,
      subtotal,
      vat,
      totalAmount,
    }));
  }

  function isPaymentMethodBank() {
    return invoice.paymentMethod === "Bank";
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Invoice Submitted:", invoice);
  }

  function handleCancel() {
    console.log("Invoice Cancelled");
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid2 container spacing={2} sx={{ mb: 1.5 }}>
          <Grid2 item size={4}>
            <Paper elevation={1} sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>
                Клиент
              </Typography>
              <TextField
                fullWidth
                size="small"
                label="Фирма"
                name="name"
                value={invoice.buyer.name}
                onChange={handleBuyerChange}
                required
                autoFocus
                sx={{ mb: 1.5 }}
              />
              <Grid2 container spacing={1}>
                <Grid2 item size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="ЕИК"
                    name="number"
                    value={invoice.buyer.number}
                    onChange={handleBuyerChange}
                    sx={{ mb: 1.5 }}
                    required
                  />
                </Grid2>
                <Grid2 item size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="ЗДДС"
                    name="vatNumber"
                    value={invoice.buyer.vatNumber}
                    onChange={handleBuyerChange}
                    sx={{ mb: 1.5 }}
                  />
                </Grid2>
              </Grid2>
              <TextField
                fullWidth
                size="small"
                label="МОЛ"
                name="accPerson"
                value={invoice.buyer.accPerson}
                onChange={handleBuyerChange}
                required
                sx={{ mb: 1.5 }}
              />
              <TextField
                fullWidth
                size="small"
                label="Адрес"
                name="address"
                value={invoice.buyer.address}
                onChange={handleBuyerChange}
                required
              />
            </Paper>
          </Grid2>

          <Grid2 item size={4}>
            <Paper elevation={1} sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>
                Нова фактура
              </Typography>
              <Grid2 container spacing={1}>
                <Grid2 item size={7}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Номер"
                    name="invoiceNumber"
                    value={invoice.invoiceNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Grid2>
                <Grid2 item size={5}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Дата"
                    type="date"
                    name="invoiceDate"
                    value={invoice.invoiceDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid2>
              </Grid2>
            </Paper>
          </Grid2>

          <Grid2 item size={4}>
            <Paper elevation={1} sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>
                Доставчик
              </Typography>
              <TextField
                fullWidth
                size="small"
                label="Фирма"
                name="name"
                value={invoice.seller.name}
                onChange={handleSellerChange}
                required
                sx={{ mb: 1.5 }}
              />
              <Grid2 container spacing={1}>
                <Grid2 item size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="ЕИК"
                    name="number"
                    value={invoice.seller.number}
                    onChange={handleSellerChange}
                    sx={{ mb: 1.5 }}
                    required
                  />
                </Grid2>
                <Grid2 item size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="ЗДДС"
                    name="vatNumber"
                    value={invoice.seller.vatNumber}
                    onChange={handleSellerChange}
                    sx={{ mb: 1.5 }}
                  />
                </Grid2>
              </Grid2>
              <TextField
                fullWidth
                size="small"
                label="МОЛ"
                name="accPerson"
                value={invoice.seller.accPerson}
                onChange={handleSellerChange}
                required
                sx={{ mb: 1.5 }}
              />
              <TextField
                fullWidth
                size="small"
                label="Адрес"
                name="address"
                value={invoice.seller.address}
                onChange={handleSellerChange}
                required
                sx={{ mb: isPaymentMethodBank() ? 1.5 : 0 }}
              />

              {isPaymentMethodBank() ? (
                <TextField
                  fullWidth
                  size="small"
                  label="Банкова Сметка"
                  name="bankAccount"
                  value={invoice.seller.bankAccount}
                  onChange={handleSellerChange}
                  required
                />
              ) : (
                <></>
              )}
            </Paper>
          </Grid2>
        </Grid2>

        <Typography variant="h6" gutterBottom>
          Продукти/Услуги
        </Typography>
        <TableContainer component={Paper} elevation={1} sx={{ mb: 1.5 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Описание</TableCell>
                <TableCell>Количество</TableCell>
                <TableCell>Ед. цена</TableCell>
                <TableCell>Отстъпка (%)</TableCell>
                <TableCell>Обща сума</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.items.map(function (item, index) {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        name="description"
                        value={item.description}
                        onChange={(e) => {
                          handleItemChange(index, e);
                        }}
                        autoFocus={invoice.items.length > 1}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => {
                          handleItemChange(index, e);
                        }}
                        required
                        sx={{ width: "75px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        name="unitPrice"
                        value={item.unitPrice}
                        onChange={(e) => {
                          handleItemChange(index, e);
                        }}
                        required
                        sx={{ width: "100px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        name="discount"
                        value={item.discount}
                        onChange={(e) => {
                          handleItemChange(index, e);
                        }}
                        sx={{ width: "75px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        name="totalPrice"
                        value={item.totalPrice.toFixed(2)}
                        disabled
                        sx={{ width: "120px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          handleRemoveItem(index);
                        }}
                        color="error"
                        disabled={invoice.items.length === 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid2
          container
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 1.5 }}
        >
          <Button
            onClick={handleAddItem}
            variant="contained"
            size="small"
            sx={{ mb: 1.5, minWidth: 0 }}
          >
            <AddIcon />
          </Button>
          <Grid2 item size={4}>
            <Paper elevation={1} sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>
                Общо
              </Typography>
              <Grid2 container sx={{ p: 0.1 }} justifyContent="space-between">
                <Typography variant="body1" gutterBottom>
                  Сума:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {invoice.subtotal.toFixed(2)} BGN
                </Typography>
              </Grid2>
              <Grid2 container sx={{ p: 0.1 }} justifyContent="space-between">
                <Typography variant="body1" gutterBottom>
                  ДДС (20%):
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {invoice.vat.toFixed(2)} BGN
                </Typography>
              </Grid2>
              <Grid2 container sx={{ p: 0.1 }} justifyContent="space-between">
                <Typography variant="body1">Крайна сума:</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {invoice.totalAmount.toFixed(2)} BGN
                </Typography>
              </Grid2>
            </Paper>
          </Grid2>
        </Grid2>

        <Typography variant="h6" gutterBottom>
          Допълнителна информация
        </Typography>
        <Paper elevation={1} sx={{ p: 1, mb: 2 }}>
          <Grid2 container spacing={1}>
            <Grid2 item size={2.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Начин на плащане</InputLabel>
                <Select
                  label="Начин на Плащане"
                  name="paymentMethod"
                  value={invoice.paymentMethod}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="Cash">В Брой</MenuItem>
                  <MenuItem value="Bank">Банков Превод</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 item size={1.8}>
              <TextField
                fullWidth
                size="small"
                label="Падеж"
                type="date"
                name="dueDate"
                value={invoice.dueDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid2>
            <Grid2 item size={3.8}>
              <TextField
                fullWidth
                size="small"
                label="Място на сделката"
                name="dealLocation"
                value={invoice.dealLocation}
                onChange={handleInputChange}
                required
              />
            </Grid2>
            <Grid2 item size={3.9}>
              <TextField
                fullWidth
                size="small"
                label="Автор"
                name="author"
                value={invoice.author}
                onChange={handleInputChange}
                required
              />
            </Grid2>
          </Grid2>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              textTransform: "none",
            }}
          >
            Отказ
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "140px",
              textTransform: "none",
            }}
          >
            Запази
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
