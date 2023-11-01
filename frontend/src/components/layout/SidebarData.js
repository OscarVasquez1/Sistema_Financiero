import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LoginIcon from '@mui/icons-material/Login';
import BusinessIcon from '@mui/icons-material/Business';

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/',
    icon: <HomeIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <LoginIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Empresa',
    path: '/empresa',
    icon: <BusinessIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Gestión sectores',
    path: '/sector',
    icon: <AssignmentIcon/>,
    cName: 'nav-text'
  },
];