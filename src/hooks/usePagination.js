import { useState } from "react";

const usePagination = () => {
  const [pagination, setPagination] = useState(1);
  const nextPage = (total) => {
    const maxPage = Math.floor(total / 20);
    if (pagination + 1 <= maxPage) {
      setPagination(pagination + 1);
    } else setPagination(maxPage);
  };
  const prevPage = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    } else setPagination(1);
  };
  return { nextPage, pagination, prevPage, setPagination };
};

export default usePagination;
