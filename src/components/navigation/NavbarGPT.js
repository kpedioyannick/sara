import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Collapse,
  SwipeableDrawer,
  Button,
  Avatar,
  Menu
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import { mockAuthService } from '../../mocks/services/mockAuthService';
import { mockApiService } from '../../mocks/services/mockApiService';
import { learningPaths } from '../../mocks/data/mockData';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const NavbarGPT = ({ onPathSelect, onResumePath }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState(null);
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userPaths, setUserPaths] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser(token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadUserPaths();
    }
  }, [user]);

  const loadCategories = async () => {
    try {
      const data = await mockApiService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const loadUser = async (token) => {
    try {
      const userData = await mockAuthService.getCurrentUser(token);
      setUser(userData);
    } catch (error) {
      console.error('Erreur de chargement utilisateur:', error);
      localStorage.removeItem('token');
    }
  };

  const loadUserPaths = async () => {
    try {
      const paths = await mockApiService.getUserPaths(user.id);
      setUserPaths(paths);
    } catch (error) {
      console.error('Erreur de chargement des parcours:', error);
    }
  };

  const handleLogin = async (email, password) => {
    const { user: userData, token } = await mockAuthService.login(email, password);
    localStorage.setItem('token', token);
    setUser(userData);
    setLoginOpen(false);
  };

  const handleRegister = async (email, password, name) => {
    const { user: userData, token } = await mockAuthService.register(email, password, name);
    localStorage.setItem('token', token);
    setUser(userData);
    setRegisterOpen(false);
  };

  const handleLogout = async () => {
    await mockAuthService.logout();
    localStorage.removeItem('token');
    setUser(null);
    setUserPaths([]);
    setAnchorEl(null);
  };

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedSubcategory(null);
  };

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    setExpandedSubcategory(expandedSubcategory === subcategoryId ? null : subcategoryId);
  };

  const handlePathSelect = async (pathId) => {
    setDrawerOpen(false);
    onPathSelect(pathId);
  };

  const handlePathClick = async (userPath) => {
    try {
      const resumeData = await mockApiService.resumePath(user.id, userPath.pathId);
      onResumePath(resumeData);
      setDrawerOpen(false);
    } catch (error) {
      console.error('Erreur lors de la reprise du parcours:', error);
    }
  };

  const renderNestedList = () => (
    <List>
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleCategoryClick(category.id)}
              sx={{
                bgcolor: expandedCategory === category.id ? 'action.selected' : 'transparent'
              }}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary={category.name} />
              {expandedCategory === category.id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={expandedCategory === category.id} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {category.subcategories.map((subcat) => (
                <React.Fragment key={subcat.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleSubcategoryClick(category.id, subcat.id)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={subcat.name} />
                      {expandedSubcategory === subcat.id ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={expandedSubcategory === subcat.id} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {subcat.paths.map((pathId) => {
                        const path = learningPaths.find(p => p.id === pathId);
                        return path ? (
                          <ListItem key={path.id} disablePadding>
                            <ListItemButton
                              onClick={() => handlePathSelect(path.id)}
                              sx={{ pl: 6 }}
                            >
                              <ListItemText 
                                primary={path.title}
                                secondary={path.description}
                                secondaryTypographyProps={{
                                  noWrap: true,
                                  style: { opacity: 0.7 }
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ) : null;
                      })}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );

  const renderUserPaths = () => {
    if (!user || !userPaths.length) return null;

    return (
      <List>
        <ListItem>
          <ListItemText 
            primary="Mes parcours"
            primaryTypographyProps={{
              variant: 'subtitle1',
              fontWeight: 'bold'
            }}
          />
        </ListItem>
        {userPaths.map((userPath) => (
          <ListItem key={userPath.pathId} disablePadding>
            <ListItemButton
              onClick={() => handlePathClick(userPath)}
              sx={{ 
                pl: 4,
                position: 'relative'
              }}
            >
              <ListItemText
                primary={userPath.pathDetails.title}
                secondaryTypographyProps={{ component: 'div' }}
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ 
                      flex: 1,
                      height: 4,
                      bgcolor: 'grey.200',
                      borderRadius: 1,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{ 
                        width: `${userPath.progress}%`,
                        height: '100%',
                        bgcolor: 'primary.main',
                        transition: 'width 0.3s ease'
                      }} />
                    </Box>
                    <Typography component="span" variant="caption" color="text.secondary">
                      {Math.round(userPath.progress)}%
                    </Typography>
                  </Box>
                }
              />
              {userPath.progress === 100 && (
                <Box sx={{ 
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'success.main'
                }}>
                  <CheckCircleIcon fontSize="small" />
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  const DrawerHeader = () => (
    <Box sx={{ 
      p: 2, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      borderBottom: 1,
      borderColor: 'divider',
      bgcolor: 'background.paper',
      position: 'sticky',
      top: 0,
      zIndex: 1100
    }}>
      <Typography variant="h6">
        Parcours d'apprentissage
      </Typography>
      <IconButton 
        onClick={() => setDrawerOpen(false)}
        sx={{
          p: 1,
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );

  const renderAuthSection = () => {
    if (user) {
      return (
        <>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ ml: 2 }}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {user.name[0].toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              Mon profil
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Se déconnecter
            </MenuItem>
          </Menu>
        </>
      );
    }

    return (
      <Button
        color="inherit"
        onClick={() => setLoginOpen(true)}
        sx={{ ml: 2 }}
      >
        Se connecter
      </Button>
    );
  };

  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: 'background.paper', 
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SARA
          </Typography>
          {renderAuthSection()}
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <SwipeableDrawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
          PaperProps={{
            sx: {
              width: '100%',
              bgcolor: 'background.paper',
              height: '100%'
            }
          }}
          swipeAreaWidth={30}
          disableBackdropTransition
          disableDiscovery={isMobile}
        >
          <DrawerHeader />
          <Box sx={{ overflowY: 'auto', flex: 1 }}>
            {renderUserPaths()}
            {renderNestedList()}
          </Box>
        </SwipeableDrawer>
      ) : (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 320,
              bgcolor: 'background.paper',
              borderRight: 1,
              borderColor: 'divider'
            }
          }}
        >
          <DrawerHeader />
          <Box sx={{ overflowY: 'auto', flex: 1 }}>
            {renderUserPaths()}
            {renderNestedList()}
          </Box>
        </Drawer>
      )}

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />

      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
    </>
  );
};

export default NavbarGPT; 