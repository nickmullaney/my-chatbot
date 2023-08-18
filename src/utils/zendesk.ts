import axios, {AxiosInstance} from 'axios';

const zendesk: AxiosInstance = axios.create ({
    baseURL: 'https://yoursubdomain.zendesk.com/api/v2',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ZenApiToken',
    },
});

export async function getZendeskArticles(): Promise<ZendeskArticle[]>{
    try{
        const response = await zendesk.get('/help_center/articles.json');
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching articles from Zendesk:', error);
        return [];
      }
}

interface ZendeskArticle{
    id: number;
    title: string;
    body: string;
}