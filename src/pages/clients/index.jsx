import { useRef, useState } from "react";
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
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteConfirmationDialog from "@components/common/DeleteConfirmationDialog";
import { createPortal } from "react-dom";
import CreateUpdateClient from "@components/clients/CreateUpdate";
import { useClients } from "@hooks/clients/useClients";
import moment from "moment/moment";
import ClientsTableSkeleton from "@components/clients/TableSkeleton";

export default function Clients() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    page: 0,
    limit: 10,
  });

  const { isPending, data } = useClients(filters);

  const createUpdateClientRef = useRef(null);

  const handleChangePage = (event, newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setFilters((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      page: 0,
    }));
  };

  const handleOpenMenu = (event, clientId) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete API call
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 0,
    }));
  };

  const hasActiveFilters = () => {
    return filters.search !== "";
  };

  const handleClearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      search: "",
      page: 0,
      limit: 10,
    }));
  };

  return (
    <>
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
            onClick={() => createUpdateClientRef.current.open()}
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

        {/* Filters section */}
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
                  textTransform: "none",
                  color: "error.main",
                  "&.Mui-disabled": {
                    opacity: 0.5,
                  },
                }}
              >
                Изчисти филтрите
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Table section */}
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
                  <TableCell sx={{ fontWeight: 600, width: "60px" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Фирма</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: "120px" }}>
                    ЕИК
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: "120px" }}>
                    ДДС номер
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>МОЛ</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Адрес</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: "120px" }}>
                    Създаден
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
                {isPending ? (
                  <ClientsTableSkeleton rowsPerPage={filters.limit} />
                ) : (
                  data?.data.map(
                    ({
                      id,
                      name,
                      number,
                      vat_number,
                      acc_person,
                      address,
                      created_at,
                    }) => (
                      <TableRow
                        key={id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          transition: "background-color 0.2s",
                        }}
                      >
                        <TableCell>{id}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{number}</TableCell>
                        <TableCell>{vat_number || "-"}</TableCell>
                        <TableCell>{acc_person}</TableCell>
                        <TableCell>{address}</TableCell>
                        <TableCell>
                          {moment(created_at).format("DD.MM.YYYY г.")}
                        </TableCell>
                        <TableCell padding="none" align="center">
                          <IconButton
                            size="small"
                            onClick={(event) => handleOpenMenu(event, id)}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  )
                )}

                {/* No results message */}
                {!isPending && (!data?.data || data?.data.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        Няма намерени клиенти
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination section with skeleton for count */}
          <TablePagination
            component="div"
            count={isPending ? 0 : data?.total || 0}
            page={filters.page}
            onPageChange={handleChangePage}
            rowsPerPage={filters.limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Редове на страница:"
            labelDisplayedRows={({ from, to, count }) =>
              isPending ? <Skeleton width={100} /> : `${from}-${to} от ${count}`
            }
          />
        </Paper>

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
          <MenuItem
            onClick={() => createUpdateClientRef.current.open(client.id)}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" color="warning" />
            </ListItemIcon>
            <ListItemText>Редакция</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Изтрий</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
      {createPortal(
        <>
          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          />
          <CreateUpdateClient ref={createUpdateClientRef} />
        </>,
        document.body
      )}
    </>
  );
}
