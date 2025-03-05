import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { format } from 'date-fns';
import { bg } from 'date-fns/locale';
import React, { Fragment } from 'react';

const recentInvoices = [
  { id: 'INV-20240001', client: 'Клиент 1', amount: '2,450.00', status: 'paid' },
  { id: 'INV-20240002', client: 'Клиент 2', amount: '1,890.00', status: 'pending' },
  { id: 'INV-20240003', client: 'Клиент 3', amount: '3,200.00', status: 'paid' },
  { id: 'INV-20240004', client: 'Клиент 4', amount: '1,750.00', status: 'overdue' },
  { id: 'INV-20240005', client: 'Клиент 5', amount: '4,100.00', status: 'pending' },
];

const topProducts = [
  { name: 'Продукт 1', sales: 145, progress: 85 },
  { name: 'Продукт 2', sales: 123, progress: 75 },
  { name: 'Продукт 3', sales: 98, progress: 60 },
  { name: 'Продукт 4', sales: 85, progress: 52 },
  { name: 'Продукт 5', sales: 72, progress: 44 },
];

// New mock data for the requested statistics
const topClients = [
  { id: 1, name: 'Мега Индъстрийз ООД', totalSpent: '28,750.00', invoicesCount: 18, avatarColor: '#3f51b5' },
  { id: 2, name: 'Техно Солюшънс АД', totalSpent: '21,340.00', invoicesCount: 14, avatarColor: '#f44336' },
  { id: 3, name: 'Експрес Логистикс ЕООД', totalSpent: '18,920.00', invoicesCount: 11, avatarColor: '#4caf50' },
  { id: 4, name: 'Строй Инвест ООД', totalSpent: '15,780.00', invoicesCount: 9, avatarColor: '#ff9800' },
  { id: 5, name: 'Алфа Дизайн АД', totalSpent: '12,450.00', invoicesCount: 7, avatarColor: '#9c27b0' },
];

const bestSales = [
  { id: 'S-20240112', client: 'Мега Индъстрийз ООД', amount: '8,750.00', items: 12, date: new Date(2024, 0, 12) },
  { id: 'S-20240208', client: 'Техно Солюшънс АД', amount: '7,340.00', items: 8, date: new Date(2024, 1, 8) },
  { id: 'S-20240319', client: 'Глобал Трейд ЕООД', amount: '6,920.00', items: 10, date: new Date(2024, 2, 19) },
  { id: 'S-20240405', client: 'Експрес Логистикс ЕООД', amount: '6,830.00', items: 7, date: new Date(2024, 3, 5) },
];

const latestSales = [
  { id: 'S-20240502', client: 'Алфа Дизайн АД', amount: '3,450.00', items: 5, date: new Date(2024, 4, 2) },
  { id: 'S-20240430', client: 'Мега Индъстрийз ООД', amount: '4,920.00', items: 7, date: new Date(2024, 3, 30) },
  { id: 'S-20240429', client: 'Техно Солюшънс АД', amount: '2,340.00', items: 3, date: new Date(2024, 3, 29) },
  { id: 'S-20240427', client: 'Строй Инвест ООД', amount: '5,180.00', items: 8, date: new Date(2024, 3, 27) },
];

const statusColors = {
  paid: 'success',
  pending: 'warning',
  overdue: 'error',
};

const statusLabels = {
  paid: 'Платена',
  pending: 'Чакаща',
  overdue: 'Просрочена',
};

// Function to format date in Bulgarian
const formatDate = (date) => {
  return format(date, 'dd MMM yyyy', { locale: bg });
};

// Function to get initials from name
const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              bgcolor: 'primary.lighter',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="primary.darker" variant="subtitle2" sx={{ mb: 1 }}>
                  Общо приходи
                </Typography>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                  24,500 BGN
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon color="success" fontSize="small" />
                  <Typography variant="body2" color="success.main">
                    +15.3%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    спрямо миналия месец
                  </Typography>
                </Box>
              </Box>
              <PaidIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.8 }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              bgcolor: 'success.lighter',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="success.darker" variant="subtitle2" sx={{ mb: 1 }}>
                  Брой фактури
                </Typography>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                  125
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon color="success" fontSize="small" />
                  <Typography variant="body2" color="success.main">
                    +8.2%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    спрямо миналия месец
                  </Typography>
                </Box>
              </Box>
              <ReceiptIcon sx={{ fontSize: 40, color: 'success.main', opacity: 0.8 }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              bgcolor: 'warning.lighter',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="warning.darker" variant="subtitle2" sx={{ mb: 1 }}>
                  Активни артикули
                </Typography>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                  48
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingDownIcon color="error" fontSize="small" />
                  <Typography variant="body2" color="error.main">
                    -2.3%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    спрямо миналия месец
                  </Typography>
                </Box>
              </Box>
              <InventoryIcon sx={{ fontSize: 40, color: 'warning.main', opacity: 0.8 }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* First row of statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Топ клиенти
              </Typography>
            </Box>
            <List sx={{ pt: 0 }}>
              {topClients.map((client, index) => (
                <Fragment key={client.id}>
                  {index > 0 && <Divider component="li" variant="inset" />}
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: client.avatarColor }}>
                        {getInitials(client.name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {client.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', mt: 0.5, color: 'text.secondary' }}>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <AttachMoneyIcon fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                            {client.totalSpent} BGN
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                            <ReceiptIcon fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                            {client.invoicesCount} фактури
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
        <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Последни фактури
              </Typography>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Номер</TableCell>
                  <TableCell>Клиент</TableCell>
                  <TableCell align="right">Сума</TableCell>
                  <TableCell>Статус</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentInvoices.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell align="right">{invoice.amount} BGN</TableCell>
                    <TableCell>
                      <Chip
                        label={statusLabels[invoice.status]}
                        color={statusColors[invoice.status]}
                        size="small"
                        sx={{ minWidth: 80 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>


      {/* Final row for top products - Changed to display products in rows instead of grid */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Най-продавани артикули
              </Typography>
            </Box>
            {/* Each product now on a separate row */}
            {topProducts.map((product, index) => (
              <Box key={product.name} sx={{ mb: index !== topProducts.length - 1 ? 2 : 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={500}>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.sales} продажби
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={product.progress}
                  sx={{
                    height: 8,
                    borderRadius: 1,
                    bgcolor: 'grey.100',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
