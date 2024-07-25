import { Spinner } from "@nextui-org/react";

function Loading() {
  return (
    <div>
      <Spinner className="mt-36" label="กำลังโหลดข้อมูล..." />
    </div>
  );
}

export default Loading;
