import {
    MenuItem,
    Button,
    Card,
    FormControl,
    InputLabel,
    CardHeader,
    CardContent,
    Stack,
  } from '@mui/material';
  import React, { useEffect, useState } from 'react';
  import Select from '@mui/material/Select';
  import { fetchUsers } from '../../redux/actions/roleActions';
  import { fetchManagers, assignManager } from '../../redux/actions/assignManagerAction';
  import { useDispatch, useSelector } from 'react-redux';

  const UserRoleDash = () => {

    const userInfos = useSelector((state) => state.users?.users?.data);
  
    const Managers = useSelector((state) => state.managers?.requests?.data);

  
    useEffect(() => {}, [SelectedEmail]);
  
    const [users, setUsers] = useState();
    
    const [Managers_, setManagers] = useState(null);

    const [SelectedManager, setSelectedManager] = useState(null);
  
    const [SelectedEmail, setSelectedEmail] = useState(null);
  
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      fetchUsers()(dispatch);
    }, []);

    useEffect(() => {

      fetchManagers()(dispatch);

    }, []);
    
    const SubmitAssignRole = (event) => {
      event.preventDefault();
      dispatch(assignManager(SelectedEmail, SelectedManager));
    };
  
    useEffect(() => {
      setUsers({
        firstName: userInfos?.firstName,
        lastName: userInfos?.lastName,
        email: userInfos?.email,
      });

    }, [userInfos]);
  
    useEffect(() => {
      setManagers({
        id: Managers?.id,
        email: Managers?.email,
      });
    }, []);

    return (
      <>
        <div className="Content" data-testid="assign-role">
          <div className="ContentContainer">
            <div className="titleDashboard">
              <div className="text">
                <h4>Dashboard&gt;&gt;</h4>
                <h6 data-testid="assign-roles">Assign Manager</h6>
              </div>
            </div>
  
            <div className="contentBlock">
              <div className="Content">
                <Card sx={{ maxWidth: 400, margin: 'auto' }}>
                  <CardHeader title="Assign Manager" />
                  <CardContent>
                    <form className="formClass">
                      <Stack spacing={3}>
                        <FormControl fullWidth>
                          <InputLabel>Email</InputLabel>
                          <Select
                            className="inputData"
                            data-testid="user-byEmail"
                            defaultValue=""
                            onChange={(event) =>
                              setSelectedEmail(event.target.value)
                            }
                            variant="standard"
                          >
                            {userInfos?.map((value) => {
                              return (
                                <MenuItem value={value.email} key={value.email}>
                                  {value.email}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <FormControl fullWidth>
                          <InputLabel>Select Manager</InputLabel>
                          <Select
                            placeholder="select Manager"
                            className="OptionSelect"
                            data-testid="role-name-byId"
                            defaultValue=""
                            onChange={(event) => {
                              setSelectedManager(event.target.value);
                            }}
                            variant="standard"
                          >
                            {Managers?.map((value) => {
                              return (
                                <MenuItem value={value.id} key={value.id}>
                                  {value.firstName + " " +value.lastName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <FormControl fullWidth>
                          <Button
                            type="submit"
                            data-testid="assign-role-btn"
                            onClick={SubmitAssignRole}
                            variant="outlined"
                          >
                            assign Manager
                          </Button>
                        </FormControl>
                      </Stack>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default UserRoleDash;
  