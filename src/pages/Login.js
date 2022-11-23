import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CFaUserAlt = chakra(MdEmail);
const CFaLock = chakra(FaLock);

const Login = ({ setLoggedIn, setgUsername, loggedIn }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    axios
      .post("http://localhost:5000/users/signin", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        setLoggedIn(true);
        // setgUsername(response.data.username);
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/");
        window.location.reload();
      })
      .catch(function (error) {
        toast({
          title: "Wrong Credentails",
          description: "Email or password did not match.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(error);
      });
  };

  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        bg={useColorModeValue("gray.100", "gray.900")}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                bg={useColorModeValue("gray.100", "gray.900")}
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          New to us?{" "}
          <Link to="../register" color="teal.500">
            Sign Up
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
