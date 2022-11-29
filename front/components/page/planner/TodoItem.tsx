import { createAtom, dayAtom } from "@recoil/planner";
import { getDayPlan, updatePlan } from "@services/api/planner";
import { formatDate } from "@services/utils/formatDate";
import { Box } from "@styles/layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Planner } from "@type/planner";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import CircleCheck from "/public/icon/circlecheck.svg";
import CircleCheckBack from "/public/icon/circlecheckback.svg";

const TodoItem = (plan: Planner) => {
  const [isCreateOpen, setIsCreateOpen] = useRecoilState(createAtom);
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const recoilDay = useRecoilValue<Date>(dayAtom);
  const day = formatDate(recoilDay);
  
  const UpdateMutation = useMutation((data: Planner) => updatePlan(data), {
    onSuccess: (data) => {
      console.log("it's working")
      queryClient.setQueryData(['plan',{ id : plan.id }], data);
      queryClient.invalidateQueries(["plan", day]);
    }
  });

  const handleToggle = () => {
    // isCompleted 상태 바꾸며, patch 요청
    // 계속 누를때마다 요청을 하는거면...? nest patch는 일부분만 가긴하지만 부하걸릴것이 걱정이다.
  };

  const handleRemoveTodo = () => {
    //delete 요청
  };

  const handleUpdateTodo = async () => {
    setIsCreateOpen(true);
    try {
      await UpdateMutation.mutate({
        id: plan.id,
        description: plan.description,
        date: plan.date,
        priority: 1,
        isCompleted: false,
      })
      console.log(plan.description)
    } catch(e) {
      console.log("error")
    }
  };

  return (
    <TodoBox className={plan.isCompleted ? "finish" : ""}>
      <CheckBox onClick={handleToggle}>{plan.isCompleted ? <CircleCheckSvg /> : <CircleCheckBackSvg />}</CheckBox>
      <Text>{plan.description}</Text>
      <ButtonBox>
        <Button onClick={handleUpdateTodo}>수정</Button>
        <Button onClick={handleRemoveTodo}>삭제</Button>
      </ButtonBox>
    </TodoBox>
  );
};

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: none;
`;
const Button = styled.button`
  background-color: inherit;
  color: ${props => props.theme.color.fontSub};
  border-radius: 0;
  padding: 0 0.8em;
  font-size: 10px;
  &:first-child {
    border-right: 1px solid ${props => props.theme.color.fontSub};
  }
  &:hover {
    background-color: inherit;
    color: ${props => props.theme.color.fontMain};
    font-weight: 600;
  }
`;
const Text = styled.p``;

const TodoBox = styled(Box)`
  position: relative;
  justify-content: space-between;
  padding: 1em 0.5em 1em 2em;
  width: 100%;
  height: 4em;
  margin-bottom: 1em;
  background-color: ${props => props.theme.color.purpleBox};
  border: 1px solid ${props => props.theme.color.borderPoint};

  &:hover {
    ${ButtonBox} {
      display: initial;
    }
  }
  &.finish {
    border: 1px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.grayBox};
    ${Text} {
      font-style: italic;
      text-decoration: line-through;
      color: ${props => props.theme.color.fontSub};
    }
  }
`;
const CheckBox = styled(Box)`
  margin: 0;
  padding: 0;
  position: absolute;
  left: -15px;
  cursor: pointer;
`;

const CircleCheckSvg = styled(CircleCheck)``;

const CircleCheckBackSvg = styled(CircleCheckBack)``;

export default TodoItem;
