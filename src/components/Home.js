// src/pages/Home.js

import React, { useMemo } from 'react'; // <-- MODIFICATION : Ajout de useMemo
import { useNavigate } from 'react-router-dom';
import {
  Box, Flex, Heading, Input, IconButton, Button, Text, VStack, HStack, Image, Badge, SimpleGrid, Icon,
  useDisclosure // <-- AJOUT: Import du hook pour gérer la modale/sidebar
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Sidebar from './SideBar'; // Assurez-vous que le chemin est correct

import {
  FaCartShopping, FaStar, FaBars, FaBurger, FaPizzaSlice, FaFishFins, FaHotdog, FaBreadSlice, FaMoon, FaLocationDot
} from 'react-icons/fa6';

// --- Données de simulation (inchangées) ---
const categories = [
    { label: 'Burger', icon: FaBurger }, { label: 'Tacos', icon: FaHotdog }, { label: 'Sushi', icon: FaFishFins },
    { label: 'Pizza', icon: FaPizzaSlice }, { label: 'Sandwich', icon: FaBreadSlice }, { label: 'Halal', icon: FaMoon },
];
const populaires = [
    { name: "McDonald's", img: '/img/mcdo.png', distance: 3.6, note: 4.2 }, { name: "Burger King", img: '/img/bk.png', distance: 4.1, note: 4.3 },
    { name: "Domino's Pizza", img: '/img/pizza.png', distance: 1.2, note: 4.0 }, { name: "O'Tacos", img: '/img/otacos.png', distance: 2.9, note: 4.0 },
    { name: "Subway", img: '/img/subway.png', distance: 3.7, note: 3.7 },
];
const mieuxNotes = [
    { name: "Yacine Burger", img: '/img/yburger.png', distance: 1.8, note: 4.8 }, { name: "Pok'Arnaud", img: '/img/pokarnaud.png', distance: 1.8, note: 4.7 },
    { name: "Bun'noit", img: '/img/buns.png', distance: 3.6, note: 4.7 }, { name: "Hugo's Tacos", img: '/img/hugotacos.png', distance: 3.6, note: 4.6 },
    { name: "Italien", img: '/img/italien.png', distance: 2.1, note: 4.5 },
];



export default function Home() {
  const navigate = useNavigate();
  // <-- AJOUT: Déclaration des variables pour contrôler la sidebar ---
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();

  return (
    <Box bg="gray.50" minH="100vh" pb={10}>
      {/* --- MODIFICATION: Appel de Sidebar au bon endroit --- */}
      <Sidebar isOpen={isMenuOpen} onClose={onMenuClose} />

      {/* Header */}
      <Flex as="header" align="center" justify="space-between" bg="white" px={6} py={3} boxShadow="sm">
        <HStack spacing={3}>
            {/* Le onClick fonctionne maintenant car onMenuOpen est défini */}
            <IconButton icon={<FaBars />} variant="ghost" aria-label="Ouvrir le menu" onClick={onMenuOpen} />
            <Image src="/img/logo.png" alt="Yass'Eats" h="40px" />
        </HStack>
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <Button variant="solid" colorScheme="green">Accueil</Button>
            <Button variant="ghost">Commandes</Button>
            <Button variant="ghost">Autour de moi</Button>
            <Button variant="ghost">Profil</Button>
        </HStack>
        <Box>
            <Button size="sm" variant="outline" p={2}>
              <Icon as={FaLocationDot} mr={2} />
              <Text fontWeight="normal" isTruncated maxW="200px">10 rue du moulin, 75000 Paris</Text>
            </Button>
        </Box>
      </Flex>

      {/* Recherche */}
      <Flex justify="center" mt={6} mb={2}>
        <Input placeholder="Rechercher" maxW="500px" bg="white" borderRadius="full" />
        <IconButton icon={<SearchIcon />} ml={-10} bg="transparent" aria-label="Rechercher" />
      </Flex>

      {/* Catégories */}
      <Flex justify="center" gap={4} wrap="wrap" mb={4}>
        {categories.map(cat => {
          const IconComponent = cat.icon;
          return (
            <VStack key={cat.label} spacing={1}>
              <Box bg="white" borderRadius="full" p={3} boxShadow="md" w="70px" h="70px" display="flex" alignItems="center" justifyContent="center">
                <IconComponent size="32px" color="#4A5568" />
              </Box>
              <Text fontSize="sm">{cat.label}</Text>
            </VStack>
          );
        })}
      </Flex>

      {/* Filtres */}
      <Flex justify="center" gap={2} mb={4}>
        <Button size="sm" variant="outline">Prix</Button>
        <Button size="sm" variant="outline">Notes</Button>
        <Button size="sm" variant="outline">Distance</Button>
        <Button size="sm" variant="outline">Trier</Button>
      </Flex>

      {/* Les plus populaires */}
      <Box maxW="1200px" mx="auto" mb={6}>
        <Text fontWeight="bold" color="green.400" fontSize="lg" mb={2}>Les plus populaires</Text>
        <SimpleGrid columns={[2, null, 5]} spacing={4}>
          {populaires.map((item, idx) => (
            <Box 
              key={idx} 
              bg="white" 
              borderRadius="lg" 
              boxShadow="md" 
              p={2} 
              position="relative"
              cursor="pointer" 
              _hover={{ boxShadow: 'xl', transform: 'scale(1.02)' }} 
              transition="all 0.2s ease-in-out"
              onClick={() => navigate(`/pizza`)}>
              <Image src={item.img} borderRadius="md" h="100px" w="100%" objectFit="cover" />
              <Badge position="absolute" top={2} left={2} colorScheme="green">{item.distance} km</Badge>
              <Text mt={2} fontWeight="bold">{item.name}</Text>
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
        <Text fontWeight="bold" color="green.400" fontSize="lg" mb={2}>Les mieux notés</Text>
        <SimpleGrid columns={[2, null, 5]} spacing={4}>
          {mieuxNotes.map((item, idx) => (
            <Box key={idx} bg="white" borderRadius="lg" boxShadow="md" p={2} position="relative">
              <Image src={item.img}  borderRadius="md" h="100px" w="100%" objectFit="cover" />
              <Badge position="absolute" top={2} left={2} colorScheme="green">{item.distance} km</Badge>
              <Text mt={2} fontWeight="bold">{item.name}</Text>
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
        <Text fontWeight="bold" color="green.400" fontSize="lg" mb={2}>Les mieux notés</Text>
        <SimpleGrid columns={[2, null, 5]} spacing={4}>
          {mieuxNotes.map((item, idx) => (
            <Box key={idx} bg="white" borderRadius="lg" boxShadow="md" p={2} position="relative">
              <Image src={item.img}  borderRadius="md" h="100px" w="100%" objectFit="cover" />
              <Badge position="absolute" top={2} left={2} colorScheme="green">{item.distance} km</Badge>
              <Text mt={2} fontWeight="bold">{item.name}</Text>
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
        <Text fontWeight="bold" color="green.400" fontSize="lg" mb={2}>Les mieux notés</Text>
        <SimpleGrid columns={[2, null, 5]} spacing={4}>
          {mieuxNotes.map((item, idx) => (
            <Box key={idx} bg="white" borderRadius="lg" boxShadow="md" p={2} position="relative">
              <Image src={item.img}  borderRadius="md" h="100px" w="100%" objectFit="cover" />
              <Badge position="absolute" top={2} left={2} colorScheme="green">{item.distance} km</Badge>
              <Text mt={2} fontWeight="bold">{item.name}</Text>
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
        <Button leftIcon={<FaCartShopping />} colorScheme="green" size="lg" borderRadius="lg">
          COMMANDER
        </Button>
      </Flex>
    </Box>
  );
}