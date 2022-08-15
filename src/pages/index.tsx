import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useCallback, useContext, useState } from "react";

import { Container } from "../components/Container";
import { Input } from "../components/Form/Input";
import { Logo } from "../components/Logo";
import { SpinnerLoad } from "../components/SpinnerLaod";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from "../hooks/useForm";
import {
  ButtonSingIn,
  Content,
  SingOptions,
  Title,
  Welcome,
} from "../styles/pages/login/styles";
import { withSSRGuest } from "../utils/withSSRGuest";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const { singIn } = useContext(AuthContext);

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

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const validations = [email.validate(), password.validate()];

      const formIsInvalid = validations.some(
        (validation) => validation === false
      );

      if (formIsInvalid) return;

      setLoading(true);

      await singIn({
        email: email.value,
        password: password.value,
      });

      setLoading(false);
    },
    [email, password, singIn]
  );

  return (
    <>
      <Head>
        <title>Birthday Remember | Login</title>
      </Head>
      <Container>
        <Content>
          <Logo />
          <Welcome>
            Seja bem vindo ao Birthday Remember, uma plataforma que ajuda você a
            lembrar de felicitar os seus entes queridos através de um lembrete
            por email
          </Welcome>
          <form onSubmit={handleSubmit}>
            <Title>Faça seu login!</Title>
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
            <SingOptions>
              <Link href="/password/forgot">Esqueceu sua senha?</Link>
              <Link href="/singup">Crie uma conta</Link>
            </SingOptions>
            <ButtonSingIn disabled={loading} type="submit">
              {loading ? <SpinnerLoad /> : "Entrar"}
            </ButtonSingIn>
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

export default Home;
