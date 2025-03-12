import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: '#fff',
        borderTop: '2px solid #e8e8e8',
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Écrivez votre message..."
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#f8f8f8',
            borderRadius: '12px',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease',
            '&.Mui-focused': {
              bgcolor: '#fff',
              '& fieldset': {
                borderColor: '#059669',
                borderWidth: '2px'
              }
            },
            '& fieldset': {
              borderColor: '#e8e8e8'
            },
            '&:hover fieldset': {
              borderColor: '#059669'
            }
          },
          '& .MuiOutlinedInput-input': {
            p: 1.5,
            '&::placeholder': {
              color: '#666',
              opacity: 0.8
            }
          }
        }}
      />

      <IconButton
        onClick={handleSend}
        disabled={!message.trim()}
        sx={{
          bgcolor: message.trim() ? '#059669' : '#e8e8e8',
          color: message.trim() ? '#fff' : '#666',
          width: 44,
          height: 44,
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: message.trim() ? '#047857' : '#e8e8e8',
            transform: message.trim() ? 'scale(1.1)' : 'none'
          },
          '&.Mui-disabled': {
            bgcolor: '#e8e8e8',
            color: '#666'
          },
          boxShadow: message.trim() ? '0 4px 12px rgba(5, 150, 105, 0.25)' : 'none'
        }}
      >
        <SendIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ChatInput;