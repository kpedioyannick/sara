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
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  return (
    <Paper 
      elevation={2}
      sx={{
        p: 3,
        m: 2,
        maxWidth: '500px',
        width: '100%'
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        Progression des compétences
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Radar data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default SkillsRadar; 