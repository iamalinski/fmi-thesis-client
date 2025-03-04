import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Autocomplete,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid2,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data for demonstration
const mockClients = [
  { 
    name: "Фирма 1", 
    number: "123456789",
    vatNumber: "BG123456789",
    accPerson: "Иван Иванов",
    address: "ул. Първа 1, София"
  },
  // Add more mock clients...
];

const mockArticles = [
  {
    id: 1,
    name: "Продукт 1",
    price: 100,
  },
  // Add more mock articles...
];

// Client Form Component
const ClientForm = React.memo(({ client, onChange }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Autocomplete
        options={mockClients}
        getOptionLabel={(option) => option.name || ''}
        value={client.name ? client : null}
        onChange={(_, newValue) => onChange(newValue || { name: '', number: '', vatNumber: '', accPerson: '', address: '' })}
        renderInput={(params) => (
          <TextField {...params} label="Търсене на клиент" size="small" fullWidth />
        )}
        sx={{ mb: 2 }}
      />
      
      <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
        <Stack spacing={2}>
              <TextField
                fullWidth
                size="small"
                label="Фирма"
                name="name"
            value={client.name}
            onChange={(e) => onChange({ ...client, name: e.target.value })}
                required
              />
          <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="ЕИК"
                    name="number"
              value={client.number}
              onChange={(e) => onChange({ ...client, number: e.target.value })}
                    required
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="ЗДДС"
                    name="vatNumber"
              value={client.vatNumber}
              onChange={(e) => onChange({ ...client, vatNumber: e.target.value })}
                  />
          </Stack>
              <TextField
                fullWidth
                size="small"
                label="МОЛ"
                name="accPerson"
            value={client.accPerson}
            onChange={(e) => onChange({ ...client, accPerson: e.target.value })}
                required
              />
              <TextField
                fullWidth
                size="small"
                label="Адрес"
                name="address"
            value={client.address}
            onChange={(e) => onChange({ ...client, address: e.target.value })}
                required
              />
        </Stack>
            </Paper>
    </Box>
  );
});

// Article Row Component
const ArticleRow = React.memo(({ item, index, onItemChange, onRemove, isOnly }) => {
  return (
    <TableRow>
      <TableCell>
        <Autocomplete
                    size="small"
          options={mockArticles}
          getOptionLabel={(option) => option.name || ''}
          value={mockArticles.find(article => article.name === item.description) || null}
          renderInput={(params) => (
                  <TextField
              {...params}
                    required
                fullWidth
                size="small"
              placeholder="Изберете артикул"
            />
          )}
          onChange={(_, newValue) => {
            onItemChange(index, {
              ...item,
              description: newValue?.name || '',
              unitPrice: newValue?.price || 0,
              totalPrice: (newValue?.price || 0) * item.quantity * (1 - item.discount / 100)
            });
          }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
            const quantity = parseFloat(e.target.value) || 0;
            onItemChange(index, {
              ...item,
              quantity,
              totalPrice: item.unitPrice * quantity * (1 - item.discount / 100)
            });
                        }}
                        required
          fullWidth
          inputProps={{ min: 1 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => {
            const unitPrice = parseFloat(e.target.value) || 0;
            onItemChange(index, {
              ...item,
              unitPrice,
              totalPrice: unitPrice * item.quantity * (1 - item.discount / 100)
            });
                        }}
                        required
          fullWidth
          inputProps={{ min: 0 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.discount}
                        onChange={(e) => {
            const discount = parseFloat(e.target.value) || 0;
            onItemChange(index, {
              ...item,
              discount,
              totalPrice: item.unitPrice * item.quantity * (1 - discount / 100)
            });
          }}
          fullWidth
          inputProps={{ min: 0, max: 100 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={item.totalPrice.toFixed(2)}
                        disabled
          fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
          onClick={() => onRemove(index)}
                        color="error"
          disabled={isOnly}
          size="small"
                      >
          <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
});

// Articles Table Component
const ArticlesTable = React.memo(({ items, onItemChange, onItemRemove, onItemAdd }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Описание</TableCell>
              <TableCell width={120}>Количество</TableCell>
              <TableCell width={120}>Ед. цена</TableCell>
              <TableCell width={120}>Отстъпка (%)</TableCell>
              <TableCell width={120}>Обща сума</TableCell>
              <TableCell width={70} align="center">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <ArticleRow
                key={index}
                item={item}
                index={index}
                onItemChange={onItemChange}
                onRemove={onItemRemove}
                isOnly={items.length === 1}
              />
            ))}
            </TableBody>
          </Table>
        </TableContainer>

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <Button
          startIcon={<AddIcon />}
          onClick={onItemAdd}
            variant="contained"
            size="small"
          sx={{ height: 'fit-content' }}
          >
          Добави ред
          </Button>

        <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', minWidth: 300 }}>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Сума:</Typography>
              <Typography fontWeight="500">
                {items.reduce((sum, item) => sum + (item.totalPrice || 0), 0).toFixed(2)} лв.
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography>ДДС (20%):</Typography>
              <Typography fontWeight="500">
                {(items.reduce((sum, item) => sum + (item.totalPrice || 0), 0) * 0.2).toFixed(2)} лв.
                </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight="500">Общо:</Typography>
              <Typography fontWeight="600">
                {(items.reduce((sum, item) => sum + (item.totalPrice || 0), 0) * 1.2).toFixed(2)} лв.
                </Typography>
            </Stack>
          </Stack>
            </Paper>
      </Stack>
    </Box>
  );
});

// Details Form Component
const DetailsForm = React.memo(({ details, onChange }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              size="small"
              label="Номер"
              name="invoiceNumber"
              value={details.invoiceNumber}
              onChange={(e) => onChange({ ...details, invoiceNumber: e.target.value })}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="small"
              label="Дата"
              type="date"
              name="invoiceDate"
              value={details.invoiceDate}
              onChange={(e) => onChange({ ...details, invoiceDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6} />
          
          <Grid item xs={3}>
            <FormControl size="small" fullWidth>
                <InputLabel>Начин на плащане</InputLabel>
                <Select
                label="Начин на плащане"
                  name="paymentMethod"
                value={details.paymentMethod}
                onChange={(e) => onChange({ ...details, paymentMethod: e.target.value })}
                  required
                >
                <MenuItem value="Cash">В брой</MenuItem>
                <MenuItem value="Bank">Банков превод</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={3}>
              <TextField
                size="small"
                label="Падеж"
                type="date"
                name="dueDate"
              value={details.dueDate}
              onChange={(e) => onChange({ ...details, dueDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              fullWidth
              />
          </Grid>
          <Grid item xs={3}>
              <TextField
                size="small"
                label="Място на сделката"
                name="dealLocation"
              value={details.dealLocation}
              onChange={(e) => onChange({ ...details, dealLocation: e.target.value })}
                required
              fullWidth
              />
          </Grid>
          <Grid item xs={3}>
              <TextField
                size="small"
              label="Съставил"
                name="author"
              value={details.author}
              onChange={(e) => onChange({ ...details, author: e.target.value })}
                required
              fullWidth
              />
          </Grid>
        </Grid>
        </Paper>
    </Box>
  );
});

// Validation functions
const isClientValid = (client) => {
  return (
    client.name?.trim() !== '' &&
    client.number?.trim() !== '' &&
    client.accPerson?.trim() !== '' &&
    client.address?.trim() !== ''
  );
};

const isArticlesValid = (items) => {
  return items.every(item => 
    item.description?.trim() !== '' &&
    item.quantity > 0 &&
    item.unitPrice > 0
  );
};

const isDetailsValid = (details) => {
  return (
    details.invoiceNumber?.trim() !== '' &&
    details.invoiceDate?.trim() !== '' &&
    details.paymentMethod?.trim() !== '' &&
    details.dueDate?.trim() !== '' &&
    details.dealLocation?.trim() !== '' &&
    details.author?.trim() !== ''
  );
};

export default function Invoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [activeStep, setActiveStep] = useState(0);
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    paymentMethod: "",
    seller: {
      name: "Моята Фирма ООД",
      number: "987654321",
      vatNumber: "BG987654321",
      accPerson: "Петър Петров",
      address: "ул. Втора 2, София",
      bankAccount: "BG11XXXX00001234567890",
    },
    buyer: {
      name: "",
      number: "",
      vatNumber: "",
      accPerson: "",
      address: "",
    },
    items: [
      {
        description: "",
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        totalPrice: 0,
      },
    ],
    subtotal: 0,
    vat: 0,
    totalAmount: 0,
    dealLocation: "София",
    author: "Админ",
  });

  const steps = [
    {
      label: 'Клиент',
      description: 'Изберете или въведете данни за клиент',
    },
    {
      label: 'Артикули',
      description: 'Добавете артикули към фактурата',
    },
    {
      label: 'Детайли',
      description: 'Попълнете допълнителна информация',
    },
  ];

  const handleClientChange = useCallback((newClient) => {
    setInvoice(prev => ({ ...prev, buyer: newClient }));
  }, []);

  const handleItemChange = useCallback((index, newItem) => {
    setInvoice(prev => {
      const newItems = [...prev.items];
      newItems[index] = newItem;
      return { ...prev, items: newItems };
    });
  }, []);

  const handleItemRemove = useCallback((index) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  }, []);

  const handleItemAdd = useCallback(() => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0, discount: 0, totalPrice: 0 }]
    }));
  }, []);

  const handleDetailsChange = useCallback((newDetails) => {
    setInvoice(prev => ({
      ...prev,
      ...newDetails
    }));
  }, []);

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

  const isStepValid = useCallback((step) => {
    switch (step) {
      case 0:
        return isClientValid(invoice.buyer);
      case 1:
        return isArticlesValid(invoice.items);
      case 2:
        return isDetailsValid(invoice);
      default:
        return false;
    }
  }, [invoice]);

  React.useEffect(() => {
    if (isEditMode) {
      // TODO: Fetch invoice data from API
      // setInvoice(fetchedInvoiceData);
    }
  }, [isEditMode, id]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          {isEditMode ? 'Редактиране на фактура' : 'Нова фактура'}
        </Typography>
        
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 3 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="subtitle1" fontWeight={500}>
                  {step.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {step.description}
                </Typography>
              </StepLabel>
              <StepContent>
                {index === 0 && (
                  <ClientForm
                    client={invoice.buyer}
                    onChange={handleClientChange}
                  />
                )}
                {index === 1 && (
                  <ArticlesTable
                    items={invoice.items}
                    onItemChange={handleItemChange}
                    onItemRemove={handleItemRemove}
                    onItemAdd={handleItemAdd}
                  />
                )}
                {index === 2 && (
                  <DetailsForm
                    details={invoice}
                    onChange={handleDetailsChange}
                  />
                )}
                
                <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          <Button
            variant="outlined"
                    disabled={index === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    startIcon={<NavigateBeforeIcon />}
                  >
                    Назад
          </Button>
                  {index === steps.length - 1 ? (
          <Button
            variant="contained"
                      onClick={handleSubmit}
                      startIcon={<SaveIcon />}
                      disabled={!isStepValid(index)}
          >
            Запази
          </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(prev => prev + 1)}
                      endIcon={<NavigateNextIcon />}
                      disabled={!isStepValid(index)}
                    >
                      Напред
                    </Button>
                  )}
                </Stack>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Container>
  );
}
