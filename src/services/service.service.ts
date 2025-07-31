import { getServicesUrl } from "@/api/api.config";
import { axiosClassic } from "@/api/interceptors";
import axios from "@/api/interceptors";
import { IService } from "@/interfaces/service.interface";

export interface IServiceEditInput extends Omit<IService, "id"> {}

export const ServiceService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IService[]>(getServicesUrl(``), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getById(_id: string) {
    return axios.get<IServiceEditInput>(getServicesUrl(`/${_id}`));
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IService>(getServicesUrl(`/by-slug/${slug}`));
  },

  async createService() {
    return axios.post<string>(getServicesUrl(`/`));
  },

  async updateService(_id: string, data: IServiceEditInput) {
    return axios.put<string>(getServicesUrl(`/${_id}`), data);
  },

  async deleteService(_id: string) {
    return axios.delete<string>(getServicesUrl(`/${_id}`));
  },

  async updateCountOpened(slug: string) {
    return axiosClassic.put<string>(getServicesUrl("/update-count-opened"), {
      slug,
    });
  },
};
