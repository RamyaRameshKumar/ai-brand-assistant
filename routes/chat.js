const express = require("express");

const router = express.Router();

const { brands } = require("../data/store");
const { generateResponse } = require("../services/groqService");

router.post("/", async (req, res) => {
  try {
    const { brand_id, message } = req.body;

    const brand = brands.find(
      b => b.id === brand_id
    );

    if (!brand) {
      return res.status(404).json({
        message: "Brand not found"
      });
    }

    const aiResponse = await generateResponse(
      brand.context,
      message
    );

    brand.context.push({
      role: "user",
      content: message
    });

    brand.context.push({
      role: "assistant",
      content: aiResponse
    });

    res.json({
      response: aiResponse
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;