import { Column, StatusOption } from "../model/Table";

const columns: Column[] = [
  {
    key: "name",
    label: "ชื่อหน่วยงาน",
    align: "start",
  },
  {
    key: "code",
    label: "รหัสหน่วยงาน",
  },
  {
    key: "createDate",
    label: "วันที่ขึ้นทะเบียน",
  },
  {
    key: "verifyBy",
    label: "ชื่อผู้ตรวจสอบ",
  },
  {
    key: "verifyDate",
    label: "วันที่ตรวจสอบ",
  },
  {
    key: "status",
    label: "สถานะ",
  },
];

const statusOptions: StatusOption[] = [
  { key: "pendingVerification", value: "รอตรวจสอบ", color: "default" },
  { key: "verifying", value: "พิจารณาเอกสาร", color: "secondary" },
  { key: "registration", value: "ขึ้นทะเบียน", color: "success" },
  { key: "documentIssued", value: "ออกเอกสาร", color: "primary" },
  { key: "revision", value: "แก้ไข ครั้งที่", color: "danger" },
  { key: "replyToRevision", value: "ตอบกลับการแก้ไข", color: "warning" },
];

const itemsPerPageOptions: number[] = [5, 10, 15];

export { columns, statusOptions, itemsPerPageOptions };
