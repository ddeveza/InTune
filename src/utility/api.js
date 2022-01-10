import axios from "axios";
import { baseApiURL } from "./reusableFunctions";

export const _backend = {};

_backend.get = async (model, id, config) => {
  const url = id ? `${baseApiURL}/${model}/${id}` : `${baseApiURL}/${model}`;
  console.log(url);
  return axios
    .get(url, config)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return { error: error };
    });
};

_backend.create = async (model, payload, config) => {
  const url = `${baseApiURL}/${model}/create`;
  return axios
    .post(url, payload, config)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return { error: error };
    });
};

_backend.update = async (model, id, payload, config) => {
  const url = `${baseApiURL}/${model}/${id}/update`;
  console.log(url);
  return axios
    .put(url, payload, config)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return { error: error };
    });
};

_backend.delete = async (model, id, config) => {
  const url = `${baseApiURL}/${model}/${id}/delete`;
  return axios
    .delete(url, config)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return { error: error };
    });
};
