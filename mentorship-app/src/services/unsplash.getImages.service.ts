import httpService from '@/api/http.service';

const unsplashService = {
  async getRandomImages(count = 20) {
    const data = await httpService.get(`/photos/random?count=${count}`);

    return data.map((img: any) => ({
      id: img.id,
      src: img.urls.thumb || '',
      likes: 0,
      dislikes: 0,
      comments: [],
    }));
  },
};
export default unsplashService;
