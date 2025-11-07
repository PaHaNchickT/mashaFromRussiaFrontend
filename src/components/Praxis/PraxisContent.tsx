import { useRouter } from "next/navigation";
import NProgress from "nprogress";

import { PRAXIS_TABLE_COLUMNS } from "@/constants/praxisConstants";
import type { Praxis, PraxisResponse } from "@/types/praxisTypes";
import type { TableRow } from "@/types/tableTypes";
import { Table } from "@/UI/Table/Table";
import { praxisTableBuilder } from "@/utils/praxisTableBuilder";

type PraxisContentProps = {
  praxisResponse: PraxisResponse;
};

export const PraxisContent = ({ praxisResponse }: PraxisContentProps) => {
  const router = useRouter();
  const { data } = praxisResponse;

  const handleCellClick = (rowData: TableRow, columnName?: string) => {
    if (columnName === "vocabulary") {
      const praxisData = rowData.vocabularyData as unknown as Praxis;

      NProgress.start();
      router.push(`practice/${praxisData.praxis_id}`);
    }
  };

  return (
    <Table
      columns={PRAXIS_TABLE_COLUMNS}
      data={praxisTableBuilder(data) as unknown as TableRow[]}
      onCellClick={handleCellClick}
      classNameTable="text-[30px]"
    />
  );
};
