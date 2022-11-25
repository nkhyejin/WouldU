import { colors } from "@styles/common_style";
import { Box, Container } from "@styles/layout";
import { Planner } from "@type/planner";
import { Todos } from "@type/todos";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { todosState } from "../../../recoil/todos";
import { createPlan } from "../../../services/api/planner";
import CirclePlus from "/public/icon/circleplus.svg";

const TodoCreate = () => {
  const [open, setOpen] = useState(false);
  const setTodoList = useSetRecoilState(todosState);
  const [text, setText] = useState("");

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<{ description: string }>();

  const handleToggle = () => setOpen(!open);

  const formatDate = (date: Date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 9 ? "0" + date.getDate() : date.getDate())
    );
  };

  const onCreateSubmit = async (data: Planner) => {
    //나중에 useMutation 적용
    // 아직 status 몇번으로 전송되는지 확인 안되서 임의로 작성

    //추후에 달력에 날짜 지정에따라서 달라지게 해야함.
    // priority는 옵션임으로, 우선 1로 셋팅해놓음.
    const date = formatDate(new Date());
    console.log({ date, ...data });
    await createPlan({ date, ...data, priority: 1 });

    setOpen(false);
    resetField("description");
  };

  return (
    <>
      {open ? (
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
