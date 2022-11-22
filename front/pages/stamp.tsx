import { Box, Container, Wrapper } from "@styles/layout";
import { GetServerSidePropsContext } from "next";
import styled from "styled-components";

const stamp = () => {
  return (
    <StampWrapper>
      <LeftContainer>
        <LeftBox>다이어리</LeftBox>
        <LeftBox>오늘의할일</LeftBox>
      </LeftContainer>
      <RightContainer>
        <Box>스탬프</Box>
      </RightContainer>
    </StampWrapper>
  );
};

export default stamp;

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return {
    props: {
      pageTitle: "스탬프",
      pageDesc: "우쥬 스탬프 페이지 입니다.",
    },
  };
};

const StampWrapper = styled(Wrapper)`
  justify-content: space-evenly;
`;

const LeftContainer = styled(Container)`
  flex-direction: column;
  justify-content: space-between;
  width: 36%;
  height: 95vh;
  background-color: ${props => props.theme.color.background};
`;

const RightContainer = styled(Container)`
  flex-direction: column;
  width: 58%;
  height: 95vh;
`;

const LeftBox = styled(Box)`
  width: 100%;
  height: 49%;
  background-color: ${props => props.theme.color.nav};
`;
