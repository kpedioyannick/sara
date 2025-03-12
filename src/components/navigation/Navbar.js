import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { mockApiService as api } from '../../mocks/services/mockApiService';

const Navbar = ({ onPathSelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
    setPaths([]);
  };

  const handleSubcategoryChange = async (event) => {
    const subcategoryId = event.target.value;
    setSelectedSubcategory(subcategoryId);
    
    if (subcategoryId && selectedCategory) {
      setLoading(true);
      try {
        const pathsData = await api.getPathsByCategory(selectedCategory, subcategoryId);
        setPaths(pathsData);
      } catch (error) {
        console.error('Erreur lors du chargement des parcours:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <AppBar 
      position="static"
      elevation={0}
      sx={{
        bgcolor: '#059669',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ 
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2,
        py: isMobile ? 2 : 1.5,
        px: 3
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: isMobile ? 0 : 1,
            mb: isMobile ? 1 : 0,
            fontSize: '1.3rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
            color: '#fff'
          }}
        >
          SARA
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flexDirection: isMobile ? 'column' : 'row',
          width: isMobile ? '100%' : 'auto'
        }}>
          <FormControl 
            size="small" 
            sx={{ minWidth: 200 }}
          >
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              displayEmpty
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '&:hover': {
                  bgcolor: '#fff'
                },
                '& .MuiSelect-select': {
                  py: 1.5
                }
              }}
            >
              <MenuItem value="">
                <em>Sélectionner une catégorie</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl 
            size="small" 
            sx={{ minWidth: 200 }}
            disabled={!selectedCategory}
          >
            <Select
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              displayEmpty
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '&:hover': {
                  bgcolor: '#fff'
                },
                '& .MuiSelect-select': {
                  py: 1.5
                },
                '&.Mui-disabled': {
                  bgcolor: 'rgba(255, 255, 255, 0.6)'
                }
              }}
            >
              <MenuItem value="">
                <em>Sélectionner une sous-catégorie</em>
              </MenuItem>
              {selectedCategoryData?.subcategories.map((subcat) => (
                <MenuItem key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {paths.length > 0 && (
            <FormControl 
              size="small" 
              sx={{ minWidth: 200 }}
            >
              <Select
                value=""
                onChange={(e) => onPathSelect(e.target.value)}
                displayEmpty
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '&:hover': {
                    bgcolor: '#fff'
                  },
                  '& .MuiSelect-select': {
                    py: 1.5
                  }
                }}
              >
                <MenuItem value="">
                  <em>Sélectionner un parcours</em>
                </MenuItem>
                {paths.map((path) => (
                  <MenuItem key={path.id} value={path.id}>
                    {path.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 