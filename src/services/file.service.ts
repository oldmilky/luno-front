import axios from "@/api/interceptors";

export const FilesService = {
  async upload(file: FormData, folder?: string) {
    return axios.post<{ url: string; name: string }[]>(`/files`, file, {
      params: { folder },
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async delete(folder: string, filename: string) {
    return axios.delete(`/files/${folder}/${filename}`);
  },
};
