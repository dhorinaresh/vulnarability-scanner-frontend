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
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

const Login = ({ setLoggedIn, setgUsername, loggedIn }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    axios
      .post("http://localhost:5000/users/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        setLoggedIn(true);
        setgUsername(username);
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/");
        window.location.reload();
      })
      .catch(function (error) {
        toast({
          title: error.response.data.message,
          description: "Enter some other email address",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(error);
      });
  };

  return (
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
                    children={<CMdEmail color="gray.300" />}
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
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link to="../login" style={{ color: "teal.500" }}>
          Login In
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
