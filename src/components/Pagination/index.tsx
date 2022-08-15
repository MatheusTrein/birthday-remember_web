import { PaginationItem } from "./PaginationItem";
import {
  InfoPagesWrapper,
  PaginationWrapper,
  SelectPagesWrapper,
} from "./styles";

interface PaginationProps {
  totalCountOfPages: number;
  registerPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
};

const sibilinsCount = 1;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  registerPerPage,
  totalCountOfPages,
}) => {
  const lastPage = Math.ceil(totalCountOfPages / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - sibilinsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + sibilinsCount, lastPage)
        )
      : [];

  return (
    <PaginationWrapper>
      <InfoPagesWrapper>
        Mostrando {currentPage * registerPerPage - (registerPerPage - 1)} -{" "}
        {currentPage * registerPerPage > totalCountOfPages
          ? totalCountOfPages
          : currentPage * registerPerPage}
      </InfoPagesWrapper>

      <SelectPagesWrapper>
        {currentPage > 1 + sibilinsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + sibilinsCount && <span>...</span>}
          </>
        )}
        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem
                key={page}
                onPageChange={onPageChange}
                number={page}
              />
            );
          })}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                key={page}
                onPageChange={onPageChange}
                number={page}
              />
            );
          })}

        {currentPage + sibilinsCount < lastPage && (
          <>
            {currentPage + 1 + sibilinsCount < lastPage && <span>...</span>}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </SelectPagesWrapper>
    </PaginationWrapper>
  );
};

export { Pagination };
