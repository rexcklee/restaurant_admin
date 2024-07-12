import API, { DataResponse } from "./api";

export interface HomeSection {
  key: string;
  homeSection_id: number;
  homeSection_title: string;
  homeSection_content: string;
  image_id: string;
  create_date: Date | null;
  isshow: boolean;
  sort: number;
}

export interface HomeSectionImageData {
  homeSection_id: number;
  image_id: string;
}

export default class HomeSectionsAPI extends API {
  public async homeSectionsList(): Promise<DataResponse> {
    return this.get("homeSections", true);
  }

  public async createHomeSection(
    newHomeSection: HomeSection
  ): Promise<DataResponse> {
    return this.post("homeSections/add_homeSection", newHomeSection, true);
  }

  public async updateHomeSection(
    editedHomeSection: HomeSection
  ): Promise<DataResponse> {
    return this.post(
      "homeSections/update_homeSection",
      editedHomeSection,
      true
    );
  }

  public async updateHomeSectionImage(
    imageData: HomeSectionImageData
  ): Promise<DataResponse> {
    return this.post("homeSections/update_homeSection_image", imageData, true);
  }

  public async deleteHomeSection(
    homeSection_id: number
  ): Promise<DataResponse> {
    return this.post(
      "homeSections/delete_homeSections",
      { homeSection_id: homeSection_id },
      true
    );
  }
}
