import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Heading, VStack, Alert, AlertIcon,
  Container, Divider, HStack, Text, Link, SimpleGrid, Image
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [form, setForm] = useState({
    email: '',
    confirmEmail: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    birthDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs.');
    } else if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
    } else {
      setError('');
      navigate('/home');
    }
    
  };

  return (
    <Container maxW="md" py={10} minH="100vh" display="flex" flexDir="column" justifyContent="center">
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Image src="/img/logo.png" alt="Yass'Eat Logo" mx="auto" mb="auto" boxSize="auto" />
        </Box>
        <Divider borderColor="#7ED957" borderWidth={2} />
        <Heading as="h2" size="xl" color="#1A1A3F" fontWeight="extrabold" textAlign="center" letterSpacing="1px" mb={2}>
          CRÉER UN COMPTE
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ex : yassine.dupont@email.com"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Confirm Email</FormLabel>
              <Input
                name="confirmEmail"
                type="email"
                value={form.confirmEmail}
                onChange={handleChange}
                placeholder="ex : yassine.dupont@email.com"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired>
                <FormLabel color="#7ED957" fontWeight="bold">Prénom</FormLabel>
                <Input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="ex : Yassine"
                  bg="#F5F5F5"
                  borderRadius="6px"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#7ED957" fontWeight="bold">Nom</FormLabel>
                <Input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="ex : Dupont"
                  bg="#F5F5F5"
                  borderRadius="6px"
                />
              </FormControl>
            </SimpleGrid>
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Adresse</FormLabel>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="ex : 10 rue du moulin"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired>
                <FormLabel color="#7ED957" fontWeight="bold">Code postale</FormLabel>
                <Input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="ex : 75 000"
                  bg="#F5F5F5"
                  borderRadius="6px"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#7ED957" fontWeight="bold">Ville</FormLabel>
                <Input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="ex : Paris"
                  bg="#F5F5F5"
                  borderRadius="6px"
                />
              </FormControl>
            </SimpleGrid>
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Date de naissance</FormLabel>
              <Input
                name="birthDate"
                type="date"
                value={form.birthDate}
                onChange={handleChange}
                placeholder="/ / /"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
            <Button type="submit" 
              colorScheme="green"
              bg="#54B435" 
              color="white" 
              width="full" 
              size="lg" 
              borderRadius="6px" 
              fontWeight="bold" 
              isLoading={isLoading} 
              loadingText="Création..." 
              mt={2} 
              onClick={() => navigate('/home')}>
              Créer
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faGoogle} />}
              variant="outline"
              width="full"
              size="lg"
              borderRadius="6px"
              fontWeight="bold"
              mt={2}
              bg="white"
              borderColor="#E2E8F0"
              _hover={{ bg: '#F5F5F5' }}
            >
              Continue with Google
            </Button>
          </VStack>
        </form>
        <HStack my={4} align="center">
          <Divider borderColor="#7ED957" />
          <Text color="#7ED957" fontWeight="bold">ou</Text>
          <Divider borderColor="#7ED957" />
        </HStack>
        <Text textAlign="center">
          <Link color="#1A1A3F" fontWeight="bold" textDecoration="underline" cursor="pointer" onClick={() => navigate('/login')}>
            SE CONNECTER
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default Register; 