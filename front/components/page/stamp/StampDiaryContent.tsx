import { Box } from "@styles/layout";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { today } from "@recoil/diary";
import { getDiaries } from "@services/api/diary";
import { useRecoilValue } from "recoil";
import { Diary } from "@type/diary";
import { isUserDiary, isPartnerDiary } from "@services/utils/diaryAuthor";
import UserDiary from "../diary/UserDiary";
import PartnerDiary from "../diary/PartnerDiary";

const StampDiaryContent = () => {
  // const [todayDiary, setTodayDiary] = useState<Array<Diary> | undefined>([]);

  // const todayDate = useRecoilValue(today);
  // const { data } = useQuery(["diaries", todayDate], () => getDiaries(todayDate));

  // useEffect(() => {
  //   setTodayDiary(data.diaries);
  // }, [data]);

  return (
    <ContentBox>
      <DiarySummary>
        <Name>나</Name>
        {/* <Content>
            {todayDiary && todayDiary.length > 0? todayDiary.find(isUserDiary)!.content : <p>작성된 일기가 없어요.</p>}
          </Content> */}
      </DiarySummary>
      <PartnerDiarySummary>
        <PartnerName>상대</PartnerName>
        {/* <Content>
            {todayDiary && todayDiary.length > 0? todayDiary.find(isPartnerDiary)!.content : <p>작성된 일기가 없어요.</p>}
          </Content> */}
      </PartnerDiarySummary>
    </ContentBox>
  );
};
const ContentBox = styled(Box)`
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const DiarySummary = styled(Box)`
  background-color: ${props => props.theme.color.purpleBox};
  width: 100%;
  margin: 0.5em 0;
  height: 37%;
  display: grid;
  grid-template-columns: 12% 88%;
  border: 1px solid ${props => props.theme.color.borderPoint};
`;
const Name = styled(Box)`
  background-color: ${props => props.theme.color.button};
  height: 100%;
  color: ${props => props.theme.color.white};
  border-radius: 8px 0 0 8px;
`;
const Content = styled(Box)`
  height: 100%;
  justify-content: flex-start;
  padding: 1em;
`;
const PartnerDiarySummary = styled(DiarySummary)`
  background-color: ${props => props.theme.color.grayBox};
  border: 1px solid ${props => props.theme.color.border};
`;
const PartnerName = styled(Name)`
  background-color: ${props => props.theme.color.fontSub};
`;

export default StampDiaryContent;
