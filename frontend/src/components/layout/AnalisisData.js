import React from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

export const AnalisisData = [
  {
    title: 'Analisis horizontal',
    path: '/analisisHorizontal',
    icon: <DescriptionIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Analisis vertical',
    path: '/analisisVertical',
    icon: <DescriptionIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Informe ratios',
    path: '/informeRatios',
    icon: <DescriptionIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Graficar',
    path: '/graficar',
    icon: <AutoGraphIcon />,
    cName: 'nav-text'
  },
];