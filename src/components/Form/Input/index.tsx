import { InputHTMLAttributes } from "react";
import { Error, Label, StyledInput } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  validated: boolean;
  error: string;
  mask?: string | (string | RegExp)[];
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  validated,
  error,
  mask = undefined,
  ...rest
}) => {
  return (
    <Label htmlFor={id}>
      {label && `${label}`}
      <StyledInput
        id={id}
        mask={mask}
        validated={validated}
        isErrored={!!error}
        autoComplete="off"
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </Label>
  );
};

export { Input };
