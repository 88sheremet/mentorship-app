import httpService from '@/api/http.service';

const searchUnsplashService = {
  async searchImages(query: string) {
    const data = await httpService.get(`/search/photos?query=${query}`);
    return data.results.map((img: any) => ({
      id: img.id,
      src: img.urls.small || '',
    }));
  },
};
export default searchUnsplashService;
