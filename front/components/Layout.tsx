import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginStateSelector, userAtom } from "../recoil/user";
import { Container } from "../styles/layout";
import AfterNavbar from "./AfterNavbar";
import BeforeNavBar from "./BeforeNavbar";
import About from "./page/about/About";
import { isDarkAtom } from "@recoil/darkmode";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";

export interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const isDarkMode = useRecoilValue(isDarkAtom);
  const isLoginStateAtom = useRecoilValue(loginStateSelector);
  const user = useRecoilValue(userAtom);
  const [isLoginState, setIsLoginState] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setIsLoginState(isLoginStateAtom);
  }, [isLoginStateAtom]);

  useEffect(() => {
    if (!user && router.pathname !== "/" && router.pathname !== "/join") {
      console.log(router.pathname);
      router.push("/login");
    }
  }, [isLoginState]);

  return (
    <>
      {isLoginState && (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <LayoutWrapper>
            <AfterNavbar />
            {/* <div>로그인된상태</div> */}
            <div>{children}</div>
          </LayoutWrapper>
        </ThemeProvider>
      )}
      {isLoginState || (
        <>
          <BeforeNavBar />
          {/* <About /> */}
          <div>{children}</div>
        </>
      )}
    </>
  );
}

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 720px;
`;
