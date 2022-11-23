import { Alert, AlertIcon, Text } from "@chakra-ui/react";
import React from "react";
import SearchCard from "../components/Search";
import Success from "../components/Success";
import { useToast } from "@chakra-ui/react";

const Home = ({
  searchUrl,
  setSearchUrl,
  dataFetched,
  setDataFetched,
  searchFound,
  setSearchFound,
  setShowLoader,
}) => {
  const toast = useToast();
  return (
    <>
      <SearchCard
        searchUrl={searchUrl}
        setSearchUrl={setSearchUrl}
        dataFetched={dataFetched}
        setDataFetched={setDataFetched}
        searchFound={searchFound}
        setSearchFound={setSearchFound}
        setShowLoader={setShowLoader}
      />

      {searchFound && dataFetched ? (
        <Success
          xss={dataFetched.xss}
          sqli={dataFetched.sqli}
          sub_domain={dataFetched.sub_domain}
        />
      ) : null}
    </>
  );
};

export default Home;
