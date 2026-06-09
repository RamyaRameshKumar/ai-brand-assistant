# AI Brand Assistant with Multi-Brand Context

## Project Overview

AI Brand Assistant is a backend service that allows users to create and manage multiple brands and interact with an AI-powered branding assistant.

The assistant helps users generate:

- Brand Names
- Taglines
- Target Audience Suggestions

Each brand maintains its own independent conversation context, allowing users to switch between brands without losing previous discussions.

### Key Features

- Create multiple brands
- Independent context per brand
- Chat-based interaction
- AI-powered responses using Groq LLM
- Context-aware suggestions
- Brand context retrieval
- REST API implementation

---

## Tech Stack

### Backend
- Node.js
- Express.js

### LLM Provider
- Groq API
- Model: llama-3.3-70b-versatile

### Storage
- In-memory storage

---

## Architecture Overview

### Request Flow

1. User creates a brand.
2. Brand is stored in memory with a unique ID.
3. User sends chat messages associated with a specific brand.
4. Previous conversation history for that brand is retrieved.
5. Context and user message are sent to Groq LLM.
6. AI response is returned and stored in the brand context.

### Context Management

Each brand stores its own conversation history:

```json
{
  "id": "brand-id",
  "name": "Fitness Brand",
  "context": [
    {
      "role": "user",
      "content": "I want a fitness brand"
    },
    {
      "role": "assistant",
      "content": "..."
    }
  ]
}
```

Only the selected brand's context is sent to the LLM, ensuring complete isolation between brands.

### Architecture Diagram

```text
Client/Postman
      |
      v
 Express API
      |
      v
 Brand Store
 (In Memory)
      |
      v
 Groq LLM
      |
      v
 Response
```

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/RamyaRameshKumar/ai-brand-assistant
cd ai-brand-assistant
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Run Application

```bash
npm start
```

Server runs on:

```text
http://localhost:3000
```

---

## How to Use

### Create Brand

**POST** `/brands`

Request:

```json
{
  "name": "Fitness Brand"
}
```

---

### List Brands

**GET** `/brands`

---

### Chat

**POST** `/chat`

Request:

```json
{
  "brand_id": "brand-id",
  "message": "I want a fitness brand"
}
```

Response:

```json
{
  "response": "AI generated response"
}
```

---

### Get Brand Context

**GET** `/brands/:id`

Example:

```http
GET /brands/123
```

---

### Switch Brand

Use a different `brand_id` when calling the chat endpoint.

Each brand maintains its own context and conversation history.

---

## API Usage Examples

### Create Brand

```bash
curl -X POST http://localhost:3000/brands \
-H "Content-Type: application/json" \
-d "{\"name\":\"Fitness Brand\"}"
```

### Chat

```bash
curl -X POST http://localhost:3000/chat \
-H "Content-Type: application/json" \
-d "{\"brand_id\":\"123\",\"message\":\"Make it more premium\"}"
```

### List Brands

```bash
curl http://localhost:3000/brands
```

### Get Brand Context

```bash
curl http://localhost:3000/brands/123
```

---

## Design Decisions

### Why In-Memory Storage?

In-memory storage was chosen to keep the implementation simple and focus on demonstrating multi-brand context management and LLM integration.

### Context Handling

Each brand maintains a separate conversation history stored in a context array.

This context is included in every LLM request, allowing the AI to generate responses based on previous interactions.

### Trade-Offs

#### Pros
- Simple implementation
- Fast development
- Easy to demonstrate

#### Cons
- Data is lost when the server restarts
- Not suitable for production-scale systems

---

## Limitations

- No database persistence
- No user authentication
- Single-server deployment
- Context grows indefinitely
- Data is lost after application restart

---

## Future Improvements

- MongoDB/PostgreSQL persistence
- User authentication and authorization
- Context summarization
- Streaming AI responses
- Redis caching
- Multi-user support
- Conversation analytics
- Context size management

---

## Loom Video

Loom Walkthrough Link:

https://www.loom.com/share/42d612a27c424ae7aad72eed4fc82518

---

## Author

Ramya Ramesh Kumar