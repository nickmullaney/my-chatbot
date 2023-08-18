import axios, {AxiosInstance} from 'axios';

const zendesk: AxiosInstance = axios.create ({
    baseURL: 'https://yoursubdomain.zendesk.com/api/v2',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ZenApiToken',
    },
});

export default zendesk;