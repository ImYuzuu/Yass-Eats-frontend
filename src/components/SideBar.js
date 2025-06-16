import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Divider,
} from '@chakra-ui/react';
import {
  FaHeart,
  FaGear,
  FaCircleQuestion,
  FaRightFromBracket,
  FaBicycle
} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  
  return (
    
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <VStack align="stretch" spacing={4}>
            <Button
              leftIcon={<FaHeart />}
              colorScheme="green"
              variant="outline"
              justifyContent="flex-start"
            >
              Favoris
            </Button>
            <Button
              leftIcon={<FaGear />}
              colorScheme="green"
              variant="outline"
              justifyContent="flex-start"
            >
              Paramètres
            </Button>
            <Button
              leftIcon={<FaCircleQuestion />}
              colorScheme="green"
              variant="outline"
              justifyContent="flex-start"
            >
              Aide
            </Button>
            <Divider />
            <Button
              leftIcon={<FaRightFromBracket />}
              colorScheme="red"
              variant="solid"
              justifyContent="flex-start"
              //onClick={} // Yacine ajouté
            >
              Déconnexion
            </Button>
            <Button
              leftIcon={<FaBicycle />}
              colorScheme="blue"
              variant="solid"
              justifyContent="flex-start"
              onClick={() => navigate(`/MapPage`)} 
            >
              Mode Livreur
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}