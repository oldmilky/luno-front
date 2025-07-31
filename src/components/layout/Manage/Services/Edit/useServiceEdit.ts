import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { getAdminUrl } from "@/api/api.config";
import { getKeys } from "@/utils/getKeys";
import { toastError, toastSuccess } from "@/components/ui/Toast/Toast";
import { IServiceEditInput, ServiceService } from "@/services/service.service";

export const useServiceEdit = (
  setValue: UseFormSetValue<IServiceEditInput>
) => {
  const { push, query } = useRouter();

  const serviceId = String(query.id);

  const { isLoading } = useQuery(
    ["service", serviceId],
    () => ServiceService.getById(serviceId),
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
    "update service",
    (data: IServiceEditInput) => ServiceService.updateService(serviceId, data),
    {
      onError: (error) => {
        toastError("Произошла ошибка обновления.");
      },
      onSuccess: () => {
        toastSuccess("Успешное обновление!");
        push(getAdminUrl("services"));
      },
    }
  );

  const onSubmit: SubmitHandler<IServiceEditInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit, isLoading };
};
