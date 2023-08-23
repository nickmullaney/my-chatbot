// src/app/page.tsx
import 'react-chat-widget/lib/styles.css';
import 'tailwindcss/tailwind.css';
import { AppProps, useClient } from 'next/app';
import Chat from '@/components/chat';


function MyApp({ Component, pageProps }: AppProps) {
  useClient(); // Mark the app as a client entry

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      {/* Your layout and components */}
      <Component {...pageProps} />
      <Chat />
    </div>
  );
}

export default MyApp;
