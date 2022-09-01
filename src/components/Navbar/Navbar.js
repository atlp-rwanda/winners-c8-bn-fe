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
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  deleteNotification,
  readAllNotification,
  readNotification,
} from '../../redux/actions/notificationActions';
import { Delete } from '@mui/icons-material';

const Navbar = ({
  user,
  notifications,
  socket,
  onlineStatus,
  unreadNotifications,
}) => {
  const [avatarAnch, setAvatarAnch] = useState(null);
  const dispatch = useDispatch();
  const handleAvatarClick = (event) => {
    setAnchElement(event.currentTarget);
  };
  const [notificationAnch, setNotificationAnch] = useState(null);
  const handleNotificationAnchClick = (event) => {
    setNotificationAnch(event.currentTarget);
  };
  const handleNotificationClick = (notification) => {
    if (notification.status !== 'read')
      dispatch(readNotification(notification));
  };

  const handleNotificationDelete = (notification) =>
    dispatch(deleteNotification(notification));
  const handleReadAllNotification = () => dispatch(readAllNotification());
  const handleClose = () => {
    setAvatarAnch(null);
    setNotificationAnch(null);
  };
  useEffect(() => {}, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar variant="elevation" color="inherit" position="static">
        <Toolbar>
          <Badge className="item">
            <ListOutlinedIcon className="icon" />
          </Badge>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleNotificationAnchClick}>
              <Badge badgeContent={unreadNotifications} color="error">
                <NotificationsNoneOutlinedIcon className="icon" />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notificationAnch}
              open={!!notificationAnch}
              onClose={handleClose}
              sx={{ mt: '45px', padding: '10px' }}
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
              <Box>
                <Typography>Notification</Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Button size="sm" onClick={handleReadAllNotification}>
                    Mark all as read
                  </Button>
                </Box>
              </Box>
              <Box sx={{ p: '10px' }}>
                {notifications?.map?.((notification) => {
                  return (
                    <Card
                      key={notification.id}
                      onClick={() => {
                        handleNotificationClick(notification);
                      }}
                      style={{
                        background:
                          notification.status !== 'read'
                            ? 'rgba(0,0,0,0.2)'
                            : undefined,
                        width: '100%',
                        padding: '10px',
                      }}
                    >
                      <CardContent>
                        <h5>{notification.title}</h5>
                        <p>{notification.message}</p>
                        <small>{notification.createdAt}</small>
                      </CardContent>
                      <Button
                        onClick={() => handleNotificationDelete(notification)}
                        variant="error"
                        style={{ width: '100%' }}
                      >
                        <Delete />
                      </Button>
                    </Card>
                  );
                })}
              </Box>
            </Menu>
          </Box>
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
