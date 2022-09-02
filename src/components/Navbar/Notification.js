import React, { useState } from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {
  Badge,
  Box,
  IconButton,
  Avatar,
  Button,
  Menu,
  CardContent,
  Typography,
  Card,
  Stack,
} from '@mui/material';
import { Delete, DoneAll } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {
  deleteNotification,
  readAllNotification,
  readNotification,
} from '../../redux/actions/notificationActions';
function Notification({ unreadNotifications, notifications }) {
  const dispatch = useDispatch();
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
  return (
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
        style={{ minWidth: '250px' }}
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: '10px', borderBottom: '1px solid rgba(0,0,0,0.2)' }}
        >
          <Box>
            <Typography sx={{ display: 'inline' }} variant="h5">
              Notification
            </Typography>
          </Box>
          <Box>
            <IconButton size="sm" onClick={handleReadAllNotification}>
              <DoneAll />
            </IconButton>
          </Box>
        </Stack>
        <Box sx={{ p: '10px' }}>
          {notifications?.map?.((notification) => {
            return (
              <Card
                key={notification.id}
                sx={{ mt: '10px' }}
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
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box sx={{ p: '5px' }}>
                      <Avatar />
                    </Box>
                    <Box>
                      <h5>{notification.title}</h5>
                      <p>{notification.message}</p>
                      <small>{notification.createdAt}</small>
                    </Box>
                    <Box sx={{ p: '5px' }}>
                      <Button
                        onClick={() => handleNotificationDelete(notification)}
                        variant="error"
                        style={{ width: '100%' }}
                      >
                        <Delete />
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Menu>
    </Box>
  );
}

export default Notification;
