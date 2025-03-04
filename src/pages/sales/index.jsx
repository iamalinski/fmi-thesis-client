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
  Grid,
  Divider as MuiDivider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";

const mockSales = Array.from({ length: 50 }, (_, index) => ({
  id: `SALE-${String(index + 1).padStart(4, "0")}`,
  date: new Date(2024, 0, index + 1).toLocaleDateString("bg-BG"),
  client: `Клиент ${index + 1}`,
  articles: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
    name: `Артикул ${i + 1}`,
    quantity: Math.floor(Math.random() * 10) + 1,
    price: (Math.random() * 100).toFixed(2)
  })),
  subtotal: (Math.random() * 1000).toFixed(2),
  discount: (Math.random() * 100).toFixed(2),
  total: (Math.random() * 1000).toFixed(2),
}));

export default function Sales() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const handleCreateSale = () => {
    navigate("/sales/new");
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

  const filteredSales = mockSales.filter((sale) => {
    const matchesSearch = sale.id
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    return matchesSearch;
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
      <MuiDivider sx={{ mt: 3, mb: 3 }} />
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
                  Клиент
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Артикули
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "120px" }} align="right">
                  Сума
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "120px" }} align="right">
                  Отстъпка
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "120px" }} align="right">
                  Общо
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
                    <TableCell>{sale.client}</TableCell>
                    <TableCell sx={{ p: 1 }}>
                      {sale.articles.map((article, index) => (
                        <Box 
                          key={index}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            p: 1,
                            mb: index < sale.articles.length - 1 ? 1 : 0,
                            backgroundColor: 'background.paper',
                            fontSize: '0.875rem',
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {article.name}
                          </Typography>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            mt: 0.5,
                            color: 'text.secondary',
                            fontSize: '0.75rem'
                          }}>
                            <Box>Количество: <b>{article.quantity} бр.</b></Box>
                            <Box>Ед. цена: <b>{article.price} BGN</b></Box>
                          </Box>
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell align="right">{sale.subtotal} BGN</TableCell>
                    <TableCell align="right">{sale.discount} BGN</TableCell>
                    <TableCell align="right">{sale.total} BGN</TableCell>
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
    </Box>
  );
}
