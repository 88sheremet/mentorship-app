const BASE_URL = 'https://api.unsplash.com';
const ACCESS_KEY = process.env.VUE_APP_UNSPLASH_KEY;

const httpService = {
  async get(url: string) {
    const response = await fetch(`${BASE_URL}${url}&client_id=${ACCESS_KEY}`);
    return response.json();
  },
};
export default httpService;
