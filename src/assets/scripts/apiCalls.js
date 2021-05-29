import axios from "axios";

// export const SERVER = "http://localhost:5029";
// export const SERVER = "https://bookmarks-api.andreashg.com";
export const SERVER = process.env.REACT_APP_HOST
console.log(SERVER);

export const getAll = async (route) => {
  try {
    let res = await axios.get(`${SERVER}/${route}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getById = async (route, id) => {
  try {
    let res = await axios.get(`${SERVER}/${route}/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getByTitle = async (route, title) => {
  try {
    let res = await axios.get(`${SERVER}/${route}/title/${title}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

// CREATE

export const create = async (model, data) => {
  const formData = new FormData(data);

  const response = await axios
    .post(`${SERVER}/${model}`, formData, { withCredentials: true })
    .then((res) => res)
    .catch((err) => err);
  return response;
};

// UPDATE

export const update = async (model, data, id) => {
  const formData = new FormData(data);
  console.log(formData);
  const response = await axios
    .put(`${SERVER}/${model}/admin/${id}`, formData, { withCredentials: true })
    .then((res) => res)
    .catch((err) => console.log({ err }));
  return response;
};

export const updateSingle = async (model, data) => {
  const formData = new FormData(data);
  console.log(formData);
  const response = await axios
    .put(`${SERVER}/${model}/admin`, formData, { withCredentials: true })
    .then((res) => res)
    .catch((err) => err);
  return response;
};

export const patch = async (model, data, id) => {
  const formData = data

  const response = await axios
    .patch(`${SERVER}/${model}/admin/${id}`, formData, { withCredentials: true })
    .then((res) => res)
    .catch((err) => console.log({ err }));
  return response;
};

// DELETE

export const deleteOne = async (model, id) => {
  console.log({ id });
  const response = await axios
    .delete(`${SERVER}/${model}/admin/${id}`, { withCredentials: true })
    .then((res) => res)
    .catch((err) => console.log({ err }));
  return response;
};

// LOGIN

export const login = async (loginData) => {
  const formData = new FormData(loginData);
  const response = await axios
    .post(`${SERVER}/login/login`, formData, { withCredentials: true })
    .then((res) => res)
    .catch((err) => console.log({ err }));
  return response;
};

// LOGOUT

export const logout = async (loginData) => {
  const response = await axios
    .get(`${SERVER}/login/logout`, { withCredentials: true })
    .then((res) => res)
    .catch((err) => console.log({ err }));
  return response;
};

// CHECK LOGIN

export const loggedIn = async () => {
  const response = await axios
    .get(`${SERVER}/login/loggedIn`, { withCredentials: true })
    .then((res) => res)
    .catch((err) => false);
  // console.log(response)
  return response;
};
