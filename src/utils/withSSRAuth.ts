import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import nookies from "nookies";
import { AuthTokenError } from "../errors/AuthTokenError";

export const withSSRAuth = <P>(fn: GetServerSideProps<P>) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = nookies.get(context);

    if (!cookies["birthdayremember.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await fn(context);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        nookies.destroy(context, "birthdayremember.token");
        nookies.destroy(context, "birthdayremember.refreshToken");

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      } else {
        return {
          props: {} as P,
        };
      }
    }
  };
};
