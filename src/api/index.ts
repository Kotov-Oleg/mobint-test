import axios, { AxiosInstance } from 'axios';

const baseURL = 'there was a url here'

const host: AxiosInstance  = axios.create({
  baseURL,
  headers: {
    TOKEN: 123
  }
})

export {host}