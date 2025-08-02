import "@/assets/styles/global.scss";
import type { AppProps } from "next/app";
import { TypeComponentAuthFields } from "@/interfaces/user.interface";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { AnimatePresence } from "framer-motion";
import { Raleway } from 'next/font/google'
import { DefaultSeo } from "next-seo";
import SEO from '@/providers/Seo/next-seo.config';

type TypeAppProps = AppProps & TypeComponentAuthFields;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const raleway = Raleway({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap',
  preload: true,
})

function App({ Component, pageProps, router }: TypeAppProps) {
  return (
    <div className={raleway.className}>
      <Provider store={store}>
        <Toaster position="top-center" />
        <QueryClientProvider client={queryClient}>
          <AuthProvider Component={Component}>
            <AnimatePresence mode="wait" initial={false}>
              <DefaultSeo {...SEO} />
              <Component key={router.route} {...pageProps} />
            </AnimatePresence>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
