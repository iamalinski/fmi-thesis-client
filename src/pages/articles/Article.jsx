import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [article, setArticle] = useState({
    name: '',
    price: '',
    status: 'active',
  });

  useEffect(() => {
    if (isEditMode) {
      // TODO: Fetch article data from API
      // setArticle(fetchedArticleData);
    }
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement save API call
    console.log('Saving article:', article);
    navigate('/articles');
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          {isEditMode ? 'Редактиране на артикул' : 'Нов артикул'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Име"
              name="name"
              value={article.name}
              onChange={handleChange}
              required
              size="small"
            />

            <TextField
              fullWidth
              label="Цена"
              name="price"
              type="number"
              value={article.price}
              onChange={handleChange}
              required
              size="small"
              inputProps={{ min: 0, step: 0.01 }}
            />

            <FormControl fullWidth size="small">
              <InputLabel>Статус</InputLabel>
              <Select
                name="status"
                value={article.status}
                onChange={handleChange}
                label="Статус"
              >
                <MenuItem value="active">Активен</MenuItem>
                <MenuItem value="inactive">Неактивен</MenuItem>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={() => navigate('/articles')}
              >
                Отказ
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Запази
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
} 