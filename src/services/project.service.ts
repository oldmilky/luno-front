import { getProjectsUrl } from "@/api/api.config";
import { axiosClassic } from "@/api/interceptors";
import axios from "@/api/interceptors";
import { IProject } from "@/interfaces/project.interface";

export interface IProjectEditInput extends Omit<IProject, "id"> {}

export const ProjectService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IProject[]>(getProjectsUrl(``), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getById(_id: string) {
    return axios.get<IProjectEditInput>(getProjectsUrl(`/${_id}`));
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IProject>(getProjectsUrl(`/by-slug/${slug}`));
  },

  async createProject() {
    return axios.post<string>(getProjectsUrl(`/`));
  },

  async updateProject(_id: string, data: IProjectEditInput) {
    return axios.put<string>(getProjectsUrl(`/${_id}`), data);
  },

  async deleteProject(_id: string) {
    return axios.delete<string>(getProjectsUrl(`/${_id}`));
  },

  async updateCountOpened(slug: string) {
    return axiosClassic.put<string>(getProjectsUrl("/update-count-opened"), {
      slug,
    });
  },
};
