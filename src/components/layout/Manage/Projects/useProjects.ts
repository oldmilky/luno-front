import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAdminUrl } from "@/api/api.config";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/router";
import { ProjectService } from "@/services/project.service";
import { toastError, toastSuccess } from "@/components/ui/Toast/Toast";

export const useProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { push } = useRouter();

  const queryData = useQuery(
    ["projects list", debouncedSearch],
    () => ProjectService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map((project): any => ({
          _id: project._id,
          editUrl: getAdminUrl(`projects/edit/${project._id}`),
          name: project.name,
          date: project.date,
          slug: project.slug,
          typeService: project.typeService,
          develop: project.develop,
          design: project.design,
          sort: project.sort,
          image: project.image,
        })),
      onError: (error) => {
        toastError("Произошла ошибка получения.");
      },
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: createAsync } = useMutation(
    ["create project"],
    () => ProjectService.createProject(),
    {
      onError: (error) => {
        toastError("Произошла ошибка создания.");
      },
      onSuccess: ({ data: _id }) => {
        toastSuccess("Успешное создание проекта!");
        push(getAdminUrl(`projects/edit/${_id}`));
      },
    }
  );

  const { mutateAsync: deleteAsync } = useMutation(
    ["delete project"],
    (projectId: string) => ProjectService.deleteProject(projectId),
    {
      onError: (error) => {
        toastError("Произошла ошибка удаления.");
      },
      onSuccess: () => {
        toastSuccess("Удаление проекта успешно!");
        queryData.refetch();
      },
    }
  );

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      createAsync,
      deleteAsync,
    }),
    [deleteAsync, queryData, searchTerm, createAsync]
  );
};
