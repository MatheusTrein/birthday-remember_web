import { AxiosError } from "axios";
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
import { ResetPasswordUser } from "../../hooks/useUser";
import { appColors } from "../../styles/appColors";
import {
  Button,
  Content,
  Header,
  Title,
} from "../../styles/pages/password/reset/styles";
import { withSSRGuest } from "../../utils/withSSRGuest";

interface ResetProps {
  token: string;
}

const Reset: NextPage<ResetProps> = ({ token: resetPasswordToken }) => {
  const { request, loading } = useAxios(null);

  const newPassword = useForm({
    inputTypes: ["required"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const newPasswordConfirmation = useForm({
    inputTypes: ["required"],
    onBlurRevalidate: true,
    onBlurValidate: true,
    onChangeRevalidate: true,
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      const validations = [
        newPassword.validate(),
        newPasswordConfirmation.validate(),
      ];

      const formIsInvalid = validations.some(
        (validation) => validation === false
      );

      if (formIsInvalid) return;

      if (newPassword.value !== newPasswordConfirmation.value) {
        toast("As senhas não combinam!", { type: "error" });
        return;
      }

      newPassword.clearInput();
      newPasswordConfirmation.clearInput();

      request({
        fn: ResetPasswordUser,
        params: {
          password: newPassword.value,
          queryStrings: {
            token: String(resetPasswordToken),
          },
        },
      })
        .then((response) => {
          toast(
            "Sua senha foi alterada com sucesso! Você sera redirecionado para fazer seu login!",
            { type: "success", autoClose: 10000 }
          );
          setTimeout(() => {
            Router.push("/");
          }, 10000);
        })
        .catch((err) => {
          const error = err as AxiosError;
          if (error.response?.data.type === "forgotPasswordToken.invalid") {
            toast(
              "Token inválido, você está sendo redirecionado para fazer o cadastro",
              { type: "error" }
            );
            setTimeout(() => {
              Router.push("/singup");
            }, 5000);
          } else {
            toast("Erro ao resetar a senha", {
              type: "error",
              autoClose: 5000,
            });
          }
        });
    },
    [newPassword, newPasswordConfirmation, request, resetPasswordToken]
  );

  return (
    <>
      <Head>
        <title>Birthday Remember | Resete sua senha</title>
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
            <Title>Resete sua senha!</Title>
            <Input
              id="password"
              label="*Nova Senha:"
              type="password"
              validated={!newPassword.error && !!newPassword.value}
              placeholder="Insira sua nova senha"
              {...newPassword}
            />
            <Input
              id="password-confirmation"
              label="*Confirmação de senha:"
              type="password"
              validated={
                !newPasswordConfirmation.error &&
                !!newPasswordConfirmation.value
              }
              placeholder="Insira sua nova senha novamente"
              {...newPasswordConfirmation}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <SpinnerLoad /> : "Resetar"}
            </Button>
          </form>
        </Content>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRGuest<ResetProps>(
  async (context) => {
    const queryStrings = context.query;

    const token = queryStrings.token as string;

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        token,
      },
    };
  }
);

export default Reset;
