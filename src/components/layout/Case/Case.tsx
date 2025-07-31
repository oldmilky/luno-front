import { FC } from "react";
import s from "./Case.module.scss";
import Name from "./Name/Name";
import Media from "./Media/Media";
import About from "./About/About";
import Order from "@/components/ui/Order/Order";
import { motion } from "framer-motion";
import { IProject } from "@/interfaces/project.interface";

const Case: FC<{ project: IProject; projects: IProject[] }> = ({
  project,
  projects,
}) => {
  if (!project) {
    return <div className={s.notfound}>Project not found :c</div>;
  }

  return (
    <motion.section
      className={s.case}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={s.content}>
        <Name
          name={project.name}
          nameEn={project.nameEn}
          date={project.date}
          typeService={project.typeService}
          develop={project.develop}
          design={project.design}
        />
      </div>
      <Media
        image={project.image}
        image2={project.image2}
        image3={project.image3}
        image4={project.image4}
        image5={project.image5}
        image6={project.image6}
        image7={project.image7}
        image8={project.image8}
        image9={project.image9}
        image10={project.image10}
        image11={project.image11}
        image12={project.image12}
        image13={project.image13}
        image14={project.image14}
        image15={project.image15}
      />
      <About
        descText={project.descText || []}
        techText={project.techText || []}
        resultText={project.resultText || []}
      />
      <Order />
    </motion.section>
  );
};

export default Case;
