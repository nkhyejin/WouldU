import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isCodeModalAtom } from "@recoil/friend";
import { FCodeType, MatchCodeFormValue } from "@type/friend";
import { requestFriend } from "@services/api/friend";
import { useCallback, useEffect, useRef } from "react";

import { Cancel, ModalContainer, ModalWrapper, Overlay } from "@styles/modal_layout";
import { CloseIcon } from "@components/icons/CloseIcon";
import { AnimatePresence } from "framer-motion";
import { ModalVariant, OverlayVariant } from "@styles/ModalVariants";
import reset from "styled-reset";

const codeNum = [1, 2, 3, 4, 5, 6];
const FriendConnectModal = () => {
  const [isCodeShow, setIsCodeShow] = useRecoilState(isCodeModalAtom);
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<MatchCodeFormValue>();

  useEffect(() => {
    isCodeShow && setFocus("code1");
  }, [isCodeShow]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      const targetName = e.target.name;
      const num = Number(targetName[targetName.length - 1]);

      if (num <= 5) {
        const text = `code${num + 1}` as FCodeType;
        setFocus(text);
      }
    }
  };

  const onSubmitHandler: SubmitHandler<MatchCodeFormValue> = async data => {
    const code = codeNum.reduce((accu, cur) => {
      const text = `code${cur}` as FCodeType;
      return accu + data[text];
    }, "");
    const status = await requestFriend(code);
    switch (status) {
      case 201:
        alert("요청이 완료되었습니다.");
        closeModal();
        break;
      case 481:
        alert("친구의 코드를 다시 확인해 주세요.");
        reset();
        break;
      case 482:
        alert("이미 친구가 있습니다.");
        reset();
        break;
      case 483:
        alert("같은 유저에게 보낸 대기 중인 요청이 있습니다.");
        reset();
        break;
    }
  };
  const closeModal = () => {
    setIsCodeShow(false);
    reset();
  };

  return (
    <AnimatePresence>
      {isCodeShow && (
        <ModalWrapper>
          <ModalContainer width="400px" height="200px" {...ModalVariant}>
            <Cancel onClick={closeModal}>
              <CloseIcon width={15} height={15} />
            </Cancel>
            <DescArea>
              <Title>상대방의 연결 코드를 입력하세요.</Title>
              <Form onSubmit={handleSubmit(onSubmitHandler)}>
                <InputArea>
                  <Input
                    maxLength={1}
                    {...register("code1", {
                      required: " 코드를 입력해 주세요.",
                      minLength: 1,
                    })}
                    onChange={handleChange}
                  />
                  <Input
                    maxLength={1}
                    {...register("code2", {
                      required: " 코드를 입력해 주세요.",
                      minLength: 1,
                    })}
                    onChange={handleChange}
                  />
                  <Input
                    maxLength={1}
                    {...register("code3", {
                      required: " 코드를 입력해 주세요.",
                      minLength: 1,
                    })}
                    onChange={handleChange}
                  />
                  <Input
                    maxLength={1}
                    {...register("code4", {
                      required: " 코드를 입력해 주세요.",
                      minLength: 1,
                    })}
                    onChange={handleChange}
                  />
                  <Input
                    maxLength={1}
                    {...register("code5", {
                      required: " 코드를 입력해 주세요.",
                      minLength: 1,
                    })}
                    onChange={handleChange}
                  />
                  <Input
                    maxLength={1}
                    {...register("code6", {
                      required: " 코드를 입력해 주세요.",
                      minLength: 1,
                    })}
                    onChange={handleChange}
                  />
                </InputArea>

                <ConnectButton>연결하기</ConnectButton>
              </Form>
            </DescArea>
          </ModalContainer>
          <Overlay {...OverlayVariant} onClick={closeModal} />
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

const DescArea = styled.div`
  margin: 1em;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.color.fontMain};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const InputArea = styled.div`
  display: flex;
`;

const Title = styled.p`
  font-size: ${props => props.theme.fontSize.textMain};
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.color.fontMain};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;

const ConnectButton = styled.button`
  width: 110px;
  padding: 0.5em 1em;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 30px;
  height: 30px;
`;
export default FriendConnectModal;
