"use client";

import { useState } from "react";

import {
  VOCABULARY_POPOVER_VALUES,
  VOCABULARY_TABLE_COLUMNS,
} from "@/constants/vocabularyConstants";
import type { FilterState, TableRow } from "@/types/tableTypes";
import type { FilterWordState, Word, WordsResponse } from "@/types/wordsTypes";
import { Input } from "@/UI/Inputs/Input";
import { DeleteConfirmModal } from "@/UI/Modals/DeleteConfirmModal";
import { ImportWordsModal } from "@/UI/Modals/ImportWordsModal";
import { NewWordModal } from "@/UI/Modals/NewWordModal";
import { Table } from "@/UI/Table/Table";
import { keyCreator } from "@/utils/keyCreator";

import { VocabularyWordModal } from "./VocabularyWordModal";
import { SpeechContext } from "../Common/SpeechContext";

type VocabularyContentProps = {
  responseData: WordsResponse;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setPage: (value: number) => void;
  easeFactor: FilterWordState;
  setEaseFactor: (value: FilterWordState) => void;
};

export const VocabularyContent = ({
  responseData,
  searchQuery,
  setSearchQuery,
  setPage,
  easeFactor,
  setEaseFactor,
}: VocabularyContentProps) => {
  const { data, meta } = responseData;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWordData, setCurrentWordData] = useState<Word | null>(null);

  const handleRowClick = (data: TableRow) => {
    setCurrentWordData(data as unknown as Word);
    setIsModalOpen(true);
  };

  return (
    <SpeechContext>
      {({ isSpeaking, speak }) => (
        <div className="flex flex-col gap-[30px]">
          <div className="flex justify-between items-center">
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              label="Поиск"
              placeholder="введите слово или фразу"
              name="qsearch"
              classNameWrapper="gap-[6px]"
              classNameLabel="text-[20px]"
              classNameInput="w-[340px] pl placeholder:text-[20px]"
            />
            <div className="flex gap-[9px]">
              <ImportWordsModal />
              <NewWordModal />
              <DeleteConfirmModal
                ids={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            </div>
          </div>
          <Table
            columns={VOCABULARY_TABLE_COLUMNS}
            data={keyCreator(data, "word_id") as unknown as TableRow[]}
            meta={meta}
            setPage={setPage}
            selectable
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onRowClick={handleRowClick}
            filterState={easeFactor as FilterState}
            setFilterState={setEaseFactor as (value: FilterState) => void}
            filterPopoverValues={VOCABULARY_POPOVER_VALUES}
            isRowHoverable
            classNameHeader="text-[17px]"
          />
          {isModalOpen && currentWordData && (
            <VocabularyWordModal
              wordData={currentWordData}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              isSpeaking={isSpeaking}
              speak={speak}
            />
          )}
        </div>
      )}
    </SpeechContext>
  );
};
