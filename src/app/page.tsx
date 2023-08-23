'use client'
import ChatInterface from '@/components/chatInterface';
import Image from 'next/image';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
   
      <ChatInterface /> {/* Integrate the chat interface component */}
    </main>
  );
}
