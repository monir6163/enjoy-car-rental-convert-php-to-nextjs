"use client";
import { Flex } from "@mantine/core";
import { useState } from "react";
import { initialCompanyDetails, IReqProviderProps } from "../../../../types";
import CompanyDetails from "./CompanyDetails";

export default function ProvidersAccountCreation() {
  const [page, setPage] = useState<number>(1);
  const [companyDetails, setCompanyDetails] = useState<
    Partial<IReqProviderProps>
  >(initialCompanyDetails);
  return (
    <Flex
      direction="column"
      mx="auto"
      px="xl"
      style={{
        maxWidth: "70%",
      }}
    >
      {page === 1 && (
        <CompanyDetails
          companyDetails={companyDetails}
          setCompanyDetails={setCompanyDetails}
          next={() => setPage(2)}
        />
      )}
      {page === 2 && (
        <div>
          <h1>Page 2</h1>
          <button onClick={() => setPage(1)}>Back</button>
        </div>
      )}
    </Flex>
  );
}
