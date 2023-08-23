import React from "react";
import ChatInterface from "./chatInterface";

const ChatAvatarButton: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = React.useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return(
        <div>
            <button onClick={toggleChat}>Chat</button>
            {isChatOpen && <ChatInterface />}
        </div>
    )
}
