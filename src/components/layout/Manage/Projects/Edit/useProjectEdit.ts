import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { getAdminUrl } from "@/api/api.config";
import { getKeys } from "@/utils/getKeys";
import { toastError, toastSuccess } from "@/components/ui/Toast/Toast";
import { IProjectEditInput, ProjectService } from "@/services/project.service";

export const useProjectEdit = (setValue: UseFormSetValue<IProjectEditInput>) => {
  const { push, query } = useRouter();

  const projectId = String(query.id);

  const { isLoading } = useQuery(
    ["project", projectId],
    () => ProjectService.getById(projectId),
    {
      onSuccess: ({ data }) => {
        getKeys(data).forEach((key) => {
          setValue(key, data[key]);
        });
      },
      onError: (error) => {
        toastError("Произошла ошибка получения.");
      },
      enabled: !!query.id,
    }
  );

  const { mutateAsync } = useMutation(
    "update cheat",
    (data: IProjectEditInput) => ProjectService.updateProject(projectId, data),
    {
      onError: (error) => {
        toastError("Произошла ошибка обновления.");
      },
      onSuccess: () => {
        toastSuccess("Успешное обновление чита!");
        push(getAdminUrl("projects"));
      },
    }
  );

  const onSubmit: SubmitHandler<IProjectEditInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit, isLoading };
};
