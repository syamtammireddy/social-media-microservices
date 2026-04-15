const express = require("express");
const app = express();

app.use(express.json());

let services = {
  auth: true,
  user: true,
  post: true,
  feed: true,
  comment: true,
  friend: true,
  notification: true
};

app.get("/services", (req, res) => res.json(services));

app.get("/services/:name", (req, res) => {
  res.json({ status: services[req.params.name] });
});

app.post("/toggle", (req, res) => {
  const { service, status } = req.body;
  services[service] = status;
  res.json(services);
});

app.listen(4000, () => console.log("Controller running"));