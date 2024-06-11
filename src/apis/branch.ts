import API, { DataResponse } from "./api";

export interface Branch {
  branch_id: number;
  branch_name: string;
  branch_address: string;
  branch_phone: string;
  branch_email: string;
  branch_facebook_link: string;
  branch_ig_link: string;
  branch_x_link: string;
  branch_reserve_link: string;
  branch_opening_hours: string;
}

export default class BranchAPI extends API {
  public async branchList(): Promise<DataResponse> {
    return this.get("branches", true);
  }

  public async addBranch(newBranch: Branch): Promise<DataResponse> {
    return this.post("branches/add_branch", newBranch, true);
  }

  public async updateBranch(editedBranch: Branch): Promise<DataResponse> {
    return this.post("branches/update_branch", editedBranch, true);
  }

  public async deleteBranch(branch_id: number): Promise<DataResponse> {
    return this.post("branches/delete_branch", { branch_id: branch_id }, true);
  }
}
