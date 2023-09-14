'use client';
// Import React and useState from the 'react' library
import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Chat from '../components/chat'; // Import the Chat component (adjust the path as needed)
import AvatarButton from '@/components/avatarButton'; // Import the AvatarButton component (adjust the path as needed)

// Define the Home component
function Home() {
  // Define a state variable 'isChatOpen' and a function 'setIsChatOpen' to manage the chat's open state
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Define a function 'handleOpenChat' to open the chat
  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  // Define a function 'handleCloseChat' to close the chat
  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // Render the Home component
  return (
    <Container maxWidth="lg" className="flex flex-col gap-12">
      {/* Render the AvatarButton component and attach the 'handleOpenChat' function to its onClick event */}
      <AvatarButton onClick={handleOpenChat} />

      <Box className="flex flex-col gap-3">
        {/* Render a Typography component with a greeting */}
        <Typography variant="h2">Hi Im Marge</Typography>

        <Box className="lg:w-2/3">
          {/* Render the Chat component and pass the 'open' and 'onClose' props */}
          <Chat open={isChatOpen} onClose={handleCloseChat} />
        </Box>
      </Box>
    </Container>
  );
}

// Export the Home component as the default export of this module
export default Home;
