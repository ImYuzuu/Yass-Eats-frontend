import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Heading, VStack, Alert, AlertIcon,
  Container, Divider, HStack, Text, Link, SimpleGrid, Image, Select
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'client',
    // Champs communs pour client et livreur
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    // Champs spécifiques au client
    birthDate: '',
    // Champs spécifiques au livreur
    vehicle: '',
    deliveryZone: '',
    experience: '',
    // Champs spécifiques au restaurateur
    restaurantName: '',
    restaurantAddress: '',
    cuisineType: '',
    // Champs spécifiques à l'admin
    position: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.confirmPassword) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    
    // Validation des champs spécifiques selon le type d'utilisateur
    switch (form.userType) {
      case 'client':
        if (!form.firstName || !form.lastName || !form.address || !form.phone) {
          setError('Veuillez remplir tous les champs obligatoires du client.');
          return;
        }
        break;
      case 'livreur':
        if (!form.firstName || !form.lastName || !form.address || !form.phone || !form.vehicle || !form.deliveryZone || !form.experience) {
          setError('Veuillez remplir tous les champs obligatoires du livreur.');
          return;
        }
        break;
      case 'restaurateur':
        if (!form.phone || !form.restaurantName || !form.restaurantAddress || !form.cuisineType) {
          setError('Veuillez remplir tous les champs obligatoires du restaurateur.');
          return;
        }
        break;
      case 'admin':
        if (!form.position) {
          setError('Veuillez remplir tous les champs obligatoires de l\'administrateur.');
          return;
        }
        break;
    }

    setError('');
    // TODO: Appel API pour créer l'utilisateur
    navigate('/home');
  };

  const renderCommonFields = () => {
    if (form.userType === 'restaurateur') {
      return (
        <FormControl isRequired>
          <FormLabel color="#7ED957" fontWeight="bold">Téléphone</FormLabel>
          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="ex : 06 12 34 56 78"
            bg="#F5F5F5"
            borderRadius="6px"
          />
        </FormControl>
      );
    }

    return (
      <>
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

        <FormControl isRequired>
          <FormLabel color="#7ED957" fontWeight="bold">Téléphone</FormLabel>
          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="ex : 06 12 34 56 78"
            bg="#F5F5F5"
            borderRadius="6px"
          />
        </FormControl>
      </>
    );
  };

  const renderSpecificFields = () => {
    switch (form.userType) {
      case 'client':
        return (
          <>
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Date de naissance</FormLabel>
              <Input
                name="birthDate"
                type="date"
                value={form.birthDate}
                onChange={handleChange}
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
          </>
        );
      case 'livreur':
        return (
          <>
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Véhicule</FormLabel>
              <Input
                name="vehicle"
                value={form.vehicle}
                onChange={handleChange}
                placeholder="Type de véhicule"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Zone de livraison</FormLabel>
              <Input
                name="deliveryZone"
                value={form.deliveryZone}
                onChange={handleChange}
                placeholder="Zone de livraison"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Expérience</FormLabel>
              <Input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Années d'expérience"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
          </>
        );
      case 'restaurateur':
        return (
          <>
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Nom du restaurant</FormLabel>
              <Input
                name="restaurantName"
                value={form.restaurantName}
                onChange={handleChange}
                placeholder="Nom du restaurant"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Adresse du restaurant</FormLabel>
              <Input
                name="restaurantAddress"
                value={form.restaurantAddress}
                onChange={handleChange}
                placeholder="Adresse du restaurant"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Type de cuisine</FormLabel>
              <Input
                name="cuisineType"
                value={form.cuisineType}
                onChange={handleChange}
                placeholder="Type de cuisine"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>
          </>
        );
      case 'admin':
        return (
          <FormControl isRequired>
            <FormLabel color="#7ED957" fontWeight="bold">Poste</FormLabel>
            <Input
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="Poste occupé"
              bg="#F5F5F5"
              borderRadius="6px"
            />
          </FormControl>
        );
      default:
        return null;
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
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Type d'utilisateur</FormLabel>
              <Select
                name="userType"
                value={form.userType}
                onChange={handleChange}
                bg="#F5F5F5"
                borderRadius="6px"
              >
                <option value="client">Client</option>
                <option value="livreur">Livreur</option>
                <option value="restaurateur">Restaurateur</option>
                <option value="admin">Administrateur</option>
              </Select>
            </FormControl>

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
              <FormLabel color="#7ED957" fontWeight="bold">Mot de passe</FormLabel>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="#7ED957" fontWeight="bold">Confirmer le mot de passe</FormLabel>
              <Input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmer le mot de passe"
                bg="#F5F5F5"
                borderRadius="6px"
              />
            </FormControl>

            {renderCommonFields()}
            {renderSpecificFields()}

            <Button
              type="submit"
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
            >
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