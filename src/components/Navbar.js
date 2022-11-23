import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Logo from "../logo.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Nav({
  toggleColorMode,
  colorMode,
  loggedIn,
  setLoggedIn,
  gusername,
  setgUsername,
}) {
  //   const { colorMode, toggleColorMode } = useColorMode();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [userDetails, setuserDetails] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setuserDetails(user);
    }
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Link to="..">
              <Image src={Logo} alt="Logo" height={39} width={39} onClick />
            </Link>

            {/* Web-Scan */}
          </Box>
          <Box fontSize={26} fontStyle="italic">
            {/* <Image src={Logo} alt="Logo" height={39} width={39} /> */}
            Website Scanning-System
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>
                      {userDetails ? userDetails.user.username : "Anonymous"}
                    </p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {userDetails ? (
                    <MenuItem
                      // to=".."
                      style={{ color: "teal.500" }}
                      onClick={() => {
                        setgUsername("");
                        setLoggedIn(false);
                        localStorage.removeItem("userData");
                        navigate("/");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </MenuItem>
                  ) : (
                    <Link to="../login" style={{ color: "teal.500" }}>
                      LogIn
                    </Link>
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
