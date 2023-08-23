// src/components/ChatInterface.tsx
import React from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import openai from '@/utils/openai'; // Import your OpenAI utility

const ChatInterface: React.FC = () => {
  const handleNewUserMessage = async (newMessageText: string) => {
    addUserMessage(newMessageText);

    try {
      // Generate AI response using OpenAI
      const response = await openai.post('/davinci-codex/completions', {
        prompt: newMessageText,
        max_tokens: 50,
      });
      const botReply = response.data.choices[0].text;

      // Display the AI response in the chat interface
      addResponseMessage(botReply);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Chatbot"
      subtitle="AI Assistant"
    />
  );
};

export default ChatInterface;
