import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const MobileExchangeBlock = ({ 
  children, 
  isActive,
  activityUpdated,
  onStateChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const blockRef = useRef(null);
  const lastActivityUpdate = useRef(Date.now());
  const lastExpansion = useRef(Date.now());

  useEffect(() => {
    if (isActive) {
      const now = Date.now();
      if (now - lastExpansion.current > 500) {
        setIsExpanded(true);
        onStateChange?.(true);
        lastExpansion.current = now;
      }
    }
  }, [isActive, onStateChange]);

  useEffect(() => {
    if (activityUpdated) {
      const now = Date.now();
      if (now - lastActivityUpdate.current > 500 && isExpanded) {
        setIsExpanded(false);
        onStateChange?.(false);
        lastActivityUpdate.current = now;
      }
    }
  }, [activityUpdated, onStateChange, isExpanded]);

  return (
    <Box
      ref={blockRef}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transform: `translateY(${isExpanded ? '0' : 'calc(100% - 60px)'})`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fff',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
        animation: 'slideUp 0.3s ease-out',
        '@keyframes slideUp': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' }
        }
      }}
    >
      <Box
        onClick={() => {
          setIsExpanded(!isExpanded);
          onStateChange?.(!isExpanded);
        }}
        sx={{
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          color: '#fff',
          fontWeight: 600,
          fontSize: '1rem',
          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, #059669 0%, #10b981 100%)'
          }
        }}
      >
        <Box>Discussion avec Sara</Box>
        <Box 
          sx={{ 
            width: 24, 
            height: 24, 
            transform: isExpanded ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s ease',
            '&::before': {
              content: '""',
              display: 'block',
              width: '10px',
              height: '10px',
              borderLeft: '2px solid #fff',
              borderBottom: '2px solid #fff',
              transform: 'rotate(-45deg)',
              margin: '5px'
            }
          }} 
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          bgcolor: '#fafafa',
          backgroundImage: 'radial-gradient(#e8e8e8 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#059669',
            borderRadius: '4px',
            '&:hover': {
              background: '#047857'
            }
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MobileExchangeBlock;