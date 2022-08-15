import { ButtonHTMLAttributes, useCallback } from "react";

import { Page } from "./styles";

interface PaginationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  isCurrent,
  number,
  onPageChange,
  ...rest
}) => {
  const handlePageChange = useCallback(() => {
    onPageChange(number);
  }, [number, onPageChange]);

  return (
    <Page
      onClick={handlePageChange}
      isCurrent={isCurrent}
      disabled={isCurrent}
      {...rest}
    >
      {number}
    </Page>
  );
};

export { PaginationItem };
