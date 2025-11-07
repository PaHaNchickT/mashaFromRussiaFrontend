"use client";

import { useRef, useState } from "react";
import { z } from "zod";

import {
  VOCABULARY_POPOVER_VALUES,
  VOCABULARY_TABLE_COLUMNS,
} from "@/constants/vocabularyConstants";
import type { ProgressBarHandle } from "@/types/commonTypes";
import type { FilterState, SortState, TableRow } from "@/types/tableTypes";
import Button from "@/UI/Buttons/Button";
import { SimpleForm, type SimpleFormFields } from "@/UI/Forms/SimpleForm";
import { SingleInputForm } from "@/UI/Forms/SingleInputForm";
import { Checkbox } from "@/UI/Inputs/Checkbox";
import { DailyLimitInput } from "@/UI/Inputs/DailyLimitInput";
import { Input } from "@/UI/Inputs/Input";
import { Modal } from "@/UI/Modals/Modal";
import { ProgressBar } from "@/UI/State/ProgressBar";
import { StateDots } from "@/UI/State/StateDots";
import { Table } from "@/UI/Table/Table";

const PlaygroundPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const progressRef = useRef<ProgressBarHandle>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortState, setSortState] = useState<SortState>({
    dataIndex: "word",
    order: null,
  });
  const [filterState, setFilterState] = useState<FilterState>({
    dataIndex: "ease_factor",
    value: null,
  });
  const [page, setPage] = useState<number>(1);

  const schema = z.object({
    email: z.email("Неверный email"),
    password: z.string().min(1, "Введите имя"),
  });

  const fields: SimpleFormFields[] = [
    {
      name: "email",
      label: "E-mail",
      placeholder: "введите email",
      type: "email",
    },
    {
      name: "password",
      label: "ПАРОЛЬ",
      placeholder: "введите пароль",
      type: "password",
    },
  ];

  const tableData = [
    {
      id: "1",
      word: "irk",
      translation: "раздражать",
      context: "It irks me when people talk too",
      synonyms: "annoy",
      ease_factor: 0,
    },
    {
      id: "2",
      word: "test",
      translation: null,
      context: null,
      synonyms: null,
      ease_factor: 0,
    },
    {
      id: "3",
      word: "irk",
      translation: "раздражать",
      context: "It irks me when people talk too",
      synonyms: "annoy",
      ease_factor: 0,
    },
    {
      id: "4",
      word: "test",
      translation: null,
      context: null,
      synonyms: null,
      ease_factor: 0,
    },
    {
      id: "5",
      word: "irk",
      translation: "раздражать",
      context: "It irks me when people talk too",
      synonyms: "annoy",
      ease_factor: 0,
    },
  ];

  return (
    <div className="w-full h-full self-start flex flex-col gap-10">
      <Input
        label="Как тебя зовут?"
        placeholder="введите имя"
        name="testInput"
      />
      <div className="flex gap-2">
        <Checkbox checked={isChecked} onChange={setIsChecked} label="Новое" />
        <Checkbox
          checked={isChecked}
          onChange={setIsChecked}
          classNameCheckbox="bg-[#a3a3a3]"
        />
      </div>
      <SingleInputForm
        label="Как тебя зовут?"
        placeholder="введите имя"
        name="name"
        onSubmit={(data) => console.log(data)}
      />
      <StateDots dotsCount={3} activeIndex={1} />
      <div className="flex flex-col gap-2">
        <ProgressBar ref={progressRef} isLabel />
        <div className="flex gap-2">
          <Button size="primary" onClick={() => progressRef.current?.start()}>
            Запустить
          </Button>
          <Button size="primary" onClick={() => progressRef.current?.finish()}>
            Завершить
          </Button>
          <Button size="primary" onClick={() => progressRef.current?.reset()}>
            Сбросить
          </Button>
        </div>
      </div>
      <div>
        <Button size="secondary" onClick={() => setIsModalOpen(true)}>
          Модалка
        </Button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          wrapperWidth="w-[637px]"
        >
          <div>
            <h2 className="text-xl font-bold mb-4">Привет!</h2>
            <p>Это содержимое модального окна.</p>
          </div>
        </Modal>
      </div>
      <SimpleForm
        fields={fields}
        schema={schema}
        onSubmit={(data) => console.log("Данные формы:", data)}
        submitLabel="Сохранить"
      />
      <DailyLimitInput onSubmit={(data) => console.log(data)} />
      <Table
        columns={VOCABULARY_TABLE_COLUMNS}
        data={tableData as unknown as TableRow[]}
        meta={{
          page: page,
          perPage: 5,
          total: 5,
          totalPages: 5,
        }}
        setPage={setPage}
        selectable
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        sortState={sortState}
        setSortState={setSortState}
        filterState={filterState}
        setFilterState={setFilterState}
        filterPopoverValues={VOCABULARY_POPOVER_VALUES}
        onRowClick={(row) => console.log(row)}
        isRowHoverable
      />
    </div>
  );
};

export default PlaygroundPage;
