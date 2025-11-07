type PaginationThreeDotsProps = {
  onClick: () => void;
};

export const PaginationThreeDots = ({ onClick }: PaginationThreeDotsProps) => {
  return (
    <button
      onClick={onClick}
      className="leading-[normal] hover:text-[#EF18C4] cursor-pointer"
    >
      ...
    </button>
  );
};
