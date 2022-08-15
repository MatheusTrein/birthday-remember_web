import { AxiosError } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useContext, useMemo, useState } from "react";
import { BsCamera } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import { Avatar } from "../../components/Avatar";

import { Input } from "../../components/Form/Input";
import { Logo } from "../../components/Logo";
import { SpinnerLoad } from "../../components/SpinnerLaod";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { updateUser, useUser } from "../../hooks/useUser";
import { appColors } from "../../styles/appColors";

import {
  Content,
  ContentHeader,
  EditAvatarWrapper,
  FormButton,
  SelectPhotoButton,
  UserName,
} from "../../styles/pages/profile/edit/styles";
import { withSSRAuth } from "../../utils/withSSRAuth";

interface Image {
  raw: File;
  preview: string;
}

const Edit: NextPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const { request, loading } = useUser();

  const timezoneOffSet = useMemo(() => new Date().getTimezoneOffset(), []);

  const [image, setImage] = useState({} as Image);

  const firstName = useForm({
    inputTypes: ["required"],
    defaultValue: user.firstName,
    onChangeRevalidate: true,
    onBlurValidate: true,
    onBlurRevalidate: true,
  });
  const lastName = useForm({
    inputTypes: ["required"],
    defaultValue: user.lastName,
    onChangeRevalidate: true,
    onBlurValidate: true,
    onBlurRevalidate: true,
  });
  const oldPassword = useForm({
    inputTypes: [],
    onChangeRevalidate: true,
    onBlurValidate: true,
    onBlurRevalidate: true,
  });
  const newPassword = useForm({
    inputTypes: [],
    onChangeRevalidate: true,
    onBlurValidate: true,
    onBlurRevalidate: true,
  });

  const handleChangeImage = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const raw = target.files ? target.files[0] : null;
        if (!raw) throw new Error("test");
        const preview = URL.createObjectURL(raw);
        setImage({
          raw,
          preview,
        });
      } catch (error) {
        setImage({} as Image);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (newPassword.value && !oldPassword.value) {
        toast("Senha atual é necessária se quiser alterar sua senha");
        return;
      }

      if (oldPassword.value && newPassword.value === oldPassword.value) {
        toast("A sua nova senha não pode ser igual a senha atual", {
          type: "warning",
        });
        return;
      }

      const validations = [
        firstName.validate(),
        lastName.validate(),
        oldPassword.validate(),
        newPassword.validate(),
      ];

      if (validations.some((validation) => validation === false)) return;

      const data: any = {
        firstName: firstName.value,
        lastName: lastName.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        timezoneOffSet,
        avatar: image.raw,
      };

      Object.keys(data).forEach((key) => {
        if (!data[key]) delete data[key];
      });

      const body = new FormData();

      Object.keys(data).forEach((key) => {
        body.append(key, data[key]);
      });

      request({
        fn: updateUser,
        params: {
          body,
        },
      })
        .then((response) => {
          setUser(response.data);
          toast("Seus dados foram atualizados com sucesso!", {
            type: "success",
          });
        })
        .catch((err) => {
          const error = err as AxiosError;
          if (error.response?.data.type === "currentPassword.unmatch") {
            toast("Sua senha atual não está correta!", {
              type: "error",
            });
          } else {
            toast("Erro ao atualizar os dados do usuário!", {
              type: "error",
            });
          }
        });
    },
    [
      firstName,
      image.raw,
      lastName,
      newPassword,
      oldPassword,
      request,
      setUser,
      timezoneOffSet,
    ]
  );

  return (
    <>
      <Head>
        <title>Birthday Remember | Editar Perfil</title>
      </Head>
      <Content>
        <ContentHeader>
          <Link href="/birthdays" passHref>
            <a>
              <MdOutlineKeyboardArrowLeft size={30} color={appColors.gray} />
            </a>
          </Link>
          <Logo />
        </ContentHeader>
        <UserName>{user.name}</UserName>
        <form onSubmit={handleSubmit} className="animeLeft">
          <EditAvatarWrapper>
            <Avatar
              userName={user.name}
              src={image.preview ? image.preview : user.avatarUrl}
              alt={`avatar from ${user.name}`}
            />
            <SelectPhotoButton htmlFor="avatar">
              <BsCamera size={25} color="white" />
              <input
                id="avatar"
                accept="image/jpeg, image/png"
                type="file"
                onChange={handleChangeImage}
              />
            </SelectPhotoButton>
          </EditAvatarWrapper>
          <Input
            id="first-name"
            name="firstName"
            type="text"
            label="*Nome:"
            validated={!firstName.error && !!firstName.value}
            placeholder="Nome"
            {...firstName}
          />
          <Input
            id="last-name"
            name="lastName"
            type="text"
            label="*Sobrenome:"
            validated={!lastName.error && !!lastName.value}
            placeholder="Sobrenome"
            {...lastName}
          />
          <Input
            id="old-password"
            name="oldPassword"
            type="password"
            label="Senha Atual:"
            validated={!oldPassword.error && !!oldPassword.value}
            placeholder="Insira sua senha atual"
            {...oldPassword}
          />
          <Input
            id="new-password"
            name="newPassword"
            type="password"
            label="Senha Nova:"
            validated={!newPassword.error && !!newPassword.value}
            placeholder="Insira sua nova senha"
            {...newPassword}
          />

          <FormButton type="submit" disabled={loading}>
            {loading ? <SpinnerLoad /> : "Salvar"}
          </FormButton>
        </form>
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    return {
      props: {},
    };
  }
);

export default Edit;
