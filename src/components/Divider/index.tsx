import { appColors } from "../../styles/appColors";
import { DividerWrapper } from "./styled";

interface DividerProps {
  axis: "x" | "y";
  gradient: boolean;
  stroke: string;
  color?: string;
  initialColor?: string;
  finalColor?: string;
}

const Divider: React.FC<DividerProps> = ({
  axis,
  gradient,
  stroke,
  color = appColors.pink,
  initialColor,
  finalColor,
}) => {
  if (!gradient && !color) {
    throw new Error("You need to specify color of gradient!");
  }

  return (
    <DividerWrapper
      axis={axis}
      gradient={gradient}
      color={color}
      finalColor={finalColor}
      initialColor={initialColor}
      stroke={stroke}
    />
  );
};

export { Divider };
