import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";

import { Container } from "../../components/Container";
import { Logo } from "../../components/Logo";
import {
  BoxVerificationStatus,
  Content,
  Text,
} from "../../styles/pages/users/verify/styles";
import { withSSRGuest } from "../../utils/withSSRGuest";
import { MdVerifiedUser, MdError } from "react-icons/md";
import { appColors } from "../../styles/appColors";
import { useAxios } from "../../hooks/useAxios";
import { User, verifyUser } from "../../hooks/useUser";
import { SpinnerLoad } from "../../components/SpinnerLaod";

const Verify: NextPage = () => {
  const { request, loading, data } = useAxios<User>(null);
  const [errorType, setErrorType] = useState("");

  const router = useRouter();

  const { token } = router.query;

  useEffect(() => {
    request({
      fn: verifyUser,
      params: {
        params: {
          token: token as string,
        },
      },
    })
      .then((response) => {
        toast(
          "Usuário verificado com sucesso, você está sendo redirecionado para o login",
          { type: "success", autoClose: 5000 }
        );
        setTimeout(() => {
          Router.push("/");
        }, 5000);
      })
      .catch((error) => {
        if (error.response.data?.type === "verification.true") {
          setErrorType(error.response.data?.type);
          toast(
            "Usuário já foi verificado, você está sendo redirecionado para o login",
            { type: "success", autoClose: 5000 }
          );
          setTimeout(() => {
            Router.push("/");
          }, 5000);
        } else if (error.response.data?.type === "verification.failed") {
          setErrorType(error.response.data?.type);
          toast(
            "Token inválido! Você está sendo redirecionado para a pagina de cadastro!",
            { type: "error", autoClose: 5000 }
          );
          setTimeout(() => {
            Router.push("/singup");
          }, 5000);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Birthday Remember | Verifique sua conta</title>
      </Head>
      <Container>
        <Content>
          <Logo />

          {loading && <SpinnerLoad />}

          {(errorType === "verification.true" || !!data) && (
            <BoxVerificationStatus success={true}>
              <MdVerifiedUser size={60} color={appColors.green} />
              <Text>Usuário verificado!</Text>
            </BoxVerificationStatus>
          )}
          {errorType === "verification.failed" && (
            <BoxVerificationStatus success={false}>
              <MdError size={60} color={appColors.red} />
              <Text>Falha ao verificar usuário!</Text>
            </BoxVerificationStatus>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Verify;

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (context) => {
    return {
      props: {},
    };
  }
);
