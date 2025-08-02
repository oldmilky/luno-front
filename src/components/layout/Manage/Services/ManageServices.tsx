import ManageButtons from "../Header/ManageButtons";
import ManageHeader from "../Header/ManageHeader";
import s from "../Manage.module.scss";
import { FC, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";
import { useServices } from "./useServices";
import ConfirmPopup from "@/components/ui/Popups/Confirm/ConfirmPopup";

const ManageServices: FC = () => {
  const {
    createAsync,
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
  } = useServices();

  const [confirmDelete, setConfirmDelete] = useState(null);

  console.log(data);

  return (
    <div className={s.manage}>
      <ManageButtons />
      <ManageHeader
        title="Список сервисов"
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
          <p className={`${s.title} ${s.sizeCheat2}`}>Реализовано</p>
          <p className={`${s.title} ${s.sizeCheat2}`}>Цена</p>
          <p className={`${s.title} ${s.sizeCheat4}`}>Проектов сделано</p>
          <p className={`${s.title} ${s.sizeCheat5}`}>Сортировка</p>
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
                  <p className={`${s.text} ${s.sizeCheat2}`}>{project.relized}</p>
                  <p className={`${s.text} ${s.sizeCheat2}`}>{project.price}</p>
                  <p className={`${s.text} ${s.sizeCheat4}`}>{project.done}</p>
                  <p className={`${s.text} ${s.sizeCheat5}`}>{project.sort}</p>
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

export default ManageServices;
