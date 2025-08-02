import "@/assets/styles/global.scss";
import type { AppProps } from "next/app";
import { TypeComponentAuthFields } from "@/interfaces/user.interface";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Raleway } from "next/font/google";
import { DefaultSeo } from "next-seo";
import SEO from "@/providers/Seo/next-seo.config";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

// Динамические импорты для крупных компонентов
const AnimatePresence = dynamic(
  () =>
    import("framer-motion").then((mod) => ({ default: mod.AnimatePresence })),
  { ssr: false }
);

const AuthProvider = dynamic(
  () => import("@/providers/AuthProvider/AuthProvider"),
  { ssr: false }
);

type TypeAppProps = AppProps & TypeComponentAuthFields;

const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
  preload: true,
});

function App({ Component, pageProps, router }: TypeAppProps) {
  // Создаем QueryClient только один раз
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 минут
            cacheTime: 10 * 60 * 1000, // 10 минут
          },
        },
      })
  );

  // Проверяем нужна ли анимация для данного маршрута
  const needsAnimation =
    router.pathname !== "/404" && !router.pathname.startsWith("/api");

  return (
    <div className={raleway.className}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider Component={Component}>
            <DefaultSeo {...SEO} />
            {needsAnimation ? (
              <AnimatePresence mode="wait" initial={false}>
                <Component key={router.route} {...pageProps} />
              </AnimatePresence>
            ) : (
              <Component key={router.route} {...pageProps} />
            )}
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
