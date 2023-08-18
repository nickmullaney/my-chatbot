// src/components/ChatInterface.tsx
import React, { useState } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { getZendeskArticles, ZendeskArticle } from '../utils/zendesk';

const ChatInterface: React.FC = () => {
  const [zendeskArticles, setZendeskArticles] = useState<ZendeskArticle[]>([]);

  const handleNewUserMessage = async (newMessageText: string) => {
    addUserMessage(newMessageText);

    try {
      // Fetch articles from Zendesk
      const articles = await getZendeskArticles();
      setZendeskArticles(articles);

      // Generate AI response using OpenAI (as shown in previous responses)
      // ...

      // Display zendeskArticles and OpenAI response in the chat interface
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
