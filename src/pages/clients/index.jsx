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
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from '../../components/common/DeleteConfirmationDialog';

// Mock data for clients
const mockClients = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: `Фирма ${index + 1}`,
  number: `${123456780 + index}`,
  vatNumber: `BG${123456780 + index}`,
  accPerson: `Управител ${index + 1}`,
  address: `ул. Примерна ${index + 1}, гр. София`,
  createdAt: new Date(2024, 0, index + 1).toLocaleDateString("bg-BG"),
}));

export default function Clients() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [clientData, setClientData] = useState({
    name: '',
    number: '',
    vatNumber: '',
    accPerson: '',
    address: '',
  });
  const [filters, setFilters] = useState({
    search: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateClient = () => {
    setClientData({
      name: '',
      number: '',
      vatNumber: '',
      accPerson: '',
      address: '',
    });
    setEditMode(false);
    setClientFormOpen(true);
  };

  const handleOpenMenu = (event, client) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setClientData({
      name: selectedClient.name,
      number: selectedClient.number,
      vatNumber: selectedClient.vatNumber,
      accPerson: selectedClient.accPerson,
      address: selectedClient.address,
    });
    setEditMode(true);
    setClientFormOpen(true);
    handleCloseMenu();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete API call
    console.log('Deleting client:', selectedClient.id);
    setDeleteDialogOpen(false);
    setSelectedClient(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
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
    return filters.search !== "";
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
    });
    setPage(0);
  };

  const handleClientDataChange = (e) => {
    const { name, value } = e.target;
    setClientData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveClient = () => {
    // TODO: Implement create/update API call
    console.log('Saving client:', clientData);
    setClientFormOpen(false);
  };

  const filteredClients = mockClients.filter((client) => {
    return client.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      client.number.includes(filters.search) ||
      (client.vatNumber && client.vatNumber.toLowerCase().includes(filters.search.toLowerCase()));
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
          Клиенти
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClient}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
        >
          Нов клиент
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
            <TextField
              size="small"
              label="Търсене по име, ЕИК или ДДС номер"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              sx={{ width: "300px" }}
            />
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
                <TableCell sx={{ fontWeight: 600, width: "60px" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Фирма</TableCell>
                <TableCell sx={{ fontWeight: 600, width: "120px" }}>ЕИК</TableCell>
                <TableCell sx={{ fontWeight: 600, width: "120px" }}>ДДС номер</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>МОЛ</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Адрес</TableCell>
                <TableCell sx={{ fontWeight: 600, width: "120px" }}>Дата на създаване</TableCell>
                <TableCell sx={{ fontWeight: 600, width: "60px" }} align="center">Опции</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((client) => (
                  <TableRow
                    key={client.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.number}</TableCell>
                    <TableCell>{client.vatNumber || '-'}</TableCell>
                    <TableCell>{client.accPerson}</TableCell>
                    <TableCell>{client.address}</TableCell>
                    <TableCell>{client.createdAt}</TableCell>
                    <TableCell padding="none" align="center">
                      <IconButton
                        size="small"
                        onClick={(event) => handleOpenMenu(event, client)}
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
          count={filteredClients.length}
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

      {/* Client Form Dialog */}
      <Dialog 
        open={clientFormOpen} 
        onClose={() => setClientFormOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editMode ? 'Редактиране на клиент' : 'Нов клиент'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Фирма"
                  name="name"
                  value={clientData.name}
                  onChange={handleClientDataChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="ЕИК"
                  name="number"
                  value={clientData.number}
                  onChange={handleClientDataChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="ДДС номер"
                  name="vatNumber"
                  value={clientData.vatNumber}
                  onChange={handleClientDataChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="МОЛ"
                  name="accPerson"
                  value={clientData.accPerson}
                  onChange={handleClientDataChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Адрес"
                  name="address"
                  value={clientData.address}
                  onChange={handleClientDataChange}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setClientFormOpen(false)}
            variant="outlined"
          >
            Отказ
          </Button>
          <Button 
            onClick={handleSaveClient}
            variant="contained"
            disabled={!clientData.name || !clientData.number || !clientData.accPerson || !clientData.address}
          >
            Запази
          </Button>
        </DialogActions>
      </Dialog>

      {/* Options Menu */}
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
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" color="warning" />
          </ListItemIcon>
          <ListItemText>Редакция</ListItemText>
        </MenuItem>
        <MenuItem 
          onClick={handleDeleteClick}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Изтрий</ListItemText>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={`клиент ${selectedClient?.name}`}
      />
    </Box>
  );
} 