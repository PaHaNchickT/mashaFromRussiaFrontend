import type { TableColumn } from "@/types/tableTypes";
import { ArrowRightIcon } from "@/UI/Icons/ArrowRightIcon";

export const PRAXIS_TABLE_COLUMNS: TableColumn[] = [
  {
    title: "Vocabulary",
    dataIndex: "vocabulary",
    key: "vocabulary",
    classNameHeader: "w-[279px] pl-[32px]",
    className: "w-[279px]",
    render: (value: string) => (
      <div className="flex gap-[10px] items-center cursor-pointer hover:bg-[#fef3fc] hover:font-bold pl-[16px] pt-[12px] pr-[21px] pb-[18px] leading-[normal] rounded-[12px]">
        {value}
        <ArrowRightIcon />
      </div>
    ),
  },
  {
    title: "Listening",
    dataIndex: "listening",
    key: "listening",
    render: (value: string) => value,
    className: "text-[#dbdbdb] cursor-not-allowed",
  },
  {
    title: "Writing",
    dataIndex: "writing",
    key: "writing",
    render: (value: string) => value,
    className: "text-[#dbdbdb] cursor-not-allowed",
  },
  {
    title: "Speaking",
    dataIndex: "speaking",
    key: "speaking",
    render: (value: string) => value,
    className: "text-[#dbdbdb] cursor-not-allowed",
  },
];
