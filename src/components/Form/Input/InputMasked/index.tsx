import { InputHTMLAttributes } from "react";
import InputMask from "react-input-mask";

interface InputMaskedProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  mask?: string | (string | RegExp)[];
  validate?: any;
  clearInput?: any;
  setError?: any;
  setValue?: any;
  validated?: any;
  isErrored?: any;
}

const InputMasked: React.FC<InputMaskedProps> = ({
  className,
  mask,
  clearInput,
  setError,
  setValue,
  validate,
  isErrored,
  validated,
  ...rest
}) => {
  if (mask) {
    return <InputMask mask={mask} className={className} {...rest} />;
  }

  return <input className={className} {...rest} />;
};

export { InputMasked };
