import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  useColorModeValue,
  createIcon,
  Image,
  chakra,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

// import Scan from "../"
import { AiFillSecurityScan } from "react-icons/ai";
const CAiFillSecurityScan = chakra(AiFillSecurityScan);
export default function SearchCard({
  searchUrl,
  setSearchUrl,
  dataFetched,
  setDataFetched,
  searchFound,
  setSearchFound,
  setShowLoader,
}) {
  const toast = useToast();
  const fetchDataFunction = async (e) => {
    setDataFetched(false);
    setShowLoader(true);
    e.preventDefault();
    axios
      .get(`http://localhost:5000/search/?url=${searchUrl}`)
      .then(function (response) {
        console.log(response.data);
        setDataFetched(response.data);
        setSearchFound(true);
        setShowLoader(false);
        toast({
          title: "Search Completed",
          description: "Scroll Down",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        window.scrollTo({ top: 2080, bahavior: "smooth" });
      })
      .catch(function (error) {
        setSearchFound(false);
        setShowLoader(false);
        toast({
          title: "Somthing Went Wrong",
          description: "Look console for more errors",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        console.log(error);
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      py={12}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        boxShadow={"2xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        p={10}
        spacing={8}
        align={"center"}
      >
        {/* <Icon as={NotificationIcon} w={24} h={24} /> */}
        <Image scr="../bug.png" />
        <Stack align={"center"} spacing={2}>
          <Heading
            textTransform={"uppercase"}
            fontSize={"3xl"}
            color={useColorModeValue("gray.800", "gray.200")}
            display="flex"
            flexDirection="row"
          >
            Search {"...."}
            <CAiFillSecurityScan w={8} h={9} />
          </Heading>
          <Text fontSize={"lg"} color={"gray.500"}>
            Enter the link of the website to Scan
          </Text>
        </Stack>
        <Stack spacing={4} direction={{ base: "column", md: "row" }} w={"full"}>
          <Input
            type={"text"}
            value={searchUrl}
            onChange={(e) => setSearchUrl(e.target.value)}
            placeholder={"https://github.com/bsen20"}
            color={useColorModeValue("gray.800", "gray.200")}
            bg={useColorModeValue("gray.100", "gray.600")}
            rounded={"full"}
            border={0}
            _focus={{
              bg: useColorModeValue("gray.200", "gray.800"),
              outline: "none",
            }}
          />
          <Button
            bg={"blue.400"}
            rounded={"full"}
            color={"white"}
            flex={"1 0 auto"}
            _hover={{ bg: "blue.500" }}
            _focus={{ bg: "blue.500" }}
            onClick={fetchDataFunction}
          >
            Scan
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
