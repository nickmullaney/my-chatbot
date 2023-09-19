# OpenAi Chatbot connected to Zendesk API

An AI-powered chatbot project that provides real-time assistance and integrates with Zendesk for help article retrieval.

## Table of Contents

- [OpenAi Chatbot connected to Zendesk API](#openai-chatbot-connected-to-zendesk-api)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Integration with Zendesk and OpenAI](#integration-with-zendesk-and-openai)
    - [Zendesk Integration](#zendesk-integration)
    - [OpenAI Integration](#openai-integration)
  - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [License](#license)

## Project Overview

The Chatbot Project is an interactive chat interface powered by AI. It allows users to have conversations with an AI assistant that can answer questions and provide assistance. The project also integrates with Zendesk, enabling users to access help articles for more information.

## Technologies Used

- [Next.js](https://nextjs.org/) - A React framework for building server-rendered React applications.

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.

- [React DOM](https://reactjs.org/docs/react-dom.html) - React package for working with the DOM.

- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for quickly building custom designs.

- [Material-UI](https://mui.com/) - A popular React UI framework for building responsive web applications.

- [Emotion](https://emotion.sh/) - A library for writing CSS styles with JavaScript.

- [Axios](https://axios-http.com/) - A promise-based HTTP client for making requests to your API.

- [React Cookie](https://www.npmjs.com/package/react-cookie) - A library for handling cookies in React applications.

- [OpenAI](https://beta.openai.com/docs/introduction) - An AI platform used for natural language processing tasks.

- [OpenAI Edge](https://github.com/openai/openai-edge-js) - A JavaScript client for the OpenAI API.

- [Eventsource Parser](https://www.npmjs.com/package/eventsource-parser) - A library for parsing Server-Sent Events (SSE) data.

- [PostCSS](https://postcss.org/) - A CSS post-processor that helps with transforming styles.

- [TypeScript](https://www.typescriptlang.org/) - A statically typed superset of JavaScript for building scalable web applications.

- [ESLint](https://eslint.org/) - A tool for identifying and fixing problems in your JavaScript code.

- [Autoprefixer](https://autoprefixer.github.io/) - A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.

- [clsx](https://github.com/lukeed/clsx) - A utility for constructing className strings in JavaScript.

## Features

- Chatbot Interface
  - Interactive chat with AI assistant
  - Real-time responses
- Zendesk Integration
  - Access to help articles from Zendesk
  - AI-driven assistance for user queries

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have the following software/tools installed:

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nickmullaney/my-chatbot
   ```

2. Change to the project directory:

   ```bash
   cd chatbot-project
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to use the chatbot interface.

## Integration with Zendesk and OpenAI

The project integrates with Zendesk and OpenAI to provide a comprehensive chatbot experience:

### Zendesk Integration

- **Access to Help Articles**: Users can access help articles from Zendesk to get detailed information about the website and the web application.

- **AI-Driven Assistance**: The chatbot can retrieve and suggest relevant Zendesk articles when users ask questions related to the product or find outside information to supplement.

### OpenAI Integration

- **AI-Powered Responses**: The chatbot leverages the OpenAI API to provide real-time responses to user queries.

- **Natural Language Understanding**: OpenAI's powerful language models allow the chatbot to understand and generate human-like responses.

- **Customizable AI Behavior**: You can fine-tune the chatbot's behavior by adjusting various parameters such as temperature, max tokens, and more.

By combining Zendesk and OpenAI integrations, the chatbot delivers a user-friendly and informative experience.

## Configuration

To configure the project, you need to set the following environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key.
- `AI_TEMP=0.7`: The temperature of the AI model.
- `AI_MAX_TOKENS=100`: The maximum number of tokens to generate.

## Contributing

We welcome contributions to improve this project. If you find any issues or have ideas for enhancements, please open an issue or create a pull request.

For bug reports, feature requests, and discussions, visit the [Issues](https://github.com/nickmullaney/my-chatbot/issues) section.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.