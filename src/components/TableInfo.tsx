"use client";
import getHospitals from "../api/getHospoitals";
import "@/src/styles/componetns/table.css";
import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Hospital } from "../model/Hospital";
import { GoChevronDown } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { Column, StatusOption } from "../model/Table";
import { columns, statusOptions, itemsPerPageOptions } from "../config/table";
import Loading from "./Loading";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  Button,
  Pagination,
} from "@nextui-org/react";

function TableInfo() {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(itemsPerPageOptions[1]);
  const [page, setPage] = useState<number>(1);
  const hasSearchFilter = Boolean(search);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hospitals"],
    queryFn: getHospitals,
  });

  const filteredItems = useMemo(() => {
    if (!data) return [];
    let filterHospitals = [...data];

    if (hasSearchFilter) {
      const searchText = search.toLowerCase().trim();
      filterHospitals = filterHospitals.filter((hospital) => {
        const matchName = hospital.name
          .toLowerCase()
          .trim()
          .includes(searchText);
        const matchCode = hospital.code.toString().includes(searchText);
        const matchVerifyBy = hospital.verifyBy
          .toLowerCase()
          .trim()
          .includes(searchText);
        return matchName || matchCode || matchVerifyBy;
      });
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filterHospitals = filterHospitals.filter((hospital) =>
        Array.from(statusFilter).some((status) =>
          hospital.status.startsWith(status.toString())
        )
      );
    }
    return filterHospitals;
  }, [data, search, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setSearch(value);
      setPage(1);
    } else {
      setSearch("");
    }
  }, []);

  const onClear = useCallback(() => {
    setSearch("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-y-4 font-noto-sans-looped">
        <div id="top-content-left" className="flex gap-x-2">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] !text-base font-noto-sans-looped"
            radius="sm"
            placeholder="ค้นหาด้วย ชื่อ / รหัส / ผู้ตรวจสอบ..."
            startContent={<CiSearch />}
            value={search}
            type="text"
            onClear={onClear}
            onValueChange={setSearch}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button
                endContent={<GoChevronDown className="text-small" />}
                variant="flat"
                radius="sm"
              >
                สถานะ
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              closeOnSelect={false}
              selectionMode="multiple"
              selectedKeys={statusFilter}
              onSelectionChange={setStatusFilter}
              className="font-noto-sans-looped"
            >
              {statusOptions.map((option: StatusOption) => (
                <DropdownItem key={option.value}>{option.value}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div
          id="top-content-right"
          className="flex justify-between items-center"
        >
          <span className="text-default-400 text-small">
            ทั้งหมด {filteredItems.length} รายการ
          </span>
          <label className="flex items-center text-default-400 text-small">
            จำนวน ต่อหน้า:
            <select
              className="bg-transparent outline-none text-default-400 text-small hover:cursor-pointer"
              onChange={onRowsPerPageChange}
              defaultValue={rowsPerPage}
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option} className="cursor-pointer">
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    search,
    statusFilter,
    onSearchChange,
    onRowsPerPageChange,
    filteredItems.length,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
            className="text-sm font-noto-sans-looped"
          >
            ก่อนหน้า
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
            className="text-sm font-noto-sans-looped"
          >
            ถัดไป
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  const mapChips = (value: string) => {
    const status = statusOptions.find((status) =>
      value.startsWith(status.value)
    );
    if (status) {
      return (
        <Chip size="sm" variant="flat" color={status.color} className="chip">
          {value}
        </Chip>
      );
    }
    return (
      <Chip size="sm" variant="flat" className="chip">
        {value}
      </Chip>
    );
  };

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container border-[1px] rounded-lg shadow-md p-4 table">
      <Table
        aria-label="Registration Hospital Table"
        topContentPlacement="outside"
        topContent={topContent}
        bottomContent={bottomContent}
        removeWrapper
      >
        <TableHeader className="!text-xl">
          {columns.map((column: Column) => (
            <TableColumn
              align={`${column.align ? column.align : "center"}`}
              key={column.key}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={"ไม่พบข้อมูล"}
          isLoading={isLoading}
          loadingContent={<Loading />}
          style={{ minHeight: "300px" }}
        >
          {items.map((row: Hospital) => (
            <TableRow key={row.code}>
              <TableCell>
                <div>{row.name}</div>
              </TableCell>
              <TableCell>
                <div>{row.code}</div>
              </TableCell>
              <TableCell>
                <div>{row.createDate}</div>
              </TableCell>
              <TableCell>
                <div>{row.verifyBy}</div>
              </TableCell>
              <TableCell>
                <div>{row.verifyDate}</div>
              </TableCell>
              <TableCell>{mapChips(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableInfo;
