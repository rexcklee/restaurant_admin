import API, { DataResponse } from "./api";

export interface News {
  key: string;
  news_id: number;
  news_title: string;
  news_content: string;
  image_id: string;
  create_date: Date | null;
  isshow: boolean;
  sort: number;
}

export interface NewsImageData {
  news_id: number;
  image_id: string;
}

export default class NewsAPI extends API {
  public async newsList(): Promise<DataResponse> {
    return this.get("news", true);
  }

  public async createNews(newNews: News): Promise<DataResponse> {
    return this.post("news/add_news", newNews, true);
  }

  public async updateNews(editedNews: News): Promise<DataResponse> {
    return this.post("news/update_news", editedNews, true);
  }

  public async updateNewsImage(
    imageData: NewsImageData
  ): Promise<DataResponse> {
    return this.post("news/update_news_image", imageData, true);
  }

  public async deleteNews(news_id: number): Promise<DataResponse> {
    return this.post("news/delete_news", { news_id: news_id }, true);
  }
}
