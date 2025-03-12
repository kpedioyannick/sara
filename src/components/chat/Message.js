import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Message = ({ text, isSara }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        opacity: 1,
        transform: 'scale(1)',
        animation: 'messageAppear 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        '@keyframes messageAppear': {
          from: { 
            opacity: 0, 
            transform: isSara ? 'translateX(-20px)' : 'translateX(20px)' 
          },
          to: { 
            opacity: 1, 
            transform: 'translateX(0)' 
          }
        }
      }}
    >
      {isSara && (
        <Avatar
          sx={{
            bgcolor: '#059669',
            width: 40,
            height: 40,
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
            border: '2px solid #fff',
            animation: 'avatarPop 0.3s ease-out',
            '@keyframes avatarPop': {
              from: { transform: 'scale(0)' },
              to: { transform: 'scale(1)' }
            }
          }}
        >
          <SmartToyIcon sx={{ color: '#fff' }} />
        </Avatar>
      )}

      <Box 
        sx={{ 
          maxWidth: '75%',
          alignSelf: isSara ? 'flex-start' : 'flex-end'
        }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: isSara ? '#fff' : '#059669',
            color: isSara ? '#2d2d2d' : '#fff',
            borderRadius: '16px',
            borderTopLeftRadius: isSara ? '4px' : '16px',
            borderTopRightRadius: isSara ? '16px' : '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            position: 'relative',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
            },
            transition: 'all 0.2s ease',
            border: '2px solid',
            borderColor: isSara ? '#e8e8e8' : '#059669'
          }}
        >
          <Typography
            sx={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              fontWeight: 500,
              letterSpacing: '0.01em'
            }}
          >
            {text}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            ml: isSara ? 1 : 0,
            mr: isSara ? 0 : 1,
            color: '#666',
            fontSize: '0.75rem',
            fontWeight: 500,
            textAlign: isSara ? 'left' : 'right'
          }}
        >
          {isSara ? 'Sara' : 'Vous'} • maintenant
        </Typography>
      </Box>

      {!isSara && (
        <Avatar
          sx={{
            bgcolor: '#059669',
            width: 40,
            height: 40,
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
            border: '2px solid #fff',
            fontSize: '0.9rem',
            fontWeight: 600,
            animation: 'avatarPop 0.3s ease-out'
          }}
        >
          ME
        </Avatar>
      )}
    </Box>
  );
};

export default Message;