import "dotenv/config";
import http from "http";

import app from "./server/app";
import connectToDB from "./lib/mongoose";

const { PORT = 3000 } = process.env;

async function start() {
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log("Server running!");
  });

  connectToDB();
}

start();
