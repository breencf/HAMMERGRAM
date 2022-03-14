const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.send("Suhhhhhhhhh");
});

module.exports = router;
