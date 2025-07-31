import s from "./ManageHeader.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

const ManageButtons: FC = () => {
  const { pathname } = useRouter();

  return (
    <div className={s.manageButtons}>
      <h2 className={s.title}>Панель управления</h2>
      <div className={s.buttons}>
        <Link
          href="/manage/services"
          className={`${s.button} ${
            pathname.startsWith("/manage/services") && s.buttonActive
          }`}
          scroll={false}
        >
          Сервисы
        </Link>
        <Link
          href="/manage/projects"
          className={`${s.button} ${
            pathname.startsWith("/manage/projects") && s.buttonActive
          }`}
          scroll={false}
        >
          Проекты
        </Link>
        <Link
          href="/manage/blogs"
          className={`${s.button} ${
            pathname.startsWith("/manage/blogs") && s.buttonActive
          }`}
          scroll={false}
        >
          Блоги
        </Link>
        <Link
          href="/manage/faqs"
          className={`${s.button} ${
            pathname.startsWith("/manage/faqs") && s.buttonActive
          }`}
          scroll={false}
        >
          {`FAQ's`}
        </Link>
      </div>
    </div>
  );
};

export default ManageButtons;
