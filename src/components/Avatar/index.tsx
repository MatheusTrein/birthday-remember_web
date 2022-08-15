import { AvatarImage, AvatarWrapper } from "./styles";

interface AvatarProps {
  src?: string;
  alt: string;
  userName: string;
}

const Avatar: React.FC<AvatarProps> = ({ alt, src, userName }) => {
  return (
    <AvatarWrapper>
      <AvatarImage name={userName} maxInitials={4} src={src} alt={alt} />
    </AvatarWrapper>
  );
};

export { Avatar };
