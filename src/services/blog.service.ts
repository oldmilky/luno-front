import { getBlogsUrl } from "@/api/api.config";
import { axiosClassic } from "@/api/interceptors";
import axios from "@/api/interceptors";
import { IBlog } from "@/interfaces/blog.interface";

export interface IBlogsEditInput extends Omit<IBlog, "id"> {}

export const BlogService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IBlog[]>(getBlogsUrl(``), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getById(_id: string) {
    return axios.get<IBlogsEditInput>(getBlogsUrl(`/${_id}`));
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IBlog>(getBlogsUrl(`/by-slug/${slug}`));
  },

  async createBlog() {
    return axios.post<string>(getBlogsUrl(`/`));
  },

  async updateBlog(_id: string, data: IBlogsEditInput) {
    return axios.put<string>(getBlogsUrl(`/${_id}`), data);
  },

  async deleteBlog(_id: string) {
    return axios.delete<string>(getBlogsUrl(`/${_id}`));
  },
};
