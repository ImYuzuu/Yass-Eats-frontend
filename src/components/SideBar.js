import React from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import {
  FaHeart,
  FaGear,
  FaCircleQuestion,
  FaRightFromBracket,
  FaBicycle,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.warn("Aucun refreshToken trouvé !");
      return;
    }

    try {
      // Appel à l'API pour supprimer le refreshToken
      await axios.post("http://localhost/api/auth/logout", {
        refreshToken,
      });

      // Suppression des données du sessionStorage
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      // Redirection vers la page de connexion
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
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
              onClick={handleLogout}
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
