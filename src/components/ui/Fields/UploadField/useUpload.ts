import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { FilesService } from "@/services/file.service";
import toast from "react-hot-toast";

type TypeUpload = (
  onChange: (...event: any[]) => void,
  folder?: string
) => {
  uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  deleteFile: (folder: string, filename: string) => void;
  isLoading: boolean;
};

export const useUpload: TypeUpload = (onChange, folder) => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation(
    "upload file",
    (data: FormData) => FilesService.upload(data, folder),
    {
      onSuccess: ({ data }) => {
        onChange(data[0].url);
        toast.success("Медиа добавлена!", {
          style: {
            background: "rgba(13, 15, 16, 0.90)",
            padding: "20px 25px 20px 25px",
            borderTop: "2px solid #1E2328",
            borderLeft: "2px solid #1E2328",
            borderRight: "2px solid #1E2328",
            borderRadius: "16px",
            color: "#72E292",
            fontWeight: "600",
          },
        });
      },
      onError: (error) => {
        console.log(error, "Upload file");
        toast.error("Произошла ошибка добавления медии.", {
          style: {
            background: "rgba(13, 15, 16, 0.90)",
            padding: "20px 25px 20px 25px",
            borderTop: "2px solid #1E2328",
            borderLeft: "2px solid #1E2328",
            borderRight: "2px solid #1E2328",
            borderRadius: "16px",
            color: "#ff4b4b",
            fontWeight: "600",
          },
        });
      },
    }
  );

  const deleteMutation = useMutation(
    "delete file",
    ({ folder, filename }: any) => FilesService.delete(folder, filename),
    {
      onSuccess: () => {
        onChange("");
        toast.success("Медиа успешно удалена!", {
          style: {
            background: "rgba(13, 15, 16, 0.90)",
            padding: "20px 25px 20px 25px",
            borderTop: "2px solid #1E2328",
            borderLeft: "2px solid #1E2328",
            borderRight: "2px solid #1E2328",
            borderRadius: "16px",
            color: "#72E292",
            fontWeight: "600",
          },
        });
      },
      onError: (error) => {
        toast.error("Произошла ошибка с удалением медиа.", {
          style: {
            background: "rgba(13, 15, 16, 0.90)",
            padding: "20px 25px 20px 25px",
            borderTop: "2px solid #1E2328",
            borderLeft: "2px solid #1E2328",
            borderRight: "2px solid #1E2328",
            borderRadius: "16px",
            color: "#ff4b4b",
            fontWeight: "600",
          },
        });
      },
    }
  );

  const uploadFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);

      const files = e.target.files;
      if (!files?.length) return;

      const formData = new FormData();
      formData.append("file", files[0]);

      await mutateAsync(formData);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    },
    [mutateAsync]
  );

  const deleteFile = useCallback(
    (folder: any, filename: any) => {
      deleteMutation.mutate({ folder, filename });
    },
    [deleteMutation]
  );

  return useMemo(
    () => ({
      uploadFile,
      deleteFile,
      isLoading,
    }),
    [uploadFile, deleteFile, isLoading]
  );
};
