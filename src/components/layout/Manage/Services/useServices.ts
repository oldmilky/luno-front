import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAdminUrl } from "@/api/api.config";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/router";
import { toastError, toastSuccess } from "@/components/ui/Toast/Toast";
import { ServiceService } from "@/services/service.service";

export const useServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { push } = useRouter();

  const queryData = useQuery(
    ["services list", debouncedSearch],
    () => ServiceService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map((service): any => ({
          _id: service._id,
          editUrl: getAdminUrl(`services/edit/${service._id}`),
          name: service.name,
          relized: service.relized,
          price: service.price,
          done: service.done,
          sort: service.sort,
          priceEn: service.priceEn,
          number: service.number,
          marker: service.marker,
          nameEn: service.nameEn,
          slug: service.slug,
          subtitlePen: service.subtitlePen,
          texts: service.texts,
          priceText: service.priceText,
          deadlineText: service.deadlineText,
          defaultText: service.defaultText,
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
    ["create service"],
    () => ServiceService.createService(),
    {
      onError: (error) => {
        toastError("Произошла ошибка создания.");
      },
      onSuccess: ({ data: _id }) => {
        toastSuccess("Успешное создание сервиса!");
        push(getAdminUrl(`services/edit/${_id}`));
      },
    }
  );

  const { mutateAsync: deleteAsync } = useMutation(
    ["delete Service"],
    (serviceId: string) => ServiceService.deleteService(serviceId),
    {
      onError: (error) => {
        toastError("Произошла ошибка удаления.");
      },
      onSuccess: () => {
        toastSuccess("Удаление сервиса успешно!");
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
