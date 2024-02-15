import axios from "axios";

export const punkApiServer = axios.create({
  baseURL: "https://api.punkapi.com/v2/beers/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
