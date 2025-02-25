// libraries
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import SettingsIcon from "@mui/icons-material/Settings";

const MENU_ITEMS = [
  {
    name: "Табло",
    icon: <DashboardIcon />,
  },
  {
    name: "Фактури",
    icon: <InsertDriveFileIcon />,
  },
  {
    name: "Артикули",
    icon: <CategoryIcon />,
  },
  {
    name: "Продажби",
    icon: <StoreIcon />,
  },
];

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "180px",
          backgroundColor: "#f5f6fa",
        },
      }}
      open
    >
      <Toolbar />
      <Divider />
      <List>
        {MENU_ITEMS.map(({ name, icon }, index) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              sx={{
                gap: "10px",
              }}
            >
              <ListItemIcon sx={{ minWidth: "24px" }}>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List
        sx={{
          marginTop: "auto",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              gap: "10px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "24px" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Toolbar />
    </Drawer>
  );
}
