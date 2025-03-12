import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

const RegisterModal = ({ open, onClose, onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      await onRegister(formData.email, formData.password, formData.name);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#059669'
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#059669',
        borderWidth: '2px'
      }
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#059669'
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        pt: 3,
        px: 3,
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#2d2d2d',
        textAlign: 'center'
      }}>
        Créer un compte
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              name="name"
              label="Nom"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              name="password"
              label="Mot de passe"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              fullWidth
              sx={textFieldStyle}
            />
            {error && (
              <Typography 
                color="error" 
                variant="body2"
                sx={{
                  bgcolor: 'rgba(239, 68, 68, 0.08)',
                  color: '#ef4444',
                  p: 1.5,
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              >
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => onSwitchToLogin()}
            sx={{
              color: '#666',
              textTransform: 'none',
              fontSize: '0.95rem',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            Déjà un compte ?
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: '#059669',
              px: 3,
              py: 1,
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
              '&:hover': {
                bgcolor: '#047857'
              },
              '&.Mui-disabled': {
                bgcolor: '#e8e8e8',
                color: '#666'
              }
            }}
          >
            {loading ? (
              <CircularProgress 
                size={24} 
                sx={{ 
                  color: '#059669',
                  '& .MuiCircularProgress-circle': {
                    strokeWidth: 4
                  }
                }}
              />
            ) : 'S\'inscrire'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegisterModal; 