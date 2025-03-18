import { useState } from "react";

// libraries
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ClientMenuOptions({ onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  function handleDelete() {
    onDelete();
    handleCloseMenu();
  }

  function handleEdit() {
    onEdit();
    handleCloseMenu();
  }

  return (
    <>
      <IconButton size="small" onClick={(event) => handleOpenMenu(event)}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
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
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Изтрий</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
