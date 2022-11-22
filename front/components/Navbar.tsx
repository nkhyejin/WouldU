import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Box, Container } from "../styles/layout";

export default function NavBar() {
  const router = useRouter();
  const navMenus = ["스탬프", "일정관리", "교환일기", "마이페이지"];
  const navLinks = ["/stamp", "/planner", "/diary", "/mypage"];

  return (
    <Nav>
      <Image src="/icon/logoblack.svg" alt="logo" width={180} height={60} />
      <UserBox>
        <Image src="/icon/user.svg" alt="user" width={60} height={60} />
        <TextBox1>닉네임</TextBox1>
        <TextBox2>edit</TextBox2>
      </UserBox>
      {/* navigation 구현 */}
      <NavLink>
        {navMenus.map((menu, index) => (
          <Link href={navLinks[index]} key={index}>
            <LinkButton className={router.pathname === navLinks[index] ? "active" : ""}>
              <a>{menu}</a>
            </LinkButton>
          </Link>
        ))}
      </NavLink>
      <Box>로그아웃</Box>
    </Nav>
  );
}

const Nav = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 100vh;
  justify-content: flex-start;
  padding: 2em 0;
  margin: 0;
`;

const NavLink = styled(Container)`
  flex-direction: column;
  margin: 1.5em 1em 5em 1em;
  width: 100%;
`;

const LinkButton = styled.div`
  width: 100%;
  height: 10vh;
  border-radius: 0;
  font-size: ${props => props.theme.fontSize.textMd};
  color: ${props => props.theme.color.fontMain};
  background-color: ${props => props.theme.color.nav};
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    background-color: rgba(219, 202, 244, 0.5);
    border-radius: 0px 50px 50px 0px;
    width: 100%;
    a {
      color: ${props => props.theme.color.fontPoint};
      font-size: ${props => props.theme.fontSize.textLg};
      font-weight: bold;
    }
  }
  &:hover {
    background-color: rgba(245, 245, 245, 0.5);
    /* font-size: ${props => props.theme.fontSize.textLg}; */
  }
`;

const UserBox = styled(Container)`
  flex-direction: column;
  margin: 3em 2em;
`;

const TextBox1 = styled(Box)`
  padding-top: 0.4em;
  font-size: ${props => props.theme.fontSize.textMain};
`;
const TextBox2 = styled(TextBox1)`
  font-size: ${props => props.theme.fontSize.textSm};
`;
