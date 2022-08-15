import { useEffect, useState } from "react";
import * as Yup from "yup";
import yupFormatDate from "../utils/yupFormatDate";

interface Validations {
  [key: string]: any;
}

interface Config {
  inputTypes?: string[];
  defaultValue?: string;
  onChangeRevalidate?: boolean;
  onBlurValidate?: boolean;
  onBlurRevalidate?: boolean;
}

const validations: Validations = {
  required: Yup.string().trim().required("Campo obrigatório"),
  email: Yup.string()
    .trim()
    .email("Deve ser um email válido")
    .required("Campo obrigatório"),
  date: Yup.date()
    .transform(yupFormatDate)
    .typeError("Data inválida")
    .max(new Date(), "Data não pode ser maior que hoje")
    .required("Campo obrigatório"),
  time: Yup.string()
    .matches(
      /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d))$/,
      "O horário precisa estar no formato: HH:MM"
    )
    .required("Campo obrigatório"),
};

const useForm = <T extends HTMLElement>({
  inputTypes = [],
  defaultValue = "",
  onChangeRevalidate = false,
  onBlurValidate = false,
  onBlurRevalidate = false,
}: Config) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const validate = (inputValue: string) => {
    if (inputTypes.length === 0) return true;

    inputTypes.forEach((inputType) => {
      if (!validations[inputType]) return;
    });

    try {
      inputTypes.map((inputType) => {
        validations[inputType].validateSync(inputValue);
      });
      setError("");
      return true;
    } catch (err) {
      const error = err as Yup.ValidationError;
      setError(error.message);
      return false;
    }
  };

  const onChange = (event: React.ChangeEvent<T> | React.FormEvent<T>) => {
    let target = event.target as HTMLInputElement;
    setValue(target.value);
    if (onChangeRevalidate) {
      if (error) validate(target.value);
    }
  };

  const clearInput = () => {
    setValue(defaultValue);
    setError("");
  };

  return {
    value,
    setValue,
    error,
    setError,
    validate: () => validate(value),
    onBlur: () => {
      if (onBlurRevalidate && error) {
        validate(value);
      }

      if (onBlurValidate) {
        validate(value);
      }
    },
    onChange,
    clearInput,
  };
};

export { useForm };
