import { FC, useState } from "react";
import s from "../Auth.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";
import { useRouter } from "next/router";
import Field from "@/components/ui/Fields/Field/Field";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuth } from "@/hooks/useAuth";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { IAuthFields, IAuthInput } from "../Auth.interface";
import { useActions } from "@/hooks/useActions";
import { validEmail } from "@/utils/validation";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useMediaQuery } from "react-responsive";
import Symbol from "@/components/animate/Symbol/Symbol";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import logo from "@/assets/images/logo.svg";

const Register: FC<IAuthFields> = ({ isPasswordRequired }) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  useAuthRedirect();
  const { isLoading } = useAuth();
  const [type, setType] = useState<"login" | "register">("register");

  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });

  const { register } = useActions();
  const onSubmit: SubmitHandler<IAuthInput> = async (data) => {
    if (type === "login") {
      await register(data);
    }
    reset();
  };

  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });

  const { t } = useTranslation("common");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Link href="/" className={s.header}>
        <Image src={logo} alt="logo" />
      </Link>
      <motion.form
        custom={1.5}
        variants={bottomToTop}
        className={s.content}
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: "25px 35px 25px 35px",
        }}
      >
        <div className={s.titlesContent}>
          {isMobile ? (
            <div className={s.titles}>
              <p className={s.title}>{t("contacts.title")}</p>
              <p className={s.title}>{t("contacts.title2")}</p>
            </div>
          ) : (
            <div className={s.titles}>
              <Symbol text={t("contacts.title")} className={s.title} />
              <Symbol text={t("contacts.title2")} className={s.title} />
            </div>
          )}
          <SplitTextScreen text="Don't wait!" className={s.subtitle} />
          <SplitTextScreen text="Step forward!" className={s.subtitle2} />
        </div>
        <div className={s.container}>
          <Field
            {...registerInput("email", {
              required: "Email is required",
              pattern: {
                value: validEmail,
                message: "Please enter a valid email address",
              },
            })}
            hint="ПОЧТА"
            error={errors.email as FieldError}
            placeholder="your-email@gmail.com"
            className={s.field}
            style={{
              minWidth: "100%",
              width: "100%",
            }}
          />
          <Field
            {...registerInput("nickname", {
              required: "Nickname is required",
              minLength: {
                value: 4,
                message: "Nickname must include a minimum of 4 characters",
              },
              maxLength: {
                value: 20,
                message: "Nickname must include a maximum of 20 characters",
              },
            })}
            hint="НИКНЕЙМ"
            error={errors.nickname as FieldError}
            placeholder="your-nickname"
            className={s.field}
            style={{
              minWidth: "100%",
              width: "100%",
            }}
          />
          <div className={s.wrapper}>
            <Field
              {...registerInput(
                "password",
                isPasswordRequired
                  ? {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message:
                          "The password must include a minimum of 6 characters",
                      },
                    }
                  : {}
              )}
              type="password"
              hint="ВАШ ПАРОЛЬ"
              error={errors.password as FieldError}
              placeholder="your-password-123"
              className={s.field}
              style={{
                minWidth: "47.5%",
                width: "47.5%",
              }}
            />
            <Field
              {...registerInput(
                "confirmPassword",
                isPasswordRequired
                  ? {
                      required: "Re-password is required",
                      minLength: {
                        value: 6,
                        message:
                          "The repeated password must include a minimum of 6 characters",
                      },
                      validate: (value) =>
                        value === watch("password") ||
                        "The passwords must be the same",
                    }
                  : {}
              )}
              type="password"
              hint="ПОВТОРНЫЙ ПАРОЛЬ"
              error={errors.confirmPassword as FieldError}
              placeholder="your-password-123"
              className={s.field}
              style={{
                minWidth: "47.5%",
                width: "47.5%",
              }}
            />
          </div>
        </div>
        <button
          className={s.button}
          onClick={() => setType("login")}
          disabled={isLoading}
        >
          РЕГИСТРАЦИЯ
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Register;
