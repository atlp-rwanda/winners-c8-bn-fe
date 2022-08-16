/**
 *
 * @param {*} path
 * @param {} headers
 * @returns
 */
export const get = async (path, options = {}) => {
  if (!options.headers)
    options.headers = {
      authorization: `Bearer ${
        localStorage.getItem('auth-token') || undefined
      }`,
    };
  else
    options.headers = Object.assign({}, options.headers, {
      authorization: `Bearer ${
        localStorage.getItem('auth-token') || undefined
      }`,
    });
  return fetch(`${process.env.BASE_BACKEND_SERVER_URL}${path}`, options);
};
