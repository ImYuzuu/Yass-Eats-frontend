import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, VStack, HStack, Icon, Button, useDisclosure, Divider, IconButton, Image } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import { FaMotorcycle, FaBars, FaLocationDot, FaBicycle } from 'react-icons/fa6';
import Sidebar from './SideBar';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


// --- Données de simulation (inchangées) ---
const ordersData = [
    { id: 1, name: "MCDONALD'S", address: "11 rue Saint-Hélène, Paris, 75 000", articles: 8, montant: "4,55 €", coords: [48.8584, 2.2945] },
    { id: 2, name: "MARJAN PIZZA", address: "3 rue de la République, Paris, 75 000", articles: 3, montant: "2,90 €", coords: [48.8738, 2.3322] },
    { id: 3, name: "DOMINO'S PIZZA", address: "1B rue de l'Odyssé, Paris, 75 000", articles: 1, montant: "3,45 €", coords: [48.8698, 2.3333] },
    { id: 4, name: "BURGER KING", address: "78 rue de Strasbourg, Paris, 75 000", articles: 2, montant: "2,90 €", coords: [48.8505, 2.3256] },
    { id: 5, name: "BUN'NOIT", address: "90 avenue Saint-Lau, Paris, 75 000", articles: 7, montant: "3,20 €", coords: [48.8800, 2.3522] },
    { id: 6, name: "BURGER KING", address: "7 rue du Chevalier, Paris, 75 000", articles: 2, montant: "2,95 €", coords: [48.8620, 2.3522] },
    { id: 7, name: "BURGER KING", address: "433 rue de Rio, Paris, 75 000", articles: 2, montant: "4,20 €", coords: [48.8650, 2.3350] },
    { id: 8, name: "SUBWAY", address: "8 rue de Nancy, Paris, 75 000", articles: 3, montant: "3,30 €", coords: [48.8530, 2.3450] },
    { id: 9, name: "POK'ARNAUD", address: "6 rue de la rue, Paris, 75 000", articles: 3, montant: "3,30 €", coords: [48.863296442665366, 2.2476807193546295] },
];

const createNumberedIcon = (number) => {
  return L.divIcon({
    html: `<div style="background-color: #2D3748; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white;">${number}</div>`,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

function ResizeMap() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 10); 

    return () => clearTimeout(timer);
  }, [map]);
  return null;
}


export default function MapPage() {
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const [activeOrder, setActiveOrder] = useState(null);
  const mapCenter = [48.864716, 2.349014];
  const navigate = useNavigate();

    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }, []);

  return (
    <Box>
      <Sidebar isOpen={isMenuOpen} onClose={onMenuClose} />
      <Header />
      
      <Flex h="calc(100vh - 72px)">
        <VStack 
          w="450px" 
          bg="white" 
          p={4} 
          spacing={3} 
          align="stretch" 
          overflowY="auto"
          position="relative"
          zIndex="1"
        >
          <HStack justify="space-between" px={2} py={2} color="gray.500" fontWeight="bold">
            <Text>RESTAURANT</Text>
            <Text>Nb d'Articles</Text>
            <Text>Montant</Text>
          </HStack>
          <Divider />
          {ordersData.map((order) => (
            <HStack 
              key={order.id} 
              p={3} 
              spacing={4}
              borderRadius="md"
              cursor="pointer"
              bg={activeOrder === order.id ? 'green.50' : 'transparent'}
              _hover={{ bg: 'gray.100' }}
              onClick={() => setActiveOrder(order.id)}
            >
              <Flex w="30px" h="30px" bg="gray.700" color="white" borderRadius="full" align="center" justify="center" fontWeight="bold" fontSize="sm">{order.id}</Flex>
              <VStack align="left" spacing={0} flex={1}>
                <Text fontWeight="bold">{order.name}</Text>
                <Text fontSize="xs" color="gray.600">{order.address}</Text>
              </VStack>
              <Text w="70px" textAlign="center">{order.articles} articles</Text>
              <Text w="50px" fontWeight="bold" textAlign="right">{order.montant}</Text>
            </HStack>
          ))}
        </VStack>
        
        <Box flex="1" bg="gray.200">
          <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {ordersData.map(order => (
              <Marker key={order.id} position={order.coords} icon={createNumberedIcon(order.id)}>
                <Popup><b>{order.name}</b><br/>{order.address}</Popup>
              </Marker>
            ))}
            <ResizeMap />
          </MapContainer>
        </Box>
      </Flex>
    </Box>
  );
}