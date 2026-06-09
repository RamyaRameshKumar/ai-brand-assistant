const axios = require("axios");

const generateResponse = async (context, userMessage) => {
  const messages = [
    {
      role: "system",
      content: `
You are an AI Brand Assistant.

Help users generate:
- Brand Name
- Tagline
- Target Audience

Always consider previous conversation context and refine suggestions based on user feedback.
`
    }
  ];

  context.forEach(msg => {
    messages.push(msg);
  });

  messages.push({
    role: "user",
    content: userMessage
  });

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
};

module.exports = {
  generateResponse
};