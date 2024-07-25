import React from "react";
import TableInfo from "../components/TableInfo";

function Home() {
  return (
    <div className="container max-w-[1200px] mx-auto py-12">
      <h1 className="text-2xl font-sem mb-4 font-noto-sans font-semibold">รายการขอขึ้นทะเบียน</h1>
      <TableInfo />
    </div>
  );
}

export default Home;
