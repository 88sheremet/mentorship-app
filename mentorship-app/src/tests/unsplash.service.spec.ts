import searchUnsplashService from "@/services/unspalsh.searchImages.service";
import httpService from "@/api/http.service";

jest.mock("@/api/http.service");

describe("searchUnsplashService", () => {
  it("should map API response correctly", async () => {
    // мок под твой httpService: сразу results
    const mockData = {
      results: [
        { id: "1", urls: { small: "img.jpg" } },
      ],
    };

    (httpService.get as jest.Mock).mockResolvedValue(mockData);

    const result = await searchUnsplashService.searchImages("office");

    expect(result).toEqual([
      { id: "1", src: "img.jpg" },
    ]);
  });
});