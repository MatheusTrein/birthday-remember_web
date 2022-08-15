import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { useCallback } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";

import { Container } from "../../components/Container";
import { Input } from "../../components/Form/Input";
import { Logo } from "../../components/Logo";
import { SpinnerLoad } from "../../components/SpinnerLaod";

import { useAxios } from "../../hooks/useAxios";
import { useForm } from "../../hooks/useForm";
import { forgotPasswordUser } from "../../hooks/useUser";
import { appColors } from "../../styles/appColors";
import {
  Button,
  Content,
  Header,
  Title,
} from "../../styles/pages/password/forgot/styles";
import { withSSRGuest } from "../../utils/withSSRGuest";

const Forgot: NextPage = () => {
  const { request, loading } = useAxios(null);

  const email = useForm({
    inputTypes: ["email"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (!email.validate()) return;

      request({
        fn: forgotPasswordUser,
        params: {
          email: email.value,
        },
      })
        .then((response) => {
          toast(
            "Um email foi enviado para você com as instruções de recuperação de senha.",
            { type: "success", autoClose: 10000 }
          );
          Router.push("/");
        })
        .catch((error) => {
          toast(
            "Email não cadastrado, você está sendo redirecionado fazer o cadastro.",
            { type: "warning", autoClose: 7000 }
          );
          setTimeout(() => {
            Router.push("/singup");
          }, 7000);
        });
    },
    [email, request]
  );

  return (
    <>
      <Head>
        <title>Birthday Remember | Esqueci minha senha</title>
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
            <Title>Insira seu email para recuperar sua senha.</Title>
            <Input
              id="email"
              label="*Email:"
              type="email"
              validated={!email.error && !!email.value}
              placeholder="email@example.com"
              {...email}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <SpinnerLoad /> : "Recuperar"}
            </Button>
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

export default Forgot;
