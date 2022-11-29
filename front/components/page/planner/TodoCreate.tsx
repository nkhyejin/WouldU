import { createAtom, dayAtom } from "@recoil/planner";
import { colors } from "@styles/common_style";
import { Box, Container } from "@styles/layout";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { Planner } from "@type/planner";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { createPlan } from "../../../services/api/planner";
import { formatDate } from "../../../services/utils/formatDate";
import CirclePlus from "/public/icon/circleplus.svg";

const TodoCreate = () => {
  const [isCreateOpen, setIsCreateOpen] = useRecoilState(createAtom);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<{ description: string }>();
  const queryClient = useQueryClient();

  const handleToggle = () => setIsCreateOpen(!isCreateOpen);

  //달력날짜에 프롭스로 받아서 변경될 예정
  const recoilDay = useRecoilValue<Date>(dayAtom);
  const day: string = formatDate(recoilDay);

  // useEffect(() => {
  //   setDay(formatDate(recoilDay));
  // }, [recoilDay]);

  const updateMutation = useMutation((data: Planner) => createPlan(data), {
    onSuccess: () => {
      console.log("update onSuccess");
      queryClient.invalidateQueries(["plan", day]);
    },
  });

  const onCreateSubmit = async (data: Planner) => {
    // priority는 옵션임으로, 우선 1로 셋팅해놓음.
    updateMutation.mutate({ date: day, ...data, priority: 1 });
    setIsCreateOpen(false);
    resetField("description");
  };

  return (
    <>
      {isCreateOpen ? (
        <CreateContainer>
          <InsertForm onSubmit={handleSubmit(onCreateSubmit)}>
            <BtnBox onClick={handleToggle}>
              <CircleCloseSvg />
            </BtnBox>
            <Input
              autoFocus
              placeholder="할일을 입력 하세요."
              {...register("description", {
                required: true,
                minLength: { value: 2, message: "2자 이상 입력해주세요." },
              })}
            />
            <ErrorMessage>{errors?.description?.message}</ErrorMessage>
            <button type="submit">입력</button>
          </InsertForm>
        </CreateContainer>
      ) : (
        <BtnBox onClick={handleToggle}>
          <CirclePlusSvg />
        </BtnBox>
      )}
    </>
  );
};

const CreateContainer = styled(Container)`
  flex-direction: column;
  width: 100%;
  bottom: 0;
  position: absolute;
`;
const InsertForm = styled.form`
  z-index: 4;
  background: ${props => props.theme.color.purpleBox};
  padding-top: 3em;
  padding-bottom: 3em;
  border-top: 1px solid #e9ecef;
  width: 100%;
  border: 1px solid ${props => props.theme.color.borderPoint};
  border-radius: ${props => props.theme.borderSize.borderSm};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CircleCloseSvg = styled(CirclePlus)`
  top: -20px;
  position: absolute;
  transform: rotate(45deg);
`;
const CirclePlusSvg = styled(CirclePlus)`
  margin-top: 2em;
  margin-bottom: 3em;
`;
const BtnBox = styled(Box)`
  z-index: 5;
  cursor: pointer;
`;
const Input = styled.input`
  height: 2.5em;
  margin: 1em;
  width: 80%;
`;

const ErrorMessage = styled.p`
  color: ${colors.red};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;

export default TodoCreate;
