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
  IconButton,
  Typography,
  Avatar,
  Stack,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";

const MENU_ITEMS = [
  {
    name: "Табло",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    name: "Фактури",
    icon: <InsertDriveFileIcon />,
    path: "/invoices",
  },
  {
    name: "Артикули",
    icon: <CategoryIcon />,
    path: "/articles",
  },
  {
    name: "Продажби",
    icon: <StoreIcon />,
    path: "/sales",
  },
];

export default function SideMenu({ width, open, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleProfileClick = () => {
    // Navigate to profile page or open profile modal
  };

  const handleLogout = (e) => {
    e.stopPropagation(); // Prevent triggering profile click
    // Handle logout logic
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: open ? `${width}px` : "64px",
          backgroundColor: "background.default",
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          overflowX: "hidden",
          transition: (theme) =>
            theme.transitions.create(["width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
      open
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "64px!important",
          px: 2,
        }}
      >
        {open && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "primary.main",
              letterSpacing: 1,
              transition: theme.transitions.create(["opacity", "width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }}
          >
            ФМИ
          </Typography>
        )}
        <IconButton
          onClick={onToggle}
          sx={{
            ml: open ? 0 : "auto",
            mr: open ? 0 : "auto",
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Divider sx={{ opacity: 0.5 }} />
      <List sx={{ padding: "8px" }}>
        {MENU_ITEMS.map(({ name, icon, path }) => (
          <ListItem key={name} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={location.pathname === path}
              onClick={() => handleNavigation(path)}
              sx={{
                gap: "12px",
                borderRadius: 1,
                minHeight: 44,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "all 0.2s ease-in-out",
                position: "relative",
                "&:hover": {
                  backgroundColor: "action.hover",
                  transform: open ? "translateX(4px)" : "none",
                },
                "&.Mui-selected": {
                  backgroundColor: "background.paper",
                  boxShadow: 1,
                  "&:hover": {
                    backgroundColor: "background.paper",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: "-8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "60%",
                    width: "4px",
                    backgroundColor: "primary.main",
                    borderRadius: "0 4px 4px 0",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                  color: (theme) =>
                    location.pathname === path
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                }}
              >
                {icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={name}
                  sx={{
                    opacity: open ? 1 : 0,
                    "& .MuiTypography-root": {
                      fontWeight: location.pathname === path ? 600 : 500,
                      fontSize: "0.95rem",
                      color: (theme) =>
                        location.pathname === path
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                    },
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List
        sx={{
          marginTop: "auto",
          padding: "8px",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            selected={location.pathname === "/settings"}
            onClick={() => handleNavigation("/settings")}
            sx={{
              gap: "12px",
              borderRadius: 1,
              minHeight: 44,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              transition: "all 0.2s ease-in-out",
              position: "relative",
              "&:hover": {
                backgroundColor: "action.hover",
                transform: open ? "translateX(4px)" : "none",
              },
              "&.Mui-selected": {
                backgroundColor: "background.paper",
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: "background.paper",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: "-8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "60%",
                  width: "4px",
                  backgroundColor: "primary.main",
                  borderRadius: "0 4px 4px 0",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : "auto",
                justifyContent: "center",
                color: (theme) =>
                  location.pathname === "/settings"
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
              }}
            >
              <SettingsIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Настройки"
                sx={{
                  opacity: open ? 1 : 0,
                  "& .MuiTypography-root": {
                    fontWeight: location.pathname === "/settings" ? 600 : 500,
                    fontSize: "0.95rem",
                    color: (theme) =>
                      location.pathname === "/settings"
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                  },
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ opacity: 0.5 }} />
      <List sx={{ padding: "8px" }}>
        <ListItemButton
          onClick={handleProfileClick}
          sx={{
            gap: "12px",
            borderRadius: 1,
            minHeight: 44,
            justifyContent: open ? "initial" : "center",
            p: 1,
            mb: 1,
            transition: "all 0.2s ease-in-out",
            position: "relative",
            "&:hover": {
              backgroundColor: "action.hover",
              transform: open ? "translateX(4px)" : "none",
            },
            "&.Mui-selected": {
              backgroundColor: "background.paper",
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "background.paper",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                left: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                height: "60%",
                width: "4px",
                backgroundColor: "primary.main",
                borderRadius: "0 4px 4px 0",
              },
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Avatar
              sx={{
                width: open ? 40 : 30,
                height: open ? 40 : 30,
                fontSize: open ? "1.2rem" : "0.8rem",
                bgcolor: "primary.main",
                transition: theme.transitions.create(["width", "height"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              }}
            >
              ИА
            </Avatar>
            {open && (
              <Box sx={{ overflow: "hidden" }}>
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    lineHeight: 1.2,
                  }}
                >
                  Илиян Алински
                </Typography>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.2,
                  }}
                >
                  gandalfcho@gmail.com
                </Typography>
              </Box>
            )}
          </Stack>
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            alert("logout");
          }}
          sx={{
            gap: "12px",
            borderRadius: 1,
            minHeight: 44,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            transition: "all 0.2s ease-in-out",
            position: "relative",
            "&:hover": {
              backgroundColor: "action.hover",
              transform: open ? "translateX(4px)" : "none",
            },
            "&.Mui-selected": {
              backgroundColor: "background.paper",
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "background.paper",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                left: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                height: "60%",
                width: "4px",
                backgroundColor: "primary.main",
                borderRadius: "0 4px 4px 0",
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : "auto",
              justifyContent: "center",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          {open && (
            <ListItemText
              primary="Изход"
              sx={{
                opacity: open ? 1 : 0,
                "& .MuiTypography-root": {
                  fontSize: "0.95rem",
                },
              }}
            />
          )}
        </ListItemButton>
      </List>
    </Drawer>
  );
}
