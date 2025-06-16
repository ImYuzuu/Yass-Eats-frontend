import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, HStack, Image, Button, IconButton, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { FaBars, FaLocationDot } from 'react-icons/fa6';
import Sidebar from './SideBar';
import NotificationBell from './NotificationBell';

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      
      <Flex as="header" position="sticky" top="0" zIndex="sticky" align="center" justify="space-between" bg="white" px={{ base: 2, md: 6 }} py={3} boxShadow="sm">
        {/* --- Section de gauche : Hamburger et Logo --- */}
        <HStack spacing={3}>
            <IconButton icon={<FaBars />} variant="ghost" aria-label="Ouvrir le menu" onClick={onOpen} />
            {/* --- Le logo est caché sur les très petits écrans pour laisser de la place --- */}
            <Image src="/img/logo.png" alt="Yass'Eats" h="40px" display={{ base: 'none', sm: 'block' }} />
        </HStack>
        
        {/* --- Section du milieu --- */}
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <Button variant="ghost" onClick={() => navigate('/home')}>Accueil</Button>
            <Button variant="ghost" onClick={() => navigate('/commandes')}>Commandes</Button>
            <Button variant="ghost" onClick={() => navigate('/map')}>Map</Button>
            <Button variant="ghost" onClick={() => navigate('/profil')}>Profil</Button>
        </HStack>

        {/* --- Section de droite : Notifications et Adresse (l'adresse est cachée sur mobile) --- */}
        <HStack spacing={{ base: 2, md: 4 }}>
            <NotificationBell />
            <Box display={{ base: 'none', lg: 'block' }}>
                <Button size="sm" variant="outline" p={2}>
                  <Icon as={FaLocationDot} mr={2} />
                  <Text fontWeight="normal" isTruncated maxW="200px">10 rue du moulin, 75000 Paris</Text>
                </Button>
            </Box>
        </HStack>
      </Flex>
    </>
  );
}