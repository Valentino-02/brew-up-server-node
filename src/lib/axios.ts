import axios from "axios";

export const punkApiServer = axios.create({
  baseURL: "https://api.punkapi.com/v2/beers/",
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});
