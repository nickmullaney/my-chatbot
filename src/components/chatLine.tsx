import clsx from "clsx";
import { Avatar } from "@mui/material";

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <div className="font-large text-xxl text-gray-900">
          <Avatar src="https://6423873.fs1.hubspotusercontent-na1.net/hub/6423873/hubfs/chatbot-new7.png?width=108&height=108" />
        </div>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ role = "assistant", content }: ChatGPTMessage) {
  if (!content) {
    return null;
  }
  const formattMessage = convertNewLines(content);

  return (
    <div
      className={
        role != "assistant" ? "float-right clear-both chat-bubble" : "float-left clear-both chat-bubble"
      }
    >
      <div>
        <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
                <p className="font-large text-xxl text-gray-900 min-w-100%">
                  <a href="#" className="hover:underline">
                    {role == "assistant" ? "Marge" : "You"}
                  </a>
                </p>
                <p
                  className={clsx(
                    "text ",
                    role == "assistant"
                      ? "font-semibold font- "
                      : "text-gray-400"
                  )}
                >
                  {formattMessage}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
