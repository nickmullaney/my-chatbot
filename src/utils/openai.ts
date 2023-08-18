import axios, {AxiosInstance} from 'axios';

const openai: AxiosInstance = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer OpenaiToken'
    },
});

export default openai;