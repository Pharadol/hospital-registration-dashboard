import { ChipProps } from "@nextui-org/react";

interface Column {
  key: string;
  label: string;
  align?: "start" | "center" | "end";
}

interface StatusOption {
  key: string;
  value: string;
  color: ChipProps["color"];
}

export type { Column, StatusOption };
