import {
  createParser,           // Importing functions for parsing SSE data
  ParsedEvent,            // Importing types for parsed events
  ReconnectInterval,      // Importing a type for reconnect interval
} from 'eventsource-parser'

export type ChatGPTAgent = 'user' | 'system' | 'assistant'   // Defining a type for chat agent roles

export interface ChatGPTMessage {
  role: ChatGPTAgent   // Defining an interface for chat messages with 'role' and 'content'
  content: string
}

export interface OpenAIStreamPayload {
  model: string                   // The AI model to use
  messages: ChatGPTMessage[]      // Array of chat messages
  temperature: number             // Control the randomness of responses
  top_p: number                   // Control the diversity of responses
  frequency_penalty: number       // Control the response frequency
  presence_penalty: number        // Control the response presence
  max_tokens: number              // Limit the length of responses
  stream: boolean                 // Whether to use streaming API
  stop?: string[]                 // Array of stop words
  user?: string                   // User identifier
  n: number                       // Number of completions
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder()   // Create a text encoder to convert text to bytes
  const decoder = new TextDecoder()   // Create a text decoder to convert bytes to text

  let counter = 0    // Initialize a counter for tracking message chunks

  const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',                    // Set request headers
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
  }

  if (process.env.OPENAI_API_ORG) {
      requestHeaders['OpenAI-Organization'] = process.env.OPENAI_API_ORG
  }

  try {
    // Send a POST request to the OpenAI API
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: requestHeaders,
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API request failed with status: ${res.status}`);
    }

  const stream = new ReadableStream({
      async start(controller) {
          // Callback function to handle parsed events
          function onParse(event: ParsedEvent | ReconnectInterval) {
              if (event.type === 'event') {
                  const data = event.data
                  // Check if the event data indicates the end of the stream
                  if (data === '[DONE]') {
                      console.log('DONE')
                      controller.close()  // Close the stream
                      return
                  }
                  try {
                      const json = JSON.parse(data)  // Parse JSON data from the event
                      const text = json.choices[0].delta?.content || ''
                      if (counter < 2 && (text.match(/\n/) || []).length) {
                          // Skip processing of prefix characters (e.g., "\n\n")
                          return
                      }
                      const queue = encoder.encode(text)  // Encode text as bytes
                      controller.enqueue(queue)          // Enqueue the bytes for streaming
                      counter++
                  } catch (e) {
                      // Handle any parsing errors
                      controller.error(e)
                  }
              }
          }

          // Initialize a parser for handling SSE data
          const parser = createParser(onParse)

          // Iterate through chunks of data from the response body
          for await (const chunk of res.body as any) {
              parser.feed(decoder.decode(chunk))  // Feed each chunk to the parser
          }
      },
  })

  return stream  // Return the readable stream
} catch (error) {
    // Handle errors
    console.error('Error in OpenAIStream:', error);
    }
}