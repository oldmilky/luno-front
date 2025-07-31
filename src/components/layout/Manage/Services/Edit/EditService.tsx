import s from "../../ManageEdit.module.scss";
import { FC } from "react";
import ManageButtons from "../../Header/ManageButtons";
import {
  Controller,
  FieldError,
  FieldErrors,
  useFieldArray,
  useForm,
} from "react-hook-form";
import Field from "@/components/ui/Fields/Field/Field";
import SlugField from "@/components/ui/Fields/SlugField";
import { generateSlug } from "@/utils/generateSlug";
import ChoiceField from "@/components/ui/Fields/ChoiceField";
import UploadField from "@/components/ui/Fields/UploadField/UploadField";
import { motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";
import { useServiceEdit } from "./useServiceEdit";
import { descFields } from "./fields";
import FeatureField from "@/components/ui/Fields/FeatureField";
import { IServiceEditInput } from "@/services/service.service";
import { useFeatureFields } from "../../Projects/Edit/useFeatureFields";

const EditService: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IServiceEditInput>({
    mode: "onChange",
  });

  const { isLoading, onSubmit } = useServiceEdit(setValue);

  const texts = useFeatureFields(control, "texts");
  const priceText = useFeatureFields(control, "priceText");
  const deadlineText = useFeatureFields(control, "deadlineText");
  const defaultText = useFeatureFields(control, "defaultText");

  return (
    <motion.div
      className={s.edit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <ManageButtons />
      <motion.p className={s.title} custom={1.5} variants={bottomToTop}>
        РЕДАКТИРОВАНИЕ
        <span className={s.span}>{getValues("name") || "Name"}</span>
      </motion.p>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className={s.content}
        custom={2}
        variants={bottomToTop}
      >
        <div className={s.items}>
          <Field
            {...register("name", {
              required: "Имя",
            })}
            hint="Название"
            placeholder="Введите название"
            error={errors.name}
            style={{ width: "410px" }}
            required
          />
          <Field
            {...register("nameEn", {
              required: "Имя на английском",
            })}
            hint="Название на английском"
            placeholder="Введите название"
            error={errors.nameEn}
            style={{ width: "410px" }}
            required
          />
          <SlugField
            register={register}
            error={errors.slug}
            generate={() => {
              setValue("slug", generateSlug(getValues("name")));
            }}
          />
          {descFields.map((field) => (
            <Field
              key={field.name}
              {...register(field.name as keyof IServiceEditInput, {
                required: "Описание обязательно",
              })}
              hint={field.hint}
              placeholder={field.placeholder}
              error={
                errors[
                  field.name as keyof FieldErrors<IServiceEditInput>
                ] as FieldError
              }
              style={{ width: "410px" }}
              required
            />
          ))}
          <Field
            {...register("subtitlePen", {
              required: "Описание обязательна",
            })}
            hint="Описание ручкой"
            placeholder="Введи текст..."
            error={errors.subtitlePen}
            style={{ width: "410px" }}
            required
          />
          <Field
            {...register("subtitlePenEn", {
              required: "Описание ручкой на английском",
            })}
            hint="Описание ручкой на английском"
            placeholder="Введи текст..."
            error={errors.subtitlePenEn}
            style={{ width: "410px" }}
            required
          />
          <Field
            {...register("relized", {
              required: "Поле обязательно",
            })}
            hint="Мы реализовали..."
            placeholder="Введи..."
            error={errors.relized}
            style={{ width: "410px" }}
            required
          />
          <Field
            {...register("relizedEn", {
              required: "Поле обязательно",
            })}
            hint="Мы реализовали на английском..."
            placeholder="Введи..."
            error={errors.relizedEn}
            style={{ width: "410px" }}
            required
          />

          <Field
            {...register("sort", {
              valueAsNumber: true,
            })}
            hint="Сортировка (от 1 до 999)"
            placeholder="Введи число..."
            type="number"
            error={errors.sort}
            style={{ width: "410px" }}
          />

          <FeatureField
            title="При заказе вы получаете"
            featureField={texts}
            styles={s}
          />
          <FeatureField
            title="Ориентировочная цена"
            featureField={priceText}
            styles={s}
          />
          <FeatureField
            title="Приблизительные сроки"
            featureField={deadlineText}
            styles={s}
          />
          <FeatureField
            title="По умолчанию вы получаете"
            featureField={defaultText}
            styles={s}
          />

          <Field
            {...register("done")}
            hint="Реализовано проектов"
            placeholder="Реализовано проектов"
            error={errors.done}
            style={{ width: "410px" }}
            type="text"
          />
          <Field
            {...register("marker")}
            hint="Маркер"
            placeholder="Введи маркер"
            error={errors.marker}
            style={{ width: "410px" }}
            type="text"
          />
          <Field
            {...register("number", {
              valueAsNumber: true,
            })}
            hint="Номер"
            placeholder="Введи номер"
            error={errors.number}
            style={{ width: "410px" }}
            type="number"
          />

          <Field
            {...register("price", {
              valueAsNumber: true,
            })}
            hint="Цена"
            placeholder="Введи цену"
            error={errors.price}
            style={{ width: "410px" }}
            type="number"
          />
          <Field
            {...register("priceEn", {
              valueAsNumber: true,
            })}
            hint="Цена на английском"
            placeholder="Введи цену"
            error={errors.priceEn}
            style={{ width: "410px" }}
            type="number"
          />

          <Controller
            name="develop"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ChoiceField
                {...register("develop")}
                hint="Статус разработки"
                placeholder="Выбери..."
                selected={value}
                handleChoice={(val: boolean) => onChange(val)}
                error={errors.develop}
                style={{ width: "250px" }}
              />
            )}
          />
          <Controller
            name="design"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ChoiceField
                {...register("design")}
                hint="Статус дизайна"
                placeholder="Выбери..."
                selected={value}
                handleChoice={(val: boolean) => onChange(val)}
                error={errors.design}
                style={{ width: "250px" }}
              />
            )}
          />
        </div>
        <button className={s.save}>Сохранить</button>
      </motion.form>
    </motion.div>
  );
};

export default EditService;
