import React, { useEffect, useState } from 'react';
import './navbar.scss';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import {
  AppBar,
  Toolbar,
  Badge,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';

import Notification from './Notification';

const Navbar = ({
  user,
  notifications,
  socket,
  onlineStatus,
  unreadNotifications,
}) => {
  const [avatarAnch, setAvatarAnch] = useState(null);

  const handleClose = () => {
    setAvatarAnch(null);
  };
  return (
    <Box>
      <AppBar variant="elevation" color="inherit" position="static">
        <Toolbar style={{ width: '100%' }}>
          <Badge className="item">
            <ListOutlinedIcon className="icon" />
          </Badge>
          <Box sx={{ flexGrow: 1 }} />
          <Notification
            notifications={notifications}
            unreadNotifications={unreadNotifications}
          />
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={setAvatarAnch}>
              <Badge variant="dot" color={onlineStatus ? 'success' : 'error'}>
                <Avatar src={user?.image} sx={{ p: 0 }}></Avatar>
              </Badge>
            </IconButton>

            <Menu
              sx={{ mt: '45px' }}
              anchorEl={avatarAnch}
              open={!!avatarAnch}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClose}>{user?.username}</MenuItem>
              <MenuItem
                onClick={handleClose}
              >{`${user?.firstName}  ${user?.lastName}`}</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
