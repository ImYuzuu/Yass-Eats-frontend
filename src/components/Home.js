import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Input,
  IconButton,
  Button,
  Text,
  VStack,
  HStack,
  Image,
  Badge,
  SimpleGrid,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaShoppingCart, FaStar, FaMapMarkerAlt, FaBars } from "react-icons/fa";

const categories = [
  { label: "Burger", icon: "/img/burger.png" },
  { label: "Tacos", icon: "/img/tacos.png" },
  { label: "Sushi", icon: "/img/sushi.png" },
  { label: "Pizza", icon: "/img/pizza.png" },
  { label: "Sandwich", icon: "/img/sandwich.png" },
  { label: "Halal", icon: "/img/halal.png" },
];

const populaires = [
  { name: "McDonald's", img: "/img/burger.png", distance: 3.6, note: 4.2 },
  { name: "Burger King", img: "/img/bk.png", distance: 4.1, note: 4.3 },
  { name: "Domino's Pizza", img: "/img/pizza.png", distance: 1.2, note: 4.0 },
  { name: "O'Tacos", img: "/img/otacos.jpg", distance: 2.9, note: 4.0 },
  { name: "Subway", img: "/img/subway.jpg", distance: 3.7, note: 3.7 },
];

const mieuxNotes = [
  { name: "Yacine Burger", img: "/img/burger.png", distance: 1.8, note: 4.8 },
  { name: "Pok'Arnaud", img: "/img/pokarnaud.jpg", distance: 1.8, note: 4.7 },
  { name: "Bun'noit", img: "/img/bunnoit.jpg", distance: 3.6, note: 4.7 },
  {
    name: "Hugo's Tacos",
    img: "/img/hugostacos.jpg",
    distance: 3.6,
    note: 4.6,
  },
  { name: "Italien", img: "/img/italien.jpg", distance: 2.1, note: 4.5 },
];

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <Box bg="gray.50" minH="100vh" pb={10}>
      {/* Header */}
      <Flex
        align="center"
        justify="space-between"
        bg="white"
        px={6}
        py={3}
        boxShadow="sm"
      >
        <HStack spacing={3}>
          <IconButton icon={<FaBars />} variant="ghost" aria-label="Menu" />
          <Image src="/img/logo.png" alt="Yass'Eats" h="40px" />
        </HStack>
        <HStack spacing={8}>
          <Button variant="ghost" colorScheme="green">
            Accueil
          </Button>
          <Button variant="ghost">Commandes</Button>
          <Button variant="ghost">Autour de moi</Button>
          <Button variant="ghost">Profil</Button>
        </HStack>
        <Box>
          <Input
            value="10 rue du moulin, 75000 Paris"
            size="sm"
            w="250px"
            readOnly
          />
        </Box>
      </Flex>

      {/* Recherche */}
      <Flex justify="center" mt={6} mb={2}>
        <Input
          placeholder="Rechercher"
          maxW="500px"
          bg="white"
          borderRadius="full"
        />
        <IconButton
          icon={<SearchIcon />}
          ml={-10}
          bg="transparent"
          aria-label="Rechercher"
        />
      </Flex>

      {/* Catégories */}
      <Flex justify="center" gap={4} wrap="wrap" mb={4}>
        {categories.map((cat) => (
          <VStack key={cat.label} spacing={1}>
            <Box bg="white" borderRadius="full" p={3} boxShadow="md">
              <Image src={cat.icon} alt={cat.label} boxSize="40px" />
            </Box>
            <Text fontSize="sm">{cat.label}</Text>
          </VStack>
        ))}
      </Flex>

      {/* Filtres */}
      <Flex justify="center" gap={2} mb={4}>
        <Button size="sm" variant="outline">
          Prix
        </Button>
        <Button size="sm" variant="outline">
          Notes
        </Button>
        <Button size="sm" variant="outline">
          Distance
        </Button>
        <Button size="sm" variant="outline">
          Trier
        </Button>
      </Flex>

      {/* Les plus populaires */}
      <Box maxW="1200px" mx="auto" mb={6}>
        <Text fontWeight="bold" color="green.400" fontSize="lg" mb={2}>
          Les plus populaires
        </Text>
        <SimpleGrid columns={[2, null, 5]} spacing={4}>
          {populaires.map((item, idx) => (
            <Box
              key={idx}
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              p={2}
              position="relative"
            >
              <Image
                src={item.img}
                borderRadius="md"
                h="100px"
                w="100%"
                objectFit="cover"
              />
              <Badge position="absolute" top={2} left={2} colorScheme="green">
                {item.distance} km
              </Badge>
              <Text mt={2} fontWeight="bold">
                {item.name}
              </Text>
              <HStack spacing={1}>
                <FaStar color="#FFD700" />
                <Text fontSize="sm">{item.note}</Text>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Les mieux notés */}
      <Box maxW="1200px" mx="auto" mb={6}>
        <Text fontWeight="bold" color="green.400" fontSize="lg" mb={2}>
          Les mieux notés
        </Text>
        <SimpleGrid columns={[2, null, 5]} spacing={4}>
          {mieuxNotes.map((item, idx) => (
            <Box
              key={idx}
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              p={2}
              position="relative"
            >
              <Image
                src={item.img}
                borderRadius="md"
                h="100px"
                w="100%"
                objectFit="cover"
              />
              <Badge position="absolute" top={2} left={2} colorScheme="green">
                {item.distance} km
              </Badge>
              <Text mt={2} fontWeight="bold">
                {item.name}
              </Text>
              <HStack spacing={1}>
                <FaStar color="#FFD700" />
                <Text fontSize="sm">{item.note}</Text>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Commander */}
      <Flex justify="center" mt={8}>
        <Button
          leftIcon={<FaShoppingCart />}
          colorScheme="green"
          size="lg"
          borderRadius="lg"
        >
          COMMANDER
        </Button>
      </Flex>
    </Box>
  );
}
