import { Avatar, Button } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import React from "react";

interface AvatarButtonProps {
  onClick: () => void;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({ onClick }) => {
    return (
        <Button variant='contained' color='primary' onClick={onClick}>
          <Avatar src='https://6423873.fs1.hubspotusercontent-na1.net/hub/6423873/hubfs/chatbot-new7.png?width=108&height=108' >
            <ChatIcon />
          </Avatar>
        </Button>
    )
}

export default AvatarButton;
