// src/utils/zendesk.ts
import axios, { AxiosInstance } from 'axios';

// Replace these with your actual values
//I think this is the correct URL
const zendeskBaseUrl = 'https://help.marginedge.com/hc/en-us/sections';
const zendeskApiToken = 'ZENDESK_API_TOKEN';

const zendesk: AxiosInstance = axios.create({
  baseURL: `${zendeskBaseUrl}/api/v2`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${zendeskApiToken}`,
  },
});

export async function getZendeskArticles(): Promise<ZendeskArticle[]> {
  try {
    const response = await zendesk.get('/help_center/articles.json');
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles from Zendesk:', error);
    return [];
  }
}

// Define a generic type to represent a Zendesk article
export interface ZendeskArticle {
  id: number;
  title: string;
  body: string;
}
