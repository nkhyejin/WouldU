import { dayAtom } from "@recoil/planner";
import { Container } from "@styles/layout";
import { useQuery } from "@tanstack/react-query";
import { Planner } from "@type/planner";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getDayPlan } from "../../../services/api/planner";
import { formatDate } from "../../../services/utils/formatDate";
import TodoItem from "./TodoItem";
import Check from "/public/icon/check.svg";

const TodoList = () => {
  const [todos, setTodos] = useState<Planner[] | null>(null);

  const recoilDay = useRecoilValue<Date>(dayAtom);
  const day = formatDate(recoilDay);
  const { data: planData } = useQuery(["plan", day], () => getDayPlan(day));

  useEffect(() => {
    setTodos(planData);
  }, [planData]);

  return (
    <ListContainer>
      <TitleBox>
        <Check />
        <p>오늘의 할일</p>
      </TitleBox>
      {todos?.map(todo => (
        <TodoItem key={todo.id} id={todo.id} description={todo.description} isCompleted={todo.isCompleted} />
      ))}
      <TodoItem id={"123"} description={"testtest"} isCompleted={false} />
    </ListContainer>
  );
};

const ListContainer = styled(Container)`
  flex-direction: column;
  height: 90%;
  align-items: flex-start;
  width: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
  margin-top: 1em;
  p {
    margin-left: 0.3em;
    color: ${props => props.theme.color.fontMain};
    font-size: ${props => props.theme.fontSize.textMd};
  }
`;

export default TodoList;
