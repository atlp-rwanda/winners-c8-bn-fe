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
import {
  fetchRoles,
  fetchUsers,
  assignRoles,
} from '../../redux/actions/roleActions';
import { useDispatch, useSelector } from 'react-redux';
const UserRoleDash = () => {
  const userInfos = useSelector((state) => state.users?.users?.data);

  const roleData = useSelector((state) => state.roles?.roles);

  useEffect(() => {}, [SelectedEmail]);

  const [users, setUsers] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [SelectedRole, setSelectedRole] = useState(null);

  const [SelectedEmail, setSelectedEmail] = useState(null);

  const [roles, setRoles] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers()(dispatch);
  }, []);

  useEffect(() => {
    fetchRoles()(dispatch);
  }, []);

  const placeholder = ['select an email'];

  const SubmitAssignRole = (event) => {
    event.preventDefault();
    dispatch(assignRoles(SelectedEmail, SelectedRole));
  };

  useEffect(() => {
    setUsers({
      firstName: userInfos?.firstName,
      lastName: userInfos?.lastName,
      email: userInfos?.email,
    });
    setIsLoading(true);
  }, [userInfos]);

  useEffect(() => {
    setRoles({
      id: roleData?.roleId,
      role: roleData?.roleName,
    });
    setIsLoading(true);
  }, [roleData]);
  return (
    <>
      <div className="Content" data-testid="assign-role">
        <div className="ContentContainer">
          <div className="titleDashboard">
            <div className="text">
              <h4>Dashboard&gt;&gt;</h4>
              <h6 data-testid="assign-roles">Assign Role</h6>
            </div>
          </div>

          <div className="contentBlock">
            <div className="Content">
              <Card sx={{ maxWidth: 345, margin: 'auto' }}>
                <CardHeader title="Assign role" />
                <CardContent>
                  <form className="formClass">
                    <Stack spacing={3}>
                      <FormControl fullWidth>
                        <InputLabel>Email</InputLabel>
                        <Select
                          className="inputData"
                          data-testid="user-byEmail"
                          defaultValue={users?.email}
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
                        <InputLabel>Role</InputLabel>
                        <Select
                          placeholder={placeholder}
                          className="OptionSelect"
                          data-testid="role-name-byId"
                          defaultValue={roles?.role}
                          onChange={(event) => {
                            setSelectedRole(event.target.value);
                          }}
                          variant="standard"
                        >
                          {roleData?.map((value) => {
                            return (
                              <MenuItem value={value.id} key={value.id}>
                                {value.roleName}
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
                          assignRole
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
