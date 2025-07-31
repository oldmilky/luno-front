import About from "@/components/layout/Home/About/About";
import Benefits from "@/components/layout/Home/Benefits/Benefits";
import Collection from "@/components/layout/Home/Collection/Collection";
import Preview from "@/components/layout/Home/Preview/Preview";
import Process from "@/components/layout/Home/Process/Process";
import Services from "@/components/layout/Home/Services/Services";
import Tech from "@/components/layout/Home/Tech/Tech";
import Header from "@/components/ui/Header/Header";
import Seo from "@/providers/Seo";
import Footer from "../ui/Footer/Footer";
import { IProject } from "@/interfaces/project.interface";
import { IService } from "@/interfaces/service.interface";
import { FC } from "react";

const Home: FC<{ projects: IProject[]; services: IService[] }> = ({
  projects,
  services,
}) => {
  return (
    <Seo title="LUNO - Разработка уникальных сайтов и дизайнов!">
      <Header />
      <Preview />

      <About />
      <Collection projects={projects} />
      <Tech />

      <Services services={services} />

      <Process />

      <Benefits />

      <Footer />
    </Seo>
  );
};

export default Home;
