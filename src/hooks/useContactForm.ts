import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toastError, toastSuccess } from "@/components/ui/Toast/Toast";
import useTranslation from "next-translate/useTranslation";

export interface IContactFormData {
  name: string;
  contact: string;
  budget: string;
  serviceType: string;
  message?: string;
}

export const useContactForm = () => {
  const { t } = useTranslation("common");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    emailjs.init("9Z4wdmt1nOMGQbGiU");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<IContactFormData>({
    mode: "onChange",
    defaultValues: {
      budget: "1.500 +",
      serviceType: "Website Development",
    },
  });

  const watchedValues = watch();

  const onSubmit: SubmitHandler<IContactFormData> = async (data) => {
    setIsLoading(true);

    try {
      const serviceID = "service_gshv2fd";
      const templateID = "template_gy97c9y";
      const templateParams = {
        to_email: "studio@lunoweb.com",
        from_name: data.name,
        from_contact: data.contact,
        budget: data.budget,
        service_type: data.serviceType,
        message: data.message || "Сообщение не указано",
        reply_to: data.contact.includes("@")
          ? data.contact
          : "noreply@lunoweb.com",
      };
      await emailjs.send(serviceID, templateID, templateParams);
      toastSuccess(t("toast.success"));
      reset();
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      let errorMessage = t("toast.error");

      if (error?.text) {
        if (error.text.includes("Invalid template")) {
          errorMessage =
            "Ошибка конфигурации. Проверьте настройки EmailJS шаблона.";
        } else if (error.text.includes("Invalid service")) {
          errorMessage = "Ошибка сервиса. Проверьте настройки EmailJS сервиса.";
        } else if (error.text.includes("Invalid public key")) {
          errorMessage =
            "Ошибка авторизации. Проверьте публичный ключ EmailJS.";
        }
      }

      toastError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const setBudget = (budget: string) => {
    setValue("budget", budget);
  };

  const setServiceType = (serviceType: string) => {
    setValue("serviceType", serviceType);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    setBudget,
    setServiceType,
    watchedValues,
  };
};
