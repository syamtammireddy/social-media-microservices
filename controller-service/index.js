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

app.get("/services", (req, res) => {
  res.json({ success: true, data: services, message: "Services retrieved successfully" });
});

app.get("/services/:name", (req, res) => {
  const serviceStatus = services[req.params.name];
  if (serviceStatus !== undefined) {
    res.json({ success: true, data: { status: serviceStatus }, message: "Service status retrieved" });
  } else {
    res.status(404).json({ success: false, data: null, message: "Service not found" });
  }
});

app.post("/toggle", (req, res) => {
  const { service, status } = req.body;
  if (services[service] !== undefined) {
    services[service] = status;
    res.json({ success: true, data: services, message: `Service ${service} toggled to ${status}` });
  } else {
    res.status(404).json({ success: false, data: null, message: "Service not found" });
  }
});

app.listen(4000, () => console.log("Controller running on port 4000"));