import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  FINDPW: "/findPassword",
  JOIN: "/join",
  STAMP: "/stamp",
  DIARY: "/diary",
  PLANNER: "/planner",
  MYPAGE: "/mypage",
};

const mapPathToTitle: { [key: string]: string } = {
  [PATH.HOME]: "홈",
  [PATH.LOGIN]: "로그인",
  [PATH.FINDPW]: "비밀번호 찾기",
  [PATH.JOIN]: "회원가입",
  [PATH.STAMP]: "스탬프",
  [PATH.DIARY]: "다이어리",
  [PATH.PLANNER]: "일정관리",
  [PATH.MYPAGE]: "마이페이지",
};

const mapPathToDesc: { [key: string]: string } = {
  [PATH.HOME]: "홈 화면 입니다. ",
  [PATH.LOGIN]: "우쥬, 로그인 페이지 입니다. ",
  [PATH.FINDPW]: "비밀번호 찾기 페이지 입니다.",
  [PATH.JOIN]: "회원가입 페이지 입니다.",
  [PATH.STAMP]: "스탬프 페이지 입니다. ",
  [PATH.DIARY]: "다이어리 페이지 입니다.",
  [PATH.PLANNER]: "일정관리 페이지 입니다.",
  [PATH.MYPAGE]: "마이페이지 입니다.",
};

type cookieType = {
  userToken?: string;
  [key: string]: any;
};
const accessPage = [PATH.LOGIN, PATH.JOIN];

const cookieStringToObject = (cookieString: string) => {
  let cookie = [];
  if (!cookieString) {
    return {};
  } else {
    cookie = cookieString.split("; ");
    let result: cookieType = {};

    for (let i = 0; i < cookie.length; i++) {
      const [property, value] = cookie[i].split("=");
      result[property] = value;
    }
    return result;
  }
};

const withGetServerSideProps = (getServerSideProps: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const pagePath = context.resolvedUrl;

    const cookies: string = context.req ? context.req.headers.cookie! : "";
    const cookiesObj = cookieStringToObject(cookies);
    if (!cookiesObj.userToken && !accessPage.includes(pagePath)) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return await getServerSideProps(context).then((res: { [key: string]: any }) => {
      return {
        ...res,
        props: {
          ...res.props,
          isError: false,
          pageTitle: mapPathToTitle[pagePath],
          pageDesc: mapPathToDesc[pagePath],
        },
      };
    });
  };
};

export default withGetServerSideProps;
