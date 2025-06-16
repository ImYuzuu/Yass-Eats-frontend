import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Flex, Heading, Input, IconButton, Button, Text, VStack, HStack, Image, Badge, SimpleGrid, Icon,
  useDisclosure
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Sidebar from './SideBar';
import Header from './Header';
import {
  FaCartShopping, FaStar, FaBars, FaBurger, FaPizzaSlice, FaFishFins, FaHotdog, FaBreadSlice, FaMoon, FaLocationDot
} from 'react-icons/fa6';

// --- Données de simulation ---
const categories = [
  { label: 'Burger', icon: FaBurger }, { label: 'Tacos', icon: FaHotdog }, { label: 'Sushi', icon: FaFishFins },
  { label: 'Pizza', icon: FaPizzaSlice }, { label: 'Sandwich', icon: FaBreadSlice }, { label: 'Halal', icon: FaMoon },
];

const populairesData = [
  { name: "McDonald's", img: '/img/mcdo.png', distance: 3.6, note: 4.2, price: 10, category: 'Burger' },
  { name: "Burger King", img: '/img/bk.png', distance: 4.1, note: 4.3, price: 9, category: 'Burger' },
  { name: "Domino's Pizza", img: '/img/pizza.png', distance: 1.2, note: 4.0, price: 15, category: 'Pizza' },
  { name: "O'Tacos", img: '/img/otacos.png', distance: 2.9, note: 4.0, price: 8, category: 'Tacos' },
  { name: "Subway", img: '/img/subway.png', distance: 3.7, note: 3.7, price: 7, category: 'Sandwich' },
];

const mieuxNotesData = [
  { name: "Yacine Burger", img: '/img/yburger.png', distance: 1.8, note: 4.8, price: 12, category: 'Burger' },
  { name: "Pok'Arnaud", img: '/img/pokarnaud.png', distance: 1.8, note: 4.7, price: 14, category: 'Sushi' },
  { name: "Bun'noit", img: '/img/buns.png', distance: 3.6, note: 4.7, price: 11, category: 'Burger' },
  { name: "Hugo's Tacos", img: '/img/hugotacos.png', distance: 3.6, note: 4.6, price: 9, category: 'Tacos' },
  { name: "Italien", img: '/img/italien.png', distance: 2.1, note: 4.5, price: 13, category: 'Pizza' },
];

export default function Home() {
  const navigate = useNavigate();

  // State for search, filters, and active category
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(null); // e.g., 'price', 'note', 'distance'
  const [activeCategory, setActiveCategory] = useState(null); // e.g., 'Burger', 'Pizza'
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);
        if (payload && payload.role) {
          const role = payload.role;
          setUserRole(role);
          if (role === "Livreur") { // Corrected "livreur" to "Livreur" based on common case convention
            navigate("/map");
          }
        }
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        sessionStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = (filterType) => {
    setActiveFilter(prevFilter => (prevFilter === filterType ? null : filterType));
    // When a filter button is clicked, clear the category selection
    setActiveCategory(null);
  };

  // New function to handle category clicks
  const handleCategoryClick = (categoryLabel) => {
    setActiveCategory(prevCategory => (prevCategory === categoryLabel ? null : categoryLabel));
    // When a category is clicked, clear any active sorting filters
    setActiveFilter(null);
    // Optionally, clear the search term as well, or let it apply on top
    // setSearchTerm('');
  };


  const filteredPopulaires = useMemo(() => {
    let filtered = populairesData;

    // Apply category filter first
    if (activeCategory) {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Apply search term filter
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting filter
    if (activeFilter === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeFilter === 'note') {
      filtered.sort((a, b) => b.note - a.note);
    } else if (activeFilter === 'distance') {
      filtered.sort((a, b) => a.distance - b.distance);
    }
    return filtered;
  }, [searchTerm, activeFilter, activeCategory]); // Add activeCategory to dependencies

  const filteredMieuxNotes = useMemo(() => {
    let filtered = mieuxNotesData;

    // Apply category filter first
    if (activeCategory) {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Apply search term filter
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting filter
    if (activeFilter === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeFilter === 'note') {
      filtered.sort((a, b) => b.note - a.note);
    } else if (activeFilter === 'distance') {
      filtered.sort((a, b) => a.distance - b.distance);
    }
    return filtered;
  }, [searchTerm, activeFilter, activeCategory]); // Add activeCategory to dependencies

  return (
    <Box bg="gray.50" minH="100vh" pb={10}>
      <Sidebar isOpen={isMenuOpen} onClose={onMenuClose} />
      <Header onMenuOpen={onMenuOpen} />

      {/* Optional: Display User Role for debugging if needed */}
      {/* <Flex justify="center" mt={4}>
        <Text fontSize="md" color="gray.600">
          Votre rôle: {userRole ? <Text as="span" fontWeight="bold">{userRole}</Text> : "Chargement..."}
        </Text>
      </Flex> */}

      {/* Recherche */}
      <Flex justify="center" mt={6} mb={2}>
        <Input
          placeholder="Rechercher"
          maxW="500px"
          bg="white"
          borderRadius="full"
          value={searchTerm}
          onChange={handleSearchChange}
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
        {categories.map(cat => {
          const IconComponent = cat.icon;
          const isActive = activeCategory === cat.label;
          return (
            <VStack
              key={cat.label}
              spacing={1}
              cursor="pointer"
              onClick={() => handleCategoryClick(cat.label)} // Click handler for categories
            >
              <Box
                bg="white"
                borderRadius="full"
                p={3}
                boxShadow={isActive ? "lg" : "md"} // Visual feedback
                border={isActive ? "2px solid" : "none"} // Visual feedback
                borderColor={isActive ? "green.400" : "transparent"} // Visual feedback
                w="70px"
                h="70px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.2s ease-in-out"
                _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
              >
                <IconComponent size="32px" color={isActive ? "green.500" : "#4A5568"} /> {/* Visual feedback */}
              </Box>
              <Text fontSize="sm" fontWeight={isActive ? "bold" : "normal"}>{cat.label}</Text> {/* Visual feedback */}
            </VStack>
          );
        })}
      </Flex>

      {/* Filtres */}
      <Flex justify="center" gap={2} mb={4}>
        <Button
          size="sm"
          variant={activeFilter === 'price' ? 'solid' : 'outline'}
          colorScheme={activeFilter === 'price' ? 'green' : 'gray'}
          onClick={() => handleFilterClick('price')}
        >
          Prix
        </Button>
        <Button
          size="sm"
          variant={activeFilter === 'note' ? 'solid' : 'outline'}
          colorScheme={activeFilter === 'note' ? 'green' : 'gray'}
          onClick={() => handleFilterClick('note')}
        >
          Notes
        </Button>
        <Button
          size="sm"
          variant={activeFilter === 'distance' ? 'solid' : 'outline'}
          colorScheme={activeFilter === 'distance' ? 'green' : 'gray'}
          onClick={() => handleFilterClick('distance')}
        >
          Distance
        </Button>
      </Flex>

      {/* Les plus populaires */}
      <Box maxW="1200px" mx="auto" mb={6}>
        <Text fontWeight="bold" color="green.400" fontSize="lg" mb={2}>
          Les plus populaires
        </Text>
        <SimpleGrid columns={[2, null, 5]} spacing={4}>
          {filteredPopulaires.length > 0 ? (
            filteredPopulaires.map((item, idx) => (
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
                onClick={() => navigate(`/restaurant/${item.name.replace(/\s+/g, '-').toLowerCase()}`)}
              >
                <Image src={item.img} borderRadius="md" h="100px" w="100%" objectFit="cover" />
                <Badge position="absolute" top={2} left={2} colorScheme="green">{item.distance} km</Badge>
                <Text mt={2} fontWeight="bold">{item.name}</Text>
                <HStack spacing={1}>
                  <FaStar color="#FFD700" />
                  <Text fontSize="sm">{item.note}</Text>
                </HStack>
              </Box>
            ))
          ) : (
            <Text>Aucun restaurant trouvé pour cette catégorie / recherche.</Text>
          )}
        </SimpleGrid>
      </Box>

      {/* Les mieux notés */}
      <Box maxW="1200px" mx="auto" mb={6}>
        <Text fontWeight="bold" color="green.400" fontSize="lg" mb={2}>Les mieux notés</Text>
        <SimpleGrid columns={[2, null, 5]} spacing={4}>
          {filteredMieuxNotes.length > 0 ? (
            filteredMieuxNotes.map((item, idx) => (
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
                onClick={() => navigate(`/restaurant/${item.name.replace(/\s+/g, '-').toLowerCase()}`)}
              >
                <Image src={item.img} borderRadius="md" h="100px" w="100%" objectFit="cover" />
                <Badge position="absolute" top={2} left={2} colorScheme="green">{item.distance} km</Badge>
                <Text mt={2} fontWeight="bold">{item.name}</Text>
                <HStack spacing={1}>
                  <FaStar color="#FFD700" />
                  <Text fontSize="sm">{item.note}</Text>
                </HStack>
              </Box>
            ))
          ) : (
            <Text>Aucun restaurant trouvé pour cette catégorie / recherche.</Text>
          )}
        </SimpleGrid>
      </Box>

      {/* {userRole !== "livreur" && (
        <Flex justify="center" mt={8}>
          <Button leftIcon={<FaCartShopping />} colorScheme="green" size="lg" borderRadius="lg">
            COMMANDER
          </Button>
        </Flex>
      )} */}
    </Box>
  );
}