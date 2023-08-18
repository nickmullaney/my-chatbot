// src/components/ChatInterface.tsx
import React, { useState } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { getZendeskArticles, ZendeskArticle } from '../utils/zendesk';
import openai from '../utils/openai'; // Import your OpenAI utility

const ChatInterface: React.FC = () => {
  const [zendeskArticles, setZendeskArticles] = useState<ZendeskArticle[]>([]);

  const handleNewUserMessage = async (newMessageText: string) => {
    addUserMessage(newMessageText);

    try {
      // Fetch articles from Zendesk
      const articles = await getZendeskArticles();
      setZendeskArticles(articles);

      // Generate AI response using OpenAI
      const response = await openai.post('/davinci-codex/completions', {
        prompt: newMessageText,
        max_tokens: 50,
      });
      const botReply = response.data.choices[0].text;

      // Display the AI response in the chat interface
      addResponseMessage(botReply);

      // You can also display zendeskArticles here...
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
