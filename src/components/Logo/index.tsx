import Image from "next/image";

import Link from "next/link";

import { Link as StyledLink, Title } from "./styles";
import birthdayCakeSVG from "../../assets/birthdayCake.svg";

const Logo: React.FC = () => {
  return (
    <Link href="/" passHref>
      <StyledLink>
        <Title>
          birthday
          <Image
            src={birthdayCakeSVG}
            width={20}
            height={20}
            alt="birthday-cake"
          />
          remember
        </Title>
      </StyledLink>
    </Link>
  );
};

export { Logo };
