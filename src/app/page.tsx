import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Chat from '../components/chat';

function Home() {
  return (
    <Container maxWidth="lg" className="flex flex-col gap-12">
      <Box className="flex flex-col gap-6">
        <Typography variant="h1">OpenAI GPT-3 text model usage example</Typography>
        <Typography className="text-zinc-600">
          In this example, a simple chat bot is implemented using Next.js, API Routes, and OpenAI API.
        </Typography>
      </Box>

      <Box className="flex flex-col gap-3">
        <Typography variant="h2">AI Chat Bot:</Typography>
        <Box className="lg:w-2/3">
          <Chat />
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
