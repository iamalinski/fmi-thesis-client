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
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";

const mockSales = Array.from({ length: 20 }, (_, index) => ({
  id: `SALE-${String(index + 1).padStart(4, "0")}`,
  date: new Date(2024, 0, index + 1).toLocaleDateString("bg-BG"),
  items: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, itemIndex) => ({
    id: `ITEM-${index}-${itemIndex}`,
    article: `Артикул ${Math.floor(Math.random() * 20) + 1}`,
    quantity: Math.floor(Math.random() * 10) + 1,
    price: (Math.random() * 1000).toFixed(2),
    total: function() { return (this.quantity * parseFloat(this.price)).toFixed(2) },
  })),
  get total() {
    return this.items.reduce((sum, item) => sum + parseFloat(item.total()), 0).toFixed(2);
  }
}));

const statusColors = {
  completed: "success",
  pending: "warning",
  cancelled: "error",
};

const statusLabels = {
  completed: "Завършена",
  pending: "В процес",
  cancelled: "Отказана",
};

export default function Sales() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    article: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateSale = () => {
    navigate("/sales/new");
  };

  const handleOpenMenu = (event, sale) => {
    setAnchorEl(event.currentTarget);
    setSelectedSale(sale);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedSale(null);
  };

  const handleView = () => {
    console.log("View sale:", selectedSale);
    handleCloseMenu();
  };

  const handleEdit = () => {
    console.log("Edit sale:", selectedSale);
    handleCloseMenu();
  };

  const handleDelete = () => {
    console.log("Delete sale:", selectedSale);
    handleCloseMenu();
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
    return filters.search !== "" || filters.article !== "";
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      article: "",
    });
    setPage(0);
  };

  const filteredSales = mockSales.filter((sale) => {
    const matchesSearch = sale.id
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesArticle = filters.article === "" || sale.items.some(item => 
      item.article.toLowerCase().includes(filters.article.toLowerCase())
    );

    return matchesSearch && matchesArticle;
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
          Продажби
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateSale}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
        >
          Нова продажба
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
                  label="Артикул"
                  name="article"
                  value={filters.article}
                  onChange={handleFilterChange}
                  sx={{ width: "180px" }}
                />
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
                <TableCell sx={{ fontWeight: 600, width: "120px" }}>
                  Номер
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "120px" }}>
                  Дата
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Артикули
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "120px" }} align="right">
                  Общо
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "60px" }} align="center">
                  Опции
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sale) => (
                  <TableRow
                    key={sale.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {sale.id}
                    </TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {sale.items.map((item) => (
                          <Box 
                            key={item.id}
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              gap: 2,
                              '&:not(:last-child)': {
                                borderBottom: '1px dashed',
                                borderColor: 'divider',
                                pb: 1
                              }
                            }}
                          >
                            <Typography variant="body2" sx={{ flex: 1 }}>
                              {item.article}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ minWidth: 80 }}
                            >
                              {item.quantity} бр.
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ minWidth: 100 }}
                            >
                              {item.price} BGN
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                minWidth: 100,
                                fontWeight: 500
                              }}
                            >
                              {item.total()} BGN
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      {sale.total} BGN
                    </TableCell>
                    <TableCell padding="none" align="center">
                      <IconButton
                        size="small"
                        onClick={(event) => handleOpenMenu(event, sale)}
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
          count={filteredSales.length}
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
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Изтрий</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
