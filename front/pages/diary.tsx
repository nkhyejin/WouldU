import DiaryMain from "@components/page/diary/DiaryMain";
import DiarySidebar from "@components/page/diary/DiarySidebar";
import { SeoPageProps } from "@components/Seo";
import { useEffect } from "react";
import styled from "styled-components";
import { Container, Wrapper, Box } from "../styles/layout";

export default function Diary() {
  return (
    <DiaryWrapper>
      <SidebarContainer>
        <DiarySidebar />
      </SidebarContainer>
      <DiaryContainer>
        <DiaryMain />
      </DiaryContainer>
    </DiaryWrapper>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      pageTitle: "교환일기",
      pageDesc: "우쥬 교환일기 페이지 입니다.",
    },
  };
}

const DiaryWrapper = styled(Wrapper)`
  display: grid;
  grid-template-columns: 26% 70%;
  width: 100%;
  gap: 1.5%;
`;

const SidebarContainer = styled(Container)`
  height: 95vh;
  position: relative;
  border: 1px solid ${props => props.theme.color.border};
`;

const DiaryContainer = styled(SidebarContainer)`
`;
