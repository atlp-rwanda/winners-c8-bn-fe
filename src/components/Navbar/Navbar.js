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
  readNotification,
} from '../../redux/actions/notificationActions';

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
              sx={{ mt: '45px' }}
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
                  <Button size="sm">Mark all as read</Button>
                </Box>
              </Box>
              {notifications?.map?.((notification) => {
                return (
                  <MenuItem
                    key={notification.id}
                    onClick={() => {
                      handleNotificationClick(notification);
                    }}
                  >
                    <Card
                      style={{
                        background:
                          notification.status !== 'read'
                            ? 'rgba(0,0,0,0.2)'
                            : undefined,
                        width: '100%',
                      }}
                    >
                      <CardContent>
                        <h5>{notification.title}</h5>
                        <p>{notification.message}</p>
                        <small>{notification.createdAt}</small>
                      </CardContent>
                    </Card>
                  </MenuItem>
                );
              })}
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
