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
import { IProjectEditInput } from "@/services/project.service";
import { useProjectEdit } from "./useProjectEdit";
import { descFields, imageFields } from "./fields";
import FeatureField from "@/components/ui/Fields/FeatureField";
import { useFeatureFields } from "./useFeatureFields";

const EditProject: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IProjectEditInput>({
    mode: "onChange",
  });

  const { isLoading, onSubmit } = useProjectEdit(setValue);

  const descText = useFeatureFields(control, "descText");
  const techText = useFeatureFields(control, "techText");
  const resultText = useFeatureFields(control, "resultText");

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
              {...register(field.name as keyof IProjectEditInput, {
                required: "Описание обязательно",
              })}
              hint={field.hint}
              placeholder={field.placeholder}
              error={
                errors[
                  field.name as keyof FieldErrors<IProjectEditInput>
                ] as FieldError
              }
              style={{ width: "410px" }}
              required
            />
          ))}
          <Field
            {...register("date")}
            hint="Дата"
            placeholder="Введи число..."
            type="text"
            error={errors.date}
            style={{ width: "410px" }}
          />
          <Field
            {...register("techs")}
            hint="Технологии"
            placeholder="Введи технологии..."
            type="text"
            error={errors.techs}
            style={{ width: "410px" }}
          />
          <Field
            {...register("typeService")}
            hint="Тип услуги"
            placeholder="Введи услугу..."
            type="text"
            error={errors.typeService}
            style={{ width: "410px" }}
          />

          {/* <Field
            {...register("sort")}
            hint="Сортировка (от 1 до 999)"
            placeholder="Введи число..."
            type="number"
            error={errors.sort}
            style={{ width: "410px" }}
          /> */}

          <FeatureField title="Описание" featureField={descText} styles={s} />
          <FeatureField title="Технологии" featureField={techText} styles={s} />
          <FeatureField
            title="Результат"
            featureField={resultText}
            styles={s}
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

          {/* <Field
            {...register("sort")}
            hint="Сортировка"
            placeholder="Введи число..."
            type="number"
            error={errors.sort}
            style={{ width: "410px" }}
          /> */}

          <div className={s.images}>
            {imageFields.map((field) => (
              <Controller
                key={field.name}
                name={`${field.name as keyof IProjectEditInput}`}
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    hint={field.hint}
                    placeholder="dsa"
                    required={field.required}
                    error={error}
                    folder="cheats"
                    value={value as keyof IProjectEditInput}
                    onChange={onChange}
                    style={{ width: "300px" }}
                  />
                )}
                rules={
                  field.required ? { required: "Картинка обязательна" } : {}
                }
              />
            ))}
          </div>
        </div>
        <button className={s.save}>Сохранить</button>
      </motion.form>
    </motion.div>
  );
};

export default EditProject;
