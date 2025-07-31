import "@/assets/styles/global.scss";
import type { AppProps } from "next/app";
import { TypeComponentAuthFields } from "@/interfaces/user.interface";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { AnimatePresence } from "framer-motion";

type TypeAppProps = AppProps & TypeComponentAuthFields;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App({ Component, pageProps, router }: TypeAppProps) {
  return (
    <Provider store={store}>
      <Toaster position="top-center" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider Component={Component}>
          <AnimatePresence mode="wait" initial={false}>
            <Component key={router.route} {...pageProps} />
          </AnimatePresence>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
