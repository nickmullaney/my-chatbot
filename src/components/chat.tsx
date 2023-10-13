import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, Input } from '@mui/material'; // Import MUI components
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from './chatLine';
import { useCookies } from 'react-cookie';
import { Avatar } from "@mui/material"; // Import Avatar component

interface ChatProps {
  open: boolean;
  onClose: () => void;
}

// Define the name for the chat cookie
const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3';

// Default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
  {
    role: 'assistant',
    content: "Hi! I'm Marge. Ask me anything!",
  },
];

// Define the InputMessage component
const InputMessage = ({ input, setInput, sendMessage, streaming }: any) => (
  <div className="mt-6 flex clear-both">
    <Input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={input}
      disabled={streaming} // Disable the input if streaming is true
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          sendMessage(input);
          setInput('');
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input);
        setInput('');
        console.log('Streaming Status input',streaming);
      }}
      disabled={streaming} // Disable the button if streaming is true
    >
      Send
    </Button>
  </div>
);

// Define the Chat component with its props
export default function Chat({ open, onClose }: ChatProps) {
  // Define state variables for managing messages, input, and loading state
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]); // Use the useCookies hook to manage cookies
  const [streaming, setStreaming] = useState(false); // State for streaming


  // Use useEffect to generate a unique user ID and set it as a cookie if it doesn't exist
  useEffect(() => {
    console.log('Streaming Status use effect',streaming);
    if (!cookie[COOKIE_NAME]) {
      // Generate a semi-random short ID
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  // Define the sendMessage function to send user messages to the API
  const sendMessage = async (message: string) => {
    setStreaming(true);
    setLoading(true);
    const newMessages = [
      ...messages,
      { role: 'user', content: message } as ChatGPTMessage,
    ];
    setMessages(newMessages);
    const last30messages = newMessages.slice(-30); // Remember the last 30 messages

    try {
      // Check if the user's message triggers a request for a ZD article
      // if (message.toLocaleLowerCase().includes('help'))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: last30messages,
          user: cookie[COOKIE_NAME],
        }),
      });

      console.log('Edge function returned.');

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      let lastMessage = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        lastMessage = lastMessage + chunkValue;

        setMessages([
          ...newMessages,
          { role: 'assistant', content: lastMessage } as ChatGPTMessage,
        ]);

        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    } finally {
      setStreaming(false);
      console.log('Streaming Status finally',streaming);
    }
  };

  // Render the chat dialog and its content
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <div className="rounded-2xl border-zinc-100 lg:border lg:p-6 chat-container">
          {messages.map(({ content, role }, index) => (
            <ChatLine key={index} role={role} content={content} />
          ))}
          {loading && <LoadingChatLine />}
          {messages.length < 2 && (
            <span className="mx-auto flex flex-grow text-gray-600 clear-both">
              Type a message to start the conversation
            </span>
          )}
          <InputMessage
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            streaming={streaming} // Pass the streaming state to the InputMessage component
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
