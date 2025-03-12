import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Box, Paper, Typography } from '@mui/material';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsRadar = ({ path, results }) => {
  // Calculer les compétences actuelles basées sur les résultats
  const currentSkills = { ...path.skills };
  
  // Mise à jour directe des compétences à partir des résultats
  results.forEach(result => {
    if (result.skillsImpact) {
      Object.entries(result.skillsImpact).forEach(([skill, value]) => {
        currentSkills[skill] = (currentSkills[skill] || 0) + value;
      });
    }
  });

  const data = {
    labels: Object.keys(path.skills),
    datasets: [
      {
        label: 'Compétences acquises',
        data: Object.values(currentSkills),
        backgroundColor: 'rgba(5, 150, 105, 0.15)',
        borderColor: '#059669',
        borderWidth: 2,
        pointBackgroundColor: '#059669',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#047857',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        pointLabels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: 500
          },
          color: '#2d2d2d'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          font: {
            size: 10
          },
          color: '#666'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: 500
          },
          color: '#2d2d2d',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
          weight: 600
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif"
        },
        padding: 12,
        cornerRadius: 8
      }
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{
        width: '100%',
        p: 3,
        borderRadius: '16px',
        bgcolor: '#fff'
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom 
        align="center"
        sx={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#2d2d2d',
          mb: 3
        }}
      >
        Progression des compétences
      </Typography>
      <Box 
        sx={{ 
          position: 'relative',
          p: 1
        }}
      >
        <Radar data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default SkillsRadar; 