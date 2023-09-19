// Import necessary types and modules
import { type ChatGPTMessage } from '../../src/components/chatLine'
import { OpenAIStream, OpenAIStreamPayload } from '../../src/utils/openAIStream'

// Check if the OPENAI_API_KEY environment variable is missing and throw an error if it is
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

// Define configuration settings
export const config = {
  runtime: 'edge',
}

// Define the request handler function
const handler = async (req: Request): Promise<Response> => {
  // Parse the JSON body of the incoming request
  const body = await req.json()

  // Initialize an array to store chat messages, starting with a system message
  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `The users work in the Restaurant industry and are usually in operations asking questions about 
      how to use the product. They are not technical and are not familiar with the product which is MarginEdge and most of
      the help articles are available on Google. Be sure to us a kind and helpful tone.`,
    },
  ]

  // Add any messages from the request body to the chat messages array
  messages.push(...body?.messages)

  // Define request headers for the OpenAI API
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }

  // Include the OpenAI-Organization header if OPENAI_API_ORG is defined
  if (process.env.OPENAI_API_ORG) {
    requestHeaders['OpenAI-Organization'] = process.env.OPENAI_API_ORG
  }

  // Create the payload to send to the OpenAI API
  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  }

  // Call the OpenAIStream function to initiate a stream with the OpenAI API
  const stream = await OpenAIStream(payload)

  // Return a new Response object with the stream
  return new Response(stream)
}

// Export the request handler function as the default export of this module
export default handler
