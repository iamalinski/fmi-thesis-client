import { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  InputAdornment,
  Stack,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DeleteConfirmationDialog from '../../components/common/DeleteConfirmationDialog';

const mockInvoices = Array.from({ length: 50 }, (_, index) => ({
  id: `INV-${2024}${String(index + 1).padStart(4, "0")}`,
  date: new Date(2024, 0, index + 1).toLocaleDateString("bg-BG"),
  client: `Клиент ${index + 1}`,
  amount: (Math.random() * 10000).toFixed(2),
  status: ["paid", "pending", "overdue"][Math.floor(Math.random() * 3)],
}));

const statusColors = {
  paid: "success",
  pending: "warning",
  overdue: "error",
};

const statusLabels = {
  paid: "Платена",
  pending: "Чакаща",
  overdue: "Просрочена",
};

export default function Invoices() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    client: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateInvoice = () => {
    navigate("/invoices/new");
  };

  const handleOpenMenu = (event, invoice) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const handleRowClick = (invoice) => {
    navigate(`/invoices/${invoice.id}`);
  };

  const handleView = () => {
    navigate(`/invoices/${selectedInvoice.id}`);
    handleCloseMenu();
  };

  const handleEdit = () => {
    navigate(`/invoices/edit/${selectedInvoice.id}`);
    handleCloseMenu();
  };

  const handleDeleteClick = (invoice) => {
    setInvoiceToDelete(invoice);
    setDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete API call
    console.log('Deleting invoice:', invoiceToDelete.id);
    setDeleteDialogOpen(false);
    setInvoiceToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setInvoiceToDelete(null);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(0);
  };

  const hasActiveFilters = () => {
    return filters.search !== "" || filters.client !== "" || filters.status !== "all";
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      client: "",
      status: "all",
    });
    setPage(0);
  };

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch = invoice.id
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === "all" || invoice.status === filters.status;
    const matchesClient = invoice.client
      .toLowerCase()
      .includes(filters.client.toLowerCase());

    return matchesSearch && matchesStatus && matchesClient;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Фактури
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateInvoice}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
        >
          Нова фактура
        </Button>
      </Box>
      <Divider sx={{ mt: 3, mb: 3 }} />
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            width: "auto",
            "& .MuiGrid-root": { minWidth: "auto" },
          }}
        >
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <TextField
                  size="small"
                  label="Номер"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  sx={{ width: "180px" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  size="small"
                  label="Клиент"
                  name="client"
                  value={filters.client}
                  onChange={handleFilterChange}
                  sx={{ width: "180px" }}
                />
              </Grid>
              <Grid item>
                <FormControl size="small" sx={{ width: "180px" }}>
                  <InputLabel>Статус</InputLabel>
                  <Select
                    label="Статус"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="all">Всички</MenuItem>
                    <MenuItem value="paid">Платени</MenuItem>
                    <MenuItem value="pending">Чакащи</MenuItem>
                    <MenuItem value="overdue">Просрочени</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              size="small"
              startIcon={<ClearIcon />}
              disabled={!hasActiveFilters()}
              onClick={handleClearFilters}
              sx={{
                textTransform: 'none',
                color: 'error.main',
                '&.Mui-disabled': {
                  opacity: 0.5,
                }
              }}
            >
              Изчисти филтрите
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: "140px" }}>
                  Номер
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Клиент</TableCell>
                <TableCell sx={{ fontWeight: 600, width: "120px" }}>
                  Дата
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, width: "120px" }}
                  align="right"
                >
                  Сума
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "100px" }}>
                  Статус
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, width: "60px" }}
                  align="center"
                >
                  Опции
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInvoices
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    hover
                    onClick={() => handleRowClick(invoice)}
                    sx={{
                      cursor: 'pointer',
                      '&:last-child td, &:last-child th': { border: 0 },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ width: "140px" }}
                    >
                      {invoice.id}
                    </TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell sx={{ width: "120px" }}>
                      {invoice.date}
                    </TableCell>
                    <TableCell align="right" sx={{ width: "120px" }}>
                      {invoice.amount} BGN
                    </TableCell>
                    <TableCell sx={{ width: "100px" }}>
                      <Chip
                        label={statusLabels[invoice.status]}
                        color={statusColors[invoice.status]}
                        size="small"
                        sx={{
                          fontWeight: 500,
                          minWidth: 80,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      padding="none"
                      align="center"
                      sx={{ width: "60px" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconButton
                        size="small"
                        onClick={(event) => handleOpenMenu(event, invoice)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredInvoices.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Редове на страница:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} от ${count}`
          }
        />
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
            mt: 1,
            borderRadius: 2,
            minWidth: 150,
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1,
              borderRadius: 1,
              mx: 0.5,
            },
          },
        }}
      >
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Преглед</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" color="warning" />
          </ListItemIcon>
          <ListItemText>Редакция</ListItemText>
        </MenuItem>
        <MenuItem 
          onClick={() => handleDeleteClick(selectedInvoice)}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Изтрий</ListItemText>
        </MenuItem>
      </Menu>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={`фактура ${invoiceToDelete?.id}`}
      />
    </Box>
  );
}
