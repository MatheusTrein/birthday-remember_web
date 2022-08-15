import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { useCallback, useMemo } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";

import { Container } from "../components/Container";
import { Input } from "../components/Form/Input";
import { Logo } from "../components/Logo";
import { SpinnerLoad } from "../components/SpinnerLaod";
import { useForm } from "../hooks/useForm";
import { singUp, useUser } from "../hooks/useUser";
import { appColors } from "../styles/appColors";
import {
  ButtonSingUp,
  Content,
  Header,
  Title,
} from "../styles/pages/singup/styles";
import { withSSRGuest } from "../utils/withSSRGuest";

const SingUp: NextPage = () => {
  const { request, loading } = useUser();

  const timezoneOffSet = useMemo(() => new Date().getTimezoneOffset(), []);

  const email = useForm({
    inputTypes: ["email"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const password = useForm({
    inputTypes: ["required"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const passwordConfirmation = useForm({
    inputTypes: ["required"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const firstName = useForm({
    inputTypes: ["required"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const lastName = useForm({
    inputTypes: ["required"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      const validations = [email.validate(), password.validate(), password];

      const formIsInvalid = validations.some(
        (validation) => validation === false
      );

      if (formIsInvalid) return;

      if (password.value !== passwordConfirmation.value) {
        password.setError("As senhas não combinam");
        passwordConfirmation.setError("As senhas não combinam");

        return;
      }

      request({
        fn: singUp,
        params: {
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          lastName: lastName.value,
          timezoneOffSet,
        },
      })
        .then((response) => {
          email.clearInput();
          password.clearInput();
          passwordConfirmation.clearInput();
          firstName.clearInput();
          lastName.clearInput();
          toast(
            "Cadastro concluído com sucesso, você receberá um email para verificar a sua conta",
            { type: "success", autoClose: 5000 }
          );
          setTimeout(() => {
            Router.push("/");
          }, 5000);
        })
        .catch((error) => {
          toast("Erro ao fazer cadastro", { type: "error" });
        });
    },
    [
      email,
      firstName,
      lastName,
      password,
      passwordConfirmation,
      request,
      timezoneOffSet,
    ]
  );

  return (
    <>
      <Head>
        <title>Birthday Remember | Cadastre-se</title>
      </Head>
      <Container>
        <Header>
          <Link href="/" passHref>
            <a>
              <MdOutlineKeyboardArrowLeft size={30} color={appColors.gray} />
            </a>
          </Link>
          <Logo />
        </Header>
        <Content>
          <form onSubmit={handleSubmit}>
            <Title>Crie sua conta!</Title>
            <Input
              id="first-name"
              label="*Nome:"
              type="text"
              validated={!firstName.error && !!firstName.value}
              placeholder="Insira seu primeiro nome"
              {...firstName}
            />
            <Input
              id="last-name"
              label="*Sobrenome:"
              type="text"
              validated={!lastName.error && !!lastName.value}
              placeholder="Insira seu sobrenome"
              {...lastName}
            />
            <Input
              id="email"
              label="*Email:"
              type="text"
              validated={!email.error && !!email.value}
              placeholder="email@exemplo.com"
              {...email}
            />
            <Input
              id="password"
              label="*Senha:"
              type="password"
              validated={!password.error && !!password.value}
              placeholder="Insira sua senha"
              {...password}
            />
            <Input
              id="password-confirmation"
              label="*Confirme sua senha:"
              type="password"
              validated={
                !passwordConfirmation.error && !!passwordConfirmation.value
              }
              placeholder="Insira sua senha"
              {...passwordConfirmation}
            />
            <ButtonSingUp type="submit">
              {loading ? <SpinnerLoad /> : "Cadastrar"}
            </ButtonSingUp>
          </form>
        </Content>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (context) => {
    return {
      props: {},
    };
  }
);

export default SingUp;
