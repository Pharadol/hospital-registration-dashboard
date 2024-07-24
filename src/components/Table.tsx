"use client";
import { useQuery } from "@tanstack/react-query";
import { Hospital } from "../model/Hospital";
import getHospitals from "../api/getHospoitals";

function Table() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hospitals"],
    queryFn: getHospitals,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div>
      <ul>
        {data?.map((item) => (
          <li key={item.code}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Table;
