import axios from 'axios';
import { api } from "./constants";

class API {
  constructor(endpoint) {
    this.domain = api;
    this.endpoint = endpoint;
    this.format = "json";
  }

  /**
   * Build a parameter string from an array
   *
   * @param {params}
   * @return {string}
   */
  buildParams = params => {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => `${esc(k)}=${esc(params[k])}`)
      .join("&");
  };

  /**
   * Fetch data
   *
   * @param {params}
   * @return {Promise}
   */
  fetch = params => {
    const paramString = this.buildParams(params);
    const url = `${this.domain}${this.endpoint}?${paramString}`;
    console.log(`[API]: Fetch Endpoint -> ${url}`);
    return axios.get(url);
  };

  /**
   * Post data
   *
   * @param {params}
   * @return {Promise}
   */
  post = params => {
    const url = `${this.domain}${this.endpoint}`;
    console.log(`[API]: Post Endpoint -> ${url}`);
    return axios.post(url, params);
  };
}

export default API;
