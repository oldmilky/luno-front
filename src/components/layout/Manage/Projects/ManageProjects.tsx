import ManageButtons from "../Header/ManageButtons";
import ManageHeader from "../Header/ManageHeader";
import s from "../Manage.module.scss";
import { FC, useState } from "react";
import mockImage from "@/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";
import { useProjects } from "./useProjects";
import ConfirmPopup from "@/components/ui/Popups/Confirm/ConfirmPopup";

const ManageProjects: FC = () => {
  const {
    createAsync,
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
  } = useProjects();

  const [confirmDelete, setConfirmDelete] = useState(null);

  console.log(data);

  return (
    <div className={s.manage}>
      <ManageButtons />
      <ManageHeader
        title="Список проектов"
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={createAsync}
      />
      <motion.div
        className={s.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1.5}
        variants={bottomToTop}
      >
        <div className={s.titles}>
          <p className={`${s.title} ${s.sizeCheat}`}>Название</p>
          <p className={`${s.title} ${s.sizeCheat2}`}>Дата</p>
          <p className={`${s.title} ${s.sizeCheat2}`}>Тип сервиса</p>
          <p className={`${s.title} ${s.sizeCheat4}`}>Картинка</p>
          <p className={`${s.title} ${s.sizeCheat5}`}>Сортировка</p>
          <p className={`${s.title} ${s.sizeCheat5}`}>Разработка</p>
          <p className={`${s.title} ${s.sizeCheat5}`}>Дизайн</p>
        </div>
        <div className={s.items}>
          {data
            ?.sort((a, b) => {
              if (a.game < b.game) return 1;
              if (a.game > b.game) return -1;
              return b.sort - a.sort;
            })
            .map((project) => (
              <div className={s.item} key={project.slug}>
                <Link href={`${project.editUrl}`} className={s.container}>
                  <p className={`${s.text} ${s.sizeCheat}`}>{project.name}</p>
                  <p className={`${s.text} ${s.sizeCheat2}`}>{project.date}</p>
                  <p className={`${s.text} ${s.sizeCheat2}`}>
                    {project.typeService}
                  </p>
                  <div className={s.sizeCheat4}>
                    <Image
                      unoptimized
                      width={60}
                      height={60}
                      src={project.image ? project.image : mockImage}
                      className={s.image}
                      alt="mock"
                    />
                  </div>
                  <p className={`${s.text} ${s.sizeCheat5}`}>{project.sort}</p>
                  <p className={`${s.text} ${s.sizeCheat5}`}>
                    {project.develop === true ? "Да" : "Нет"}
                  </p>
                  <p className={`${s.text} ${s.sizeCheat5}`}>
                    {project.design === true ? "Да" : "Нет"}
                  </p>
                </Link>
                <div className={s.wrap}>
                  <Link href={`${project.editUrl}`}>
                    <div className={s.iconEdit} />
                  </Link>
                  <div
                    className={s.iconTrash}
                    onClick={() => setConfirmDelete(project._id)}
                  />
                  <AnimatePresence>
                    {confirmDelete && (
                      <ConfirmPopup
                        active={Boolean(confirmDelete)}
                        setActive={setConfirmDelete}
                        onclick={() => {
                          deleteAsync(confirmDelete).finally(() => {
                            setConfirmDelete(null);
                          });
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ManageProjects;
