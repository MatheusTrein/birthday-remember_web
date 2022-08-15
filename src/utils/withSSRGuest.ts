import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export const withSSRGuest = <P>(fn: GetServerSideProps<P>) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);

    if (cookies["birthdayremember.token"]) {
      return {
        redirect: {
          destination: "/birthdays",
          permanent: false,
        },
      };
    }

    return await fn(context);
  };
};
