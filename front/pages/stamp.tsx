import EmotionAnalysis from "@components/page/stamp/EmotionAnalysis";
import EmotionCalendar from "@components/page/stamp/EmotionCalendar";
import EmotionGraph from "@components/page/stamp/EmotionGraph";
import StampDiary from "@components/page/stamp/StampDiary";
import StampTodoList from "@components/page/stamp/StampTodoList";
import withGetServerSideProps from "@hocs/withGetServerSideProps";
import { Box, Container, Wrapper } from "@styles/layout";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetFriend } from "@services/utils/useGetFriend";
import { useRecoilValue } from "recoil";
import { MonthEmotionAtom } from "@recoil/stamp";
import Link from "next/link";
import { emojiList } from "@services/utils/emojiList";

const emotion = ["기쁨", "상처", "당황", "분노", "불안", "슬픔"];

const Stamp = () => {
  const [openStamp, setOpenStamp] = useState(false);
  const { isConnected } = useGetFriend();
  const MonthEmotion = useRecoilValue(MonthEmotionAtom);

  const handleToggle = () => setOpenStamp(!openStamp);

  return (
    <StampWrapper>
      <LeftContainer>
        <LeftBox>
          <StampDiary />
        </LeftBox>
        <LeftBox>
          <StampTodoList />
        </LeftBox>
      </LeftContainer>
      <RightContainer>
        {isConnected && (
          <ButtonBox>
            <Button onClick={handleToggle} className={openStamp ? "" : "active"}>
              나
            </Button>
            <Button onClick={handleToggle} className={openStamp ? "active" : ""}>
              상대방
            </Button>
          </ButtonBox>
        )}
        <CalendarBox>
          <EmotionCalendar />
        </CalendarBox>
        <EmotionBox>
          {isConnected ? (
            Object.keys(MonthEmotion).length !== 0 ?
            <>
              <EmotionGraph />
              <EmotionAnalysis />
            </> : 
            <TextBox>
              <p>분석할 일기가 없습니다.</p>
              <EmojiBox>
                {emotion.map(e => emojiList(e, 20))}
              </EmojiBox>
            </TextBox>
          ) : (
            <p>친구와 연결하고 감정 분석 기능을 경험해 보세요!</p>
          )}
        </EmotionBox>
      </RightContainer>
    </StampWrapper>
  );
};

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex-direction: column;
  width: 58%;
  height: 95vh;
`;

const LeftBox = styled(Box)`
  width: 100%;
  height: 49%;
  background-color: ${props => props.theme.color.nav};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const ButtonBox = styled.div`
  width: 100%;
  justify-content: flex-start;
  padding: 0 1.5em;
`;
const Button = styled.button`
  background-color: inherit;
  color: ${props => props.theme.color.fontMain};
  width: 8em;
  height: 5vh;
  border-radius: 0;
  &.active {
    border-bottom: 2px solid ${props => props.theme.color.fontPoint};
    color: ${props => props.theme.color.fontPoint};
    font-weight: 700;
  }
  :hover {
    background-color: inherit;
    font-weight: 700;
  }
`;
const CalendarBox = styled.div`
  width: 85%;
  height: 55vh;
`;
const EmotionBox = styled(CalendarBox)`
  margin-top: 2vh;
  width: 90%;
  height: 30vh;
  display: flex;
  align-items: center;
  border-radius: ${props => props.theme.borderSize.borderSm};
  background-color: ${props => props.theme.color.purpleBox};
  justify-content: center;
`;
const TextBox = styled(Box)`
  flex-direction: column;
  gap: 1.5em;
`;
const EmojiBox = styled(Box)`
  gap: 1em;
`;

export default Stamp;