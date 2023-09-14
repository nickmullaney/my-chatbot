// Import necessary components and libraries from '@mui/material'
import { Avatar, Button } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import React from "react";

// Define the AvatarButtonProps interface, specifying that it should have an 'onClick' prop
interface AvatarButtonProps {
  onClick: () => void; // 'onClick' prop is a function with no arguments
}

// Define the AvatarButton component with the specified prop interface
const AvatarButton: React.FC<AvatarButtonProps> = ({ onClick }) => {
    // Render a button with a contained style and a primary color
    return (
        <Button variant='contained' color='primary' onClick={onClick} >
          {/* Render an Avatar component with an image source and a ChatIcon */}
          <Avatar src='https://6423873.fs1.hubspotusercontent-na1.net/hub/6423873/hubfs/chatbot-new7.png?width=108&height=108' >
            <ChatIcon />
          </Avatar>
        </Button>
    )
}

// Export the AvatarButton component as the default export of this module
export default AvatarButton;
