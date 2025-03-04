import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteConfirmationDialog from '../../components/common/DeleteConfirmationDialog';

export default function InvoicePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/invoices/edit/${id}`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete API call
    console.log('Deleting invoice:', id);
    setDeleteDialogOpen(false);
    navigate('/invoices');
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDownload = () => {
    // TODO: Implement download API call
    console.log('Downloading invoice:', id);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ mb: 3 }}
        alignItems="center"
      >
        <IconButton
          onClick={() => navigate('/invoices')}
          sx={{ 
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'action.hover' }
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" sx={{ flex: 1, fontWeight: 600 }}>
          Фактура {id}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Tooltip title="Редактирай">
            <IconButton
              onClick={handleEdit}
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Изтрий">
            <IconButton
              onClick={handleDeleteClick}
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'error.light' }
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Изтегли">
            <IconButton
              onClick={handleDownload}
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Принтирай">
            <IconButton
              onClick={handlePrint}
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Paper 
        elevation={0} 
        sx={{ 
          border: '1px solid', 
          borderColor: 'divider',
          height: 'calc(100vh - 200px)',
          overflow: 'hidden'
        }}
      >
        <iframe
          src={`/api/invoices/${id}/preview`} // Replace with your actual API endpoint
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      </Paper>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={`фактура ${id}`}
      />
    </Box>
  );
} 