import { Box } from '@styles/layout';
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import LeftArrow from '/public/icon/leftarrow.svg'
import RightArrow from '/public/icon/rightarrow.svg'

const Calendar = () => {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const MONTHS = ['1 월', '2 월', '3 월', '4 월', '5 월', '6 월', '7 월', '8 월', '9 월', '10 월', '11 월', '12 월'];

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
    console.log(date);
  }, [date]);

  function getStartDayOfMonth(date: Date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDate === 0 ? 7 : startDate;
  }

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(year) ? DAYS_LEAP : DAYS;
  const monthDays = days[month] + (startDay - 1);

  return (
    <Frame>
      <Header>
        <MonthBox>
          {/* <Year>
            {year}년
          </Year> */}
          <Month>
            {MONTHS[month]}
          </Month>
        </MonthBox>
        <ButtonBox>
          <Button onClick={() => setDate(new Date(year, month - 1, day))}>
            <LeftArrow />
          </Button>
          <Button onClick={() => setDate(new Date(year, month + 1, day))}>
            <RightArrow />
          </Button>
        </ButtonBox>
      </Header>
      <Body>
        <WeekBox>
          {DAYS_OF_THE_WEEK.map((w) => (
            <WeekTile key={w}>
              <WeekText>
                {w}
              </WeekText>
            </WeekTile>
          ))}
        </WeekBox>
        <DayBox>
          {Array(monthDays)
            .fill(null)
            .map((_, index) => {
              const d = index - (startDay - 2);

              return (
                <DayTile
                  key={index}
                  onClick={() => setDate(new Date(year, month, d))}
                  className={monthDays > 35 ? "shortHeight" : ""}
                  isToday={year === today.getFullYear() && month === today.getMonth() && d === today.getDate()}
                  isSelected={d === day}
                >
                  {d > 0 ? <DayText>{d}</DayText> : ''}
                </DayTile>
              );
            })}
        </DayBox>
      </Body>
    </Frame>
  );
}

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  padding: 5em 2em 2em 2em;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  height: 10vh;
  font-size: 18px;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;
const MonthBox = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
`;
const Year = styled(Box)`
  font-size: ${props => props.theme.fontSize.textMd};
  margin: 0.5em;
  /* color: ${props => props.theme.color.fontSub}; */
`;
const Month = styled(Box)`
  color: ${props => props.theme.color.fontMain};
  font-size: 40px;
  font-weight: 500px;
`;
const ButtonBox = styled(Box)`
  height: 100%;
  align-items: flex-end;
`;
const Button = styled.div`
  cursor: pointer;
  padding: 0.1em 0.5em;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const WeekBox = styled(Box)`
  width: 100%;
  height: 5vh;
  border-radius: 0;
  border-bottom: 1px solid ${props => props.theme.color.fontMain};
`;
const DayBox = styled(WeekBox)`
  flex-wrap: wrap;
  padding-top: 1em;
  height: 72vh;
  justify-content: flex-start;
  align-items: flex-start;
  border: none;
`;

const WeekTile = styled.div`
  width: 14.28%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderSize.borderSm};
  cursor: pointer;
`;
const DayTile = styled.div<{isToday : boolean, isSelected: boolean}>`
  width: 14.28%;
  height: 13vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  border-radius: ${props => props.theme.borderSize.borderSm};
  cursor: pointer;
  :hover {
    background-color: rgba(245, 245, 245, 0.5);
    color: ${props => props.theme.color.fontPoint};
  }
  &.shortHeight {
    height: 11vh;
  }
  ${(props) =>
    props.isToday &&
    css`
      background: ${props => props.theme.color.grayBox};
      font-weight: bold;
      color: ${props => props.theme.color.fontPoint};
        :hover, :focus {
          background: #6f48eb33;
          font-weight: bold;
          color: ${props => props.theme.color.fontPoint};
        }
    `}

  ${(props) =>
    props.isSelected &&
    css`
        background: rgba(219, 202, 244, 0.5);
        color: ${props => props.theme.color.fontPoint};
    `}
`;
const WeekText = styled.p`
  font-weight: 500;
`;
const DayText = styled.p`
  font-weight: normal;
  margin: 0.5em;
`;

export default Calendar;