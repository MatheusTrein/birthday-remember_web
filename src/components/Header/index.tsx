import Link from "next/link";
import { useContext } from "react";

import { AuthContext, singOut } from "../../contexts/AuthContext";
import { appColors } from "../../styles/appColors";
import { Avatar } from "../Avatar";
import { Divider } from "../Divider";
import { Logo } from "../Logo";
import { ButtonSingOut, HeaderWrapper, MenuProfile, UserName } from "./styles";

const Header: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <HeaderWrapper>
      <Logo />
      <Avatar
        userName={user.name}
        src={user.avatarUrl}
        alt={`avatar from ${user.name}`}
      />
      <UserName>{user.name}</UserName>
      <MenuProfile>
        <Link href="/profile/edit">EDITAR PERFIL</Link>
        <Divider
          axis="y"
          gradient
          initialColor={appColors.blue}
          finalColor={appColors.pink}
          stroke="2px"
        />
        <ButtonSingOut onClick={singOut}>SAIR</ButtonSingOut>
      </MenuProfile>
      <Divider
        axis="x"
        gradient
        initialColor={appColors.blue}
        finalColor={appColors.pink}
        stroke="1px"
      />
    </HeaderWrapper>
  );
};

export { Header };
