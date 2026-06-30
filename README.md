<div align="center">
  <img src="./src/public/img/chatgpt-open-ai.jpg" alt="ChatGPT Integration" width="800"/>
  <br/>
  <br/>

  # 🤖 ChatGPT API Integration

  **REST API built with NestJS to integrate with OpenAI's GPT-4o-mini model**

  <p>
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/SWAGGER-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger"/>
    <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI"/>
    <img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  </p>

  <p>
    <img src="https://img.shields.io/badge/version-0.0.1-blue" alt="Version"/>
    <img src="https://img.shields.io/badge/license-UNLICENSED-red" alt="License"/>
    <img src="https://img.shields.io/badge/node-%3E%3D18-339933" alt="Node"/>
  </p>
</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [API](#-api)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Tests](#-tests)
- [License](#-license)

---

## 💡 About

This project is a **REST API** built with **NestJS** that acts as a proxy between the client and the **OpenAI Chat Completions API**. It exposes an endpoint that accepts a text prompt, forwards the request to the **GPT-4o-mini** model, and returns the AI-generated response.

### Features

- ✅ Send prompts to ChatGPT (GPT-4o-mini)
- ✅ Request validation with `class-validator`
- ✅ Interactive API documentation via **Swagger** (`/api`)
- ✅ Error handling and quota limit management (HTTP 429)
- ✅ Environment variable configuration

---

## 🏗 Architecture

The project follows **NestJS's modular architecture**, organized by feature:

```
                        ┌─────────────────────────────────────┐
                        │          HTTP Client                │
                        │     (Postman / Frontend / curl)     │
                        └──────────────┬──────────────────────┘
                                       │
                                       │ POST /chat/ask
                                       │ { "prompt": "..." }
                                       ▼
                        ┌─────────────────────────────────────┐
                        │          AppModule (Root)            │
                        │  ┌───────────────────────────────┐  │
                        │  │     ChatGptModule             │  │
                        │  │  ┌─────────────────────────┐  │  │
                        │  │  │   ChatGptController     │  │  │
                        │  │  │  (validation & routing) │  │  │
                        │  │  └──────────┬──────────────┘  │  │
                        │  │             │                  │  │
                        │  │  ┌──────────▼──────────────┐  │  │
                        │  │  │    ChatGptService       │  │  │
                        │  │  │   (business logic)      │  │  │
                        │  │  └──────────┬──────────────┘  │  │
                        │  └─────────────┼─────────────────┘  │
                        └────────────────┼────────────────────┘
                                         │
                                         │ HTTPS
                                         ▼
                        ┌─────────────────────────────────────┐
                        │     OpenAI API (api.openai.com)     │
                        │  POST /v1/chat/completions          │
                        │  Model: gpt-4o-mini                 │
                        └─────────────────────────────────────┘
```

### Request Flow

1. The client sends a `POST /chat/ask` with `{ "prompt": "message" }`
2. The global **ValidationPipe** validates the request fields
3. The **ChatGptController** receives the request and calls the service
4. The **ChatGptService** builds the payload and makes an HTTP request to OpenAI
5. OpenAI's response is extracted and returned to the client as `{ "response": "text" }`
6. On error (quota exceeded, invalid key, etc.), it returns **HTTP 429**

---

## 🛠 Tech Stack

| Category        | Technology                                                      |
| --------------- | --------------------------------------------------------------- |
| **Runtime**     | [Node.js](https://nodejs.org/) >= 18                            |
| **Language**    | [TypeScript](https://www.typescriptlang.org/) ^5.7.3            |
| **Framework**   | [NestJS](https://nestjs.com/) ^11.0.1                           |
| **HTTP Client** | [Axios](https://axios-http.com/) ^1.16.0                        |
| **Validation**  | [class-validator](https://github.com/typestack/class-validator) + [class-transformer](https://github.com/typestack/class-transformer) |
| **API Docs**    | [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) ^11.0.6 (Swagger) |
| **Config**      | [@nestjs/config](https://docs.nestjs.com/techniques/configuration) ^4.0.1 |
| **Testing**     | [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest) |
| **Lint/Format** | [ESLint](https://eslint.org/) ^9 + [Prettier](https://prettier.io/) ^3.4 |
| **Compiler**    | [SWC](https://swc.rs/) (fast compilation)                      |

---

## ✅ Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- An **OpenAI API key** with available credits ([get a key](https://platform.openai.com/api-keys))

---

## 🚀 Installation & Setup

```bash
# 1. Clone the repository
$ git clone <your-repo>

# 2. Install dependencies
$ npm install

# 3. Configure the OpenAI key
$ cp .env.example .env
# Edit the .env file and add your OPENAI_API_KEY

# 4. Run in development mode (with hot-reload)
$ npm run dev

# 5. Access the API
#    Endpoint: http://localhost:3000/chat/ask
#    Swagger:  http://localhost:3000/api
```

The application will be available on the port set in `PORT` (default: `3000`).

---

## 📡 API

### `POST /chat/ask`

Sends a prompt to ChatGPT and returns the generated response.

#### Request

```json
{
  "prompt": "What is the capital of Germany?"
}
```

#### Response (200 OK)

```json
{
  "response": "The capital of Germany is Berlin"
}
```

#### Response (429 Too Many Requests)

```json
{
  "message": "You exceeded your current quota. Check your plan and billing details.",
  "error": "Too Many Requests",
  "statusCode": 429
}
```

#### Response (400 Bad Request)

```json
{
  "message": ["prompt must be a string"],
  "error": "Bad Request",
  "statusCode": 400
}
```

> Full interactive documentation is available on **Swagger** at [`/api`](http://localhost:3000/api) when the application is running.

---

## 📸 Screenshots

> *Space reserved for screenshots of the main project screens/tools.*

### Swagger UI — Interactive Documentation

<div align="center">
  <img src="./src/assets/doc/swagger.png" alt="Swagger UI" width="700"/>
  <br/>
  <em>Swagger interface showing the POST /chat/ask endpoint with the "Try it out" option.</em>
</div>

### Testing in Swagger — Request and Response

<div align="center">
  <img src="./src/assets/doc/req_res.png" alt="Swagger Try It Out" width="700"/>
  <br/>
  <em>Example request sent via Swagger with a prompt and the response received from ChatGPT.</em>
</div>

### Postman — Collection

<div align="center">
  <img src="./src/assets/doc/postman.png" alt="Postman Request" width="700"/>
  <br/>
  <em>Request made through Postman using the collection available in <code>Postman/</code>.</em>
</div>

> 💡 **Tip:** Place your images in the `src/assets/doc/` folder and update the paths above as needed. To create this folder, run:
> ```bash
> $ mkdir -p src/assets/doc
> ```

---

## 📁 Project Structure

```
integracao-chatgpt/
├── .env.example                 # Environment variable example
├── .gitignore
├── .prettierrc                  # Prettier configuration
├── eslint.config.mjs            # ESLint configuration (flat config)
├── nest-cli.json                # NestJS CLI configuration
├── package.json
├── tsconfig.json                # TypeScript configuration
├── tsconfig.build.json          # Build configuration
├── Postman/
│   └── ChatGpt.postman_collection.json   # Postman collection
├── src/
│   ├── main.ts                  # Application bootstrap
│   ├── app.module.ts            # Root module
│   ├── chat-gpt/                # ChatGPT integration module
│   │   ├── chat-gpt.module.ts   # Module definition
│   │   ├── chat-gpt.controller.ts  # REST endpoints
│   │   ├── chat-gpt.service.ts     # Business logic
│   │   ├── dtos/
│   │   │   └── prompt-chat-gtp.dto.ts  # Validation DTO
│   │   └── excetions/
│   │       └── quota-exceeded.exception.ts  # Quota exception
│   └── public/
│       └── img/
│           ├── chatgpt-open-ai.jpg    # Project banner
│           └── screenshots/           # App screenshots
└── test/
    ├── app.e2e-spec.ts          # End-to-end test
    └── jest-e2e.json            # E2E test configuration
```

---

## 📜 Available Scripts

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `npm run build`      | Compile TypeScript to `dist/`                     |
| `npm run start`      | Run in development mode                           |
| `npm run dev`        | Run with hot-reload (recommended for development) |
| `npm run start:prod` | Run the production build                          |
| `npm run lint`       | Check and fix lint issues                         |
| `npm run format`     | Format code with Prettier                         |
| `npm test`           | Run unit tests                                    |
| `npm run test:watch` | Run tests in watch mode                           |
| `npm run test:cov`   | Run tests with coverage                           |
| `npm run test:e2e`   | Run end-to-end tests                              |

---

## 🔐 Environment Variables

| Variable          | Required | Default | Description                     |
| ----------------- | :------: | ------- | ------------------------------- |
| `OPENAI_API_KEY`  |    ✅    | —       | OpenAI API key                  |
| `PORT`            |    ❌    | `3000`  | Port the server will listen on  |

> Create a `.env` file in the project root based on `.env.example` to configure the variables.

---

## 🧪 Tests

```bash
# Unit tests
$ npm test

# End-to-end tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

---

## 📄 License

This project is private — **UNLICENSED**.
