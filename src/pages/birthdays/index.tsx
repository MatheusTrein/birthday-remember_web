import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { toast } from "react-toastify";
import { BirthdayItem } from "../../components/Birthday/BirthdayItem";
import { ModalAddBirthday } from "../../components/Birthday/ModalAddBirthday";
import { ModalConfirmDelete } from "../../components/Birthday/ModalConfirmDelete";
import { ModalEditBirthday } from "../../components/Birthday/ModalEditBirthday";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SpinnerLoad } from "../../components/SpinnerLaod";
import {
  Birthday,
  CreateBirthday,
  deleteBirthday,
  disableReminderBirthday,
  enableReminderBirthday,
  getBirthdays,
  postBirthday,
  updateBirthday,
  useBirthdays,
} from "../../hooks/useBirthdays";
import { useDidUpdateEffect } from "../../hooks/useDidUpdateEffect";
import {
  ButtonAddBirthday,
  Content,
} from "../../styles/pages/birthdays/styles";
import { parseStringToDate } from "../../utils/parseStringToDate";
import { withSSRAuth } from "../../utils/withSSRAuth";

interface BirthdaysProps {
  registerPerPage: number;
  initialTotalCount: number;
  initialBirthdays: Birthday[];
}

const Birthdays: NextPage<BirthdaysProps> = ({
  initialBirthdays,
  registerPerPage,
  initialTotalCount,
}) => {
  const {
    request,
    loading: loadingBirthdays,
    data: birthdays,
    setData: setBirthdays,
  } = useBirthdays(initialBirthdays);
  const [modalAddBirthdayIsOpen, setModalAddBirthdayIsOpen] = useState(false);
  const [birthdayEditing, setBirthdayEditing] = useState({} as Birthday);
  const [modalEditBirthdayIsOpen, setModalEditBirthdayIsOpen] = useState(false);
  const [birthdayDeleting, setBirthdayDeleting] = useState({} as Birthday);
  const [modalConfirmDeleteIsOpen, setModalConfirmDeleteIsOpen] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  useDidUpdateEffect(() => {
    const fetchData = async () => {
      try {
        await request({
          fn: getBirthdays,
          params: {
            params: {
              page: currentPage,
              perPage: registerPerPage,
            },
          },
        });
      } catch (error) {}
    };
    fetchData();
  }, [currentPage]);

  const handleToggleModalAddBirthday = useCallback(() => {
    setModalAddBirthdayIsOpen(!modalAddBirthdayIsOpen);
  }, [modalAddBirthdayIsOpen]);

  const handleToggleModalEditBirthday = useCallback(() => {
    setModalEditBirthdayIsOpen(!modalEditBirthdayIsOpen);
  }, [modalEditBirthdayIsOpen]);

  const handleEditingBirthday = useCallback((birthday: Birthday) => {
    setModalEditBirthdayIsOpen(true);
    setBirthdayEditing(birthday);
  }, []);

  const handleToggleModalConfirmDeleteIsOpen = useCallback(() => {
    setModalConfirmDeleteIsOpen(!modalConfirmDeleteIsOpen);
  }, [modalConfirmDeleteIsOpen]);

  const handleDeletingBirthday = useCallback((birthday: Birthday) => {
    setModalConfirmDeleteIsOpen(true);
    setBirthdayDeleting(birthday);
  }, []);

  const handleEnableReminderBirthday = useCallback(
    async (data: Birthday) => {
      try {
        const enableBirthdayResponse = await enableReminderBirthday({
          birthdayId: data.id,
        });
        const enabledBirthday = enableBirthdayResponse.data as Birthday;
        setBirthdays(
          birthdays.map((birthday) =>
            birthday.id === data.id ? enabledBirthday : birthday
          )
        );
        toast(
          "Lembrete reativado com sucesso! Você vai voltar a receber o lembrete de aniversário por email",
          { type: "success", autoClose: 7000 }
        );
      } catch (error) {
        toast("Erro ao ativar o lembrete!", { type: "error" });
      }
    },
    [birthdays, setBirthdays]
  );

  const handleDisableBirthdayReminder = useCallback(
    async (data: Birthday) => {
      try {
        const disableBirthdayResponse = await disableReminderBirthday({
          birthdayId: data.id,
        });

        const disabledBirthday = disableBirthdayResponse.data as Birthday;

        setBirthdays(
          birthdays.map((birthday) =>
            birthday.id === data.id ? disabledBirthday : birthday
          )
        );

        toast(
          "Lembrete desativado com sucesso! Você não rebera mais o lembrete de aniversário por email",
          { type: "success", autoClose: 7000 }
        );
      } catch (error) {
        toast("Erro ao desativar o lembrete!", { type: "error" });
      }
    },

    [birthdays, setBirthdays]
  );

  const handleAddBirthday = useCallback(
    async (birthday: CreateBirthday) => {
      try {
        const response = await postBirthday({
          data: {
            alarmTime: birthday.alarmTime,
            name: birthday.name,
            birthDate: birthday.birthDate,
          },
        });
        const updateBirthdayList = [...birthdays];

        if (currentPage !== 1) {
          setCurrentPage(1);
        } else if (birthdays.length === registerPerPage) {
          updateBirthdayList.pop();
        }

        setBirthdays([response.data, ...updateBirthdayList]);
        setTotalCount(totalCount + 1);
        setModalAddBirthdayIsOpen(false);
        toast("Aniversário cadastrado com sucesso!", { type: "success" });
      } catch (error) {
        toast("Erro ao cadastrar aniversário.", { type: "error" });
      }
    },
    [birthdays, currentPage, registerPerPage, setBirthdays, totalCount]
  );

  const handleUpdateBirthday = useCallback(
    async (updatedBirthday: Birthday) => {
      try {
        await updateBirthday({
          birthdayId: updatedBirthday.id,
          data: {
            alarmTime: updatedBirthday.alarmTime,
            birthDate: parseStringToDate(updatedBirthday.birthDate),
            name: updatedBirthday.name,
          },
        });

        setBirthdays(
          birthdays.map((birthday) =>
            birthday.id === updatedBirthday.id ? updatedBirthday : birthday
          )
        );
        setModalEditBirthdayIsOpen(false);
        toast("Aniverário atualizado com sucesso!", { type: "success" });
      } catch (error) {
        toast("Erro ao atualizar aniversário.", { type: "error" });
      }
    },
    [birthdays, setBirthdays]
  );

  const handleDeleteBirthday = useCallback(
    async (birthdayId: string) => {
      try {
        await deleteBirthday({ birthdayId });

        if (birthdays.length === 1 && currentPage !== 1) {
          setCurrentPage(currentPage - 1);
        } else {
          request({
            fn: getBirthdays,
            params: {
              params: {
                page: currentPage,
                perPage: registerPerPage,
              },
            },
          });
        }

        setTotalCount(totalCount - 1);
        setModalConfirmDeleteIsOpen(false);

        toast("Aniversário removido com sucesso!", { type: "success" });
      } catch (error) {
        toast("Erro ao remover aniversário.", { type: "error" });
      }
    },
    [birthdays.length, currentPage, registerPerPage, request, totalCount]
  );

  return (
    <>
      <Head>
        <title>Birthday Remember | Aniverários</title>
      </Head>
      <ModalAddBirthday
        isOpen={modalAddBirthdayIsOpen}
        handleToggleModal={handleToggleModalAddBirthday}
        handleAddBirthday={handleAddBirthday}
      />
      <ModalEditBirthday
        isOpen={modalEditBirthdayIsOpen}
        handleToggleModal={handleToggleModalEditBirthday}
        birthday={birthdayEditing}
        handleUpdateBirthday={handleUpdateBirthday}
      />
      <ModalConfirmDelete
        isOpen={modalConfirmDeleteIsOpen}
        handleToggleModal={handleToggleModalConfirmDeleteIsOpen}
        onConfirm={handleDeleteBirthday}
        birthday={birthdayDeleting}
      />
      <Header />
      <Content className="animeLeft">
        <ButtonAddBirthday onClick={handleToggleModalAddBirthday}>
          <AiOutlinePlus size={30} color="white" />
        </ButtonAddBirthday>
        {loadingBirthdays && <SpinnerLoad />}
        {birthdays.map((birthday) => (
          <BirthdayItem
            key={birthday.id}
            birthday={birthday}
            handleEditingBirthday={handleEditingBirthday}
            handleDeletingBirthday={handleDeletingBirthday}
            handleEnableReminderBirthday={handleEnableReminderBirthday}
            handleDisableBirthdayReminder={handleDisableBirthdayReminder}
          />
        ))}
        {birthdays.length > 0 && (
          <Pagination
            currentPage={currentPage}
            registerPerPage={registerPerPage}
            onPageChange={setCurrentPage}
            totalCountOfPages={totalCount}
          />
        )}
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    const registerPerPage = 5;

    const response = await getBirthdays({
      context,
      params: { perPage: registerPerPage, page: 1 },
    });

    const initialBirthdays = response?.data;
    const initialTotalCount = response?.headers["x-total-count"];

    return {
      props: {
        initialBirthdays,
        registerPerPage,
        initialTotalCount: Number(initialTotalCount),
      },
    };
  }
);

export default Birthdays;
