import axios from 'axios';

const geoCodingIntance = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const openMeteoInstance = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export {geoCodingIntance, openMeteoInstance};
