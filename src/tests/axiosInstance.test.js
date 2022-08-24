import AxiosMockAdapter from 'axios-mock-adapter';
import axiosInstance from '../helpers/http';
const mock = new AxiosMockAdapter(axiosInstance);
describe('Axios instance test', () => {
  it('It should append the token from the localstorage if the it available', async () => {
    let response;
    mock
      .onGet(
        '/',
        {},
        expect.objectContaining({
          Authorization: expect.stringMatching(/^Bearer/),
        })
      )
      .reply(200);
    response = await axiosInstance.get('/');
    expect(response).toBeUndefined();
    localStorage.setItem('auth-token', 'Token');
    response = await axiosInstance.get('/');
    expect(response.status).toBe(200);
  });
  it('should be able to handle the 401 error', async () => {
    mock.onGet(/tokenError/i).reply(401, {
      success: false,
      status: 401,
      data: { message: 'Access denied. Invalid token' },
    });
    const result = await axiosInstance.get('/tokenError');
    expect(result.status).toBe(401);
  });
});
axiosInstance;
