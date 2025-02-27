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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaidIcon from '@mui/icons-material/Paid';

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

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
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

        <Grid item xs={12} md={5}>
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
            {topProducts.map((product, index) => (
              <Box key={product.name} sx={{ mb: index !== topProducts.length - 1 ? 3 : 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.sales} продажби
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={product.progress}
                  sx={{
                    height: 6,
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
