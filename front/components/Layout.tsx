import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginStateSelector } from "../recoil/user";
import { Container } from "../styles/layout";
import AfterNavbar from "./AfterNavbar";
import BeforeNavBar from "./BeforeNavbar";
import About from "./page/about/About";

export interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const isLoginStateAtom = useRecoilValue(loginStateSelector);
  const [isLoginState, setIsLoginState] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoginState(isLoginStateAtom);
  }, [isLoginStateAtom]);

  useEffect(() => {
    console.log("isLoginState", isLoginState);
    if (!isLoginState && router.pathname !== "/" && router.pathname !== "/join") {
      console.log(router.pathname);
      router.push("/login");
    }
  }, [isLoginState]);

  return (
    <>
      {isLoginState && (
        <LayoutWrapper>
          <AfterNavbar />
          {/* <div>로그인된상태</div> */}
          <div>{children}</div>
        </LayoutWrapper>
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
