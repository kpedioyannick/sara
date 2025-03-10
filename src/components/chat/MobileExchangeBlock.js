import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const MobileExchangeBlock = ({ 
  children, 
  isActive,
  activityUpdated,
  onStateChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [startY, setStartY] = useState(null);
  const blockRef = useRef(null);
  const lastActivityUpdate = useRef(Date.now());
  const lastExpansion = useRef(Date.now());

  // Gérer l'expansion automatique lors de nouveaux messages
  useEffect(() => {
    if (isActive) {
      const now = Date.now();
      if (now - lastExpansion.current > 500) { // Éviter les expansions trop fréquentes
        setIsExpanded(true);
        onStateChange(true);
        lastExpansion.current = now;
      }
    }
  }, [isActive, onStateChange]);

  // Gérer le pliage automatique lors de la mise à jour de l'activité
  useEffect(() => {
    if (activityUpdated) {
      const now = Date.now();
      if (now - lastActivityUpdate.current > 500 && isExpanded) { // Vérifier si déplié et éviter les replis trop fréquents
        setIsExpanded(false);
        onStateChange(false);
        lastActivityUpdate.current = now;
      }
    }
  }, [activityUpdated, isExpanded, onStateChange]);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!startY) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY;
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.3; // Seuil de 30% pour le changement d'état
    
    if (Math.abs(deltaY) > threshold) {
      const shouldExpand = deltaY > 0;
      if (shouldExpand !== isExpanded) {
        setIsExpanded(shouldExpand);
        onStateChange(shouldExpand);
      }
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
  };

  const toggleExpansion = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onStateChange(newState);
    lastExpansion.current = Date.now();
  };

  return (
    <Box
      ref={blockRef}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: isExpanded ? '85%' : '15%',
        bgcolor: 'background.paper',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: isExpanded ? 1200 : 1000,
        boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        touchAction: 'none', // Empêcher le scroll pendant le glissement
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Box
        sx={{
          width: '100%',
          height: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          bgcolor: 'background.paper',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '4px',
            bgcolor: 'grey.300',
            borderRadius: '2px',
          }
        }}
        onClick={toggleExpansion}
      />
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          opacity: isExpanded ? 1 : 0.8,
          transition: 'opacity 0.3s ease'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MobileExchangeBlock; 