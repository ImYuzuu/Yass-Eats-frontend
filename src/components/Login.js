import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Container,
  InputGroup,
  InputRightElement,
  Divider,
  HStack,
  Image,
  Link,
  Flex,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost/api/auth/login", {
        email,
        password,
      });

      const { token, refreshToken, user } = response.data;

      // 🔐 Stockage en session
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirection après connexion
      navigate("/home");
    } catch (error) {
      setError("Email ou mot de passe incorrect.");
      console.error("Erreur de connexion :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#fff">
      <Container maxW="400px" w="100%">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mt={4}>
            <Image
              src="/img/logo.png"
              alt="Yass'Eat Logo"
              mx="auto"
              mb="auto"
              boxSize="auto"
            />
          </Box>
          <Divider borderColor="#B6F09C" borderWidth={2} />
          <Heading
            as="h2"
            size="xl"
            color="#1A1A3F"
            fontWeight="extrabold"
            textAlign="center"
            letterSpacing="1px"
            mb={2}
          >
            SE CONNECTER
          </Heading>
          <Box
            as="form"
            onSubmit={handleSubmit}
            bg="white"
            borderRadius="16px"
            boxShadow="0 2px 16px rgba(0,0,0,0.04)"
            p={6}
          >
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel color="#7ED957" fontWeight="bold" mb={1}>
                  Email
                </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  bg="#F5F5F5"
                  borderRadius="10px"
                  size="lg"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#7ED957" fontWeight="bold" mb={1}>
                  Mot de passe
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    bg="#F5F5F5"
                    borderRadius="10px"
                    size="lg"
                  />
                  <InputRightElement>
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      size="sm"
                      aria-label={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Text
                fontSize="sm"
                color="#1A1A3F"
                textAlign="right"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                mb={2}
              >
                mot de passe oublié
              </Text>
              <Button
                type="submit"
                colorScheme="green"
                bg="#7ED957"
                color="#1A1A3F"
                width="full"
                size="lg"
                borderRadius="10px"
                fontWeight="bold"
                isLoading={isLoading}
                loadingText="Connexion en cours..."
                boxShadow="0 2px 8px rgba(126,217,87,0.10)"
                _hover={{ bg: "#54B435" }}
              >
                Connexion
              </Button>
              <Button
                leftIcon={<FontAwesomeIcon icon={faGoogle} />}
                variant="outline"
                width="full"
                size="lg"
                borderRadius="10px"
                fontWeight="bold"
                mt={2}
                bg="white"
                borderColor="#E2E8F0"
                _hover={{ bg: "#F5F5F5" }}
              >
                Continue with Google
              </Button>
            </VStack>
          </Box>
          <HStack my={2} align="center">
            <Divider borderColor="#B6F09C" />
            <Text color="#7ED957" fontWeight="bold">
              ou
            </Text>
            <Divider borderColor="#B6F09C" />
          </HStack>
          <Text textAlign="center" mb={4}>
            <Link
              color="#1A1A3F"
              fontWeight="bold"
              textDecoration="underline"
              cursor="pointer"
              fontSize="lg"
              onClick={() => navigate("/register")}
            >
              CRÉER UN COMPTE
            </Link>
          </Text>
        </VStack>
      </Container>
    </Flex>
  );
};

export default Login;
