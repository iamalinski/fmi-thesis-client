import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import SideMenu from './SideMenu';

const DRAWER_WIDTH = 240;

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu 
        width={DRAWER_WIDTH} 
        open={isOpen} 
        onToggle={handleToggle} 
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${isOpen ? DRAWER_WIDTH : 64}px)` },
          ml: { sm: `${isOpen ? DRAWER_WIDTH : 64}px` },
          transition: (theme) => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
