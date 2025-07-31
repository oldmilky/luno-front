import Curve from "@/components/animate/CurvePage/CurvePage";
import SmoothScroll from "@/components/animate/SmoothScroll/SmoothScroll";
import StairsLayout from "@/components/animate/StairsPage/Stairs";
import Head from "next/head";
import { FC, ReactNode } from "react";

interface ISeo {
  title: string;
  description?: string;
  image?: string;
  children: ReactNode;
}

const Seo: FC<ISeo> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <StairsLayout> */}
        <Curve>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </Curve>
        {/* </StairsLayout> */}
      </main>
    </>
  );
};

export default Seo;
