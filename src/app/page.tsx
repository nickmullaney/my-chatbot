import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Chat from '../components/chat'; // Adjust the path as needed
import AvatarButton from '@/components/avatarButton';

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <Container maxWidth="lg" className="flex flex-col gap-12">
      <AvatarButton onClick={handleOpenChat} />
      <Box className="flex flex-col gap-3">
        <Typography variant="h2">Hi I'm Marge</Typography>
        <Box className="lg:w-2/3">
          {/* Pass the open and onClose props to the Chat component */}
          <Chat open={isChatOpen} onClose={handleCloseChat} />
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
