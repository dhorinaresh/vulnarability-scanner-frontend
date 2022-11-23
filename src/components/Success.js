import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import MappingData from "./MappingData";
import React from "react";

export default function Success({ xss, sqli, sub_domain }) {
  // const dataMapping = () => {

  // }
  let c = 0;
  console.log(xss);
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Results Obtained
      </Heading>
      <Heading as="h5" size="l" mt={6} mb={2}>
        Cross Site Scripting
      </Heading>
      {React.Children.toArray(xss.map((item, i) => <Text>{item}</Text>))}
      <Heading as="h5" size="l" mt={6} mb={2}>
        SQL Injection
      </Heading>
      {React.Children.toArray(sqli.map((item, i) => <Text>{item}</Text>))}
      <Heading as="h5" size="l" mt={6} mb={2}>
        Sub Domain Scanning
      </Heading>
      {sub_domain ? (
        React.Children.toArray(sub_domain.map((item, i) => <Text>{item}</Text>))
      ) : (
        <Text>No subdomain found</Text>
      )}
      {/* <Text color={"gray.500"}>{xss}</Text> */}
    </Box>
  );
}
