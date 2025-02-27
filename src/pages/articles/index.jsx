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

const mockArticles = Array.from({ length: 50 }, (_, index) => ({
  id: `ART-${String(index + 1).padStart(4, "0")}`,
  name: `Артикул ${index + 1}`,
  price: (Math.random() * 1000).toFixed(2),
  stock: Math.floor(Math.random() * 100),
  status: ["active", "inactive"][Math.floor(Math.random() * 2)],
}));

const statusColors = {
  active: "success",
  inactive: "error",
};

const statusLabels = {
  active: "Активен",
  inactive: "Неактивен",
};

export default function Articles() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateArticle = () => {
    navigate("/articles/new");
  };

  const handleOpenMenu = (event, article) => {
    setAnchorEl(event.currentTarget);
    setSelectedArticle(article);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedArticle(null);
  };

  const handleView = () => {
    console.log("View article:", selectedArticle);
    handleCloseMenu();
  };

  const handleEdit = () => {
    console.log("Edit article:", selectedArticle);
    handleCloseMenu();
  };

  const handleDelete = () => {
    console.log("Delete article:", selectedArticle);
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
    return filters.search !== "" || filters.status !== "all";
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "all",
    });
    setPage(0);
  };

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = article.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === "all" || article.status === filters.status;

    return matchesSearch && matchesStatus;
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
          Артикули
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateArticle}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
        >
          Нов артикул
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
                  label="Име"
                  name="search"
                  value={filters.search}
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
                    <MenuItem value="active">Активни</MenuItem>
                    <MenuItem value="inactive">Неактивни</MenuItem>
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
                <TableCell sx={{ fontWeight: 600, width: "100px" }}>
                  Код
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Име
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "120px" }} align="right">
                  Цена
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "100px" }} align="right">
                  Наличност
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "100px" }}>
                  Статус
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "60px" }} align="center">
                  Опции
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredArticles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((article) => (
                  <TableRow
                    key={article.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {article.id}
                    </TableCell>
                    <TableCell>{article.name}</TableCell>
                    <TableCell align="right">
                      {article.price} лв.
                    </TableCell>
                    <TableCell align="right">
                      {article.stock} бр.
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusLabels[article.status]}
                        color={statusColors[article.status]}
                        size="small"
                        sx={{
                          fontWeight: 500,
                          minWidth: 80,
                        }}
                      />
                    </TableCell>
                    <TableCell padding="none" align="center">
                      <IconButton
                        size="small"
                        onClick={(event) => handleOpenMenu(event, article)}
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
          count={filteredArticles.length}
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
