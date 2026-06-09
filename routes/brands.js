const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const { brands } = require("../data/store");

router.post("/", (req, res) => {
  const brand = {
    id: uuidv4(),
    name: req.body.name,
    context: [],
    createdAt: new Date()
  };

  brands.push(brand);

  res.status(201).json(brand);
});

router.get("/", (req, res) => {
  res.json(brands);
});

router.get("/:id", (req, res) => {
  const brand = brands.find(
    b => b.id === req.params.id
  );

  if (!brand) {
    return res.status(404).json({
      message: "Brand not found"
    });
  }

  res.json(brand);
});

module.exports = router;