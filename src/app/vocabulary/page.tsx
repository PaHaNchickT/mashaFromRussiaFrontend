"use client";

import { useState } from "react";

import { VocabularyContent } from "@/components/Vocabulary/VocabularyContent";
import { useGetWordsQuery } from "@/store/slices/wordsApi";
import type { FilterWordState } from "@/types/wordsTypes";
import { Heading1 } from "@/UI/Text/Heading1";
import { Heading3 } from "@/UI/Text/Heading3";

const VocabularyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [easeFactor, setEaseFactor] = useState<FilterWordState>({
    dataIndex: "ease_factor",
    value: null,
  });

  const {
    data,
    isLoading: isWordsLoading,
    isSuccess: isWordsSuccess,
  } = useGetWordsQuery({
    qsearch: searchQuery,
    limit: 50,
    offset: 50 * (page - 1),
    ease_factor:
      easeFactor.value && +easeFactor.value >= -2
        ? +easeFactor.value
        : undefined,
    ease_factor_min: easeFactor.value === "-3" ? 1 : undefined,
    ease_factor_max: easeFactor.value === "-3" ? 5 : undefined,
  });

  // TODO: Loader
  return (
    <section className="h-full w-full flex flex-col gap-[3px] grow">
      <Heading1 color="primary">Контент.</Heading1>
      {isWordsLoading ? (
        <p>Loading...</p>
      ) : isWordsSuccess ? (
        <VocabularyContent
          responseData={data}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
          easeFactor={easeFactor}
          setEaseFactor={setEaseFactor}
        />
      ) : (
        <div className="grow flex justify-center items-center">
          <Heading3>Упс, что-то пошло не так.</Heading3>
        </div>
      )}
    </section>
  );
};

export default VocabularyPage;
