// import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Seo, { SeoPageProps } from "../components/Seo";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { darkTheme, lightTheme } from "../styles/theme";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@components/Error";
import { RecoilRoot, useRecoilValue } from "recoil";
import { loginStateSelector } from "../recoil/user";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps<SeoPageProps>) {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const { pageTitle, pageDesc } = pageProps;

  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <SessionProvider session={pageProps.session}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <GlobalStyle />
              <ErrorBoundary FallbackComponent={Error}>
                <Suspense fallback={<div>loading...</div>}>
                  <Layout>
                    <Seo pageTitle={pageTitle} pageDesc={pageDesc}></Seo>
                    <Component {...pageProps} />
                  </Layout>
                </Suspense>
              </ErrorBoundary>
            </Hydrate>
          </QueryClientProvider>
        </RecoilRoot>
      </SessionProvider>
    </ThemeProvider>
  );
}
