import React, { useState, useMemo } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, Text, VStack, HStack, IconButton, Divider, Heading, Box, Flex, Image, Icon,
  FormControl, FormLabel, Input, Stepper, Step, StepIndicator, StepStatus, StepIcon, useSteps
} from '@chakra-ui/react';
import {
  FaCartShopping,      
  FaTrash,
  FaCreditCard,
  FaCheck,
  FaChevronRight,
  FaCircleExclamation, 
  FaPizzaSlice
} from 'react-icons/fa6';

// --- Données et fonctions utilitaires ---
const groupCartByCategory = (cart) => {
  if (!Array.isArray(cart)) return {}; 
  
  return cart.reduce((acc, item) => {
    const category = item.category || 'Autres';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
};

// --- Etape 1: Récapitulatif ---
const CartSummary = ({ cart = [] }) => { 
  const groupedCart = groupCartByCategory(cart);
  const totalArticles = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <VStack w="full" align="stretch" spacing={4}>
      <HStack justify="space-between" w="full" bg="gray.50" p={3} borderRadius="md">
        <HStack>
          <Image src="/img/yburger.png" boxSize="40px" borderRadius="full" />
          <VStack align="left" spacing={0}>
            <Text fontWeight="bold">Mash'Allah Pizza</Text>
            <Text fontSize="xs" color="gray.600">17 rue du fourneau</Text>
          </VStack>
        </HStack>
        <HStack cursor="pointer">
          <Text fontSize="sm">Heure d'arrivée estimée :   19h45</Text>
          <Icon as={FaChevronRight} />
        </HStack>
      </HStack>
      
      <Text fontWeight="bold" color="green.600">{totalArticles} articles</Text>
      
      <VStack align="stretch" spacing={4}>
        {Object.entries(groupedCart).map(([category, items]) => (
          <Box key={category}>
            <Text fontWeight="bold" fontSize="sm" mb={2}>{category}</Text>
            <VStack align="stretch" spacing={3}>
              {items.map(item => (
                <HStack key={item.id} justify="space-between">
                  <HStack>
                    <Icon as={item.id === 8 ? FaCircleExclamation : FaPizzaSlice} color={item.id === 8 ? "red.500" : "gray.400"} />
                    <Text>{item.name}</Text>
                  </HStack>
                  <Text fontSize="sm">{item.quantity} x {item.price}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};
export default function CartModal({ isOpen, onClose, cart = [], setCart }) { 
  const [step, setStep] = useState(1);
  const steps = [
    { title: 'Récapitulatif' },
    { title: 'Paiement' },
    { title: 'Suivi de commande' },
  ];
  
  const totalPrice = useMemo(() =>
    (cart || []).reduce((total, item) => total + (parseFloat(item.price.replace(',', '.')) * item.quantity), 0).toFixed(2),
    [cart]
  );

  const handleNextStep = () => setStep(step + 1);
  const handleSetStep = (stepNumber) => setStep(stepNumber);

  const handleClose = () => {
    if(step === 3) {
      setCart([]);
    }
    setStep(1);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="xl" overflow="hidden">
        <Flex>
          {/* COLONNE DE GAUCHE : NAVIGATION */}
          <VStack w="250px" bg="gray.50" p={6} spacing={6} align="stretch">
            <Image src="/img/logo.png" alt="Yass'Eats Logo" w="120px" />
            <VStack align="stretch" spacing={2}>
              {steps.map((s, index) => (
                <Button
                  key={s.title}
                  variant={step === index + 1 ? 'solid' : 'ghost'}
                  colorScheme={step === index + 1 ? 'green' : 'gray'}
                  justifyContent="flex-start"
                  onClick={() => handleSetStep(index + 1)}
                  isDisabled={index > 0 && (!cart || cart.length === 0)}
                >
                  {s.title}
                </Button>
              ))}
            </VStack>
          </VStack>

          {/* COLONNE DE DROITE : CONTENU */}
          <VStack flex="1" p={6} align="stretch">
            <ModalHeader>
              <HStack>
                <Icon as={FaCartShopping} />
                <Text>VOTRE PANIER</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            
            <ModalBody>
              {step === 1 && <CartSummary cart={cart} />}
              {step === 2 && <Text>Le formulaire de paiement apparaîtra ici.</Text>}
              {step === 3 && <Text>Le suivi de commande apparaîtra ici.</Text>}
            </ModalBody>

            <ModalFooter>
              <VStack w="full" spacing={4}>
                 <Divider />
                 <HStack w="full" justify="space-between">
                    <Text fontWeight="bold" fontSize="lg">Sous-Total</Text>
                    <Text fontWeight="bold" fontSize="lg">{totalPrice} €</Text>
                 </HStack>
                 {step === 1 && (
                    <Button w="full" size="lg" colorScheme="green" onClick={handleNextStep} isDisabled={!cart || cart.length === 0}>
                        COMMANDER
                    </Button>
                 )}
                 {/* ... (le reste du footer est inchangé) ... */}
                 {step === 2 && (
                    <Button w="full" size="lg" colorScheme="green" onClick={handleNextStep}>
                        PAYER {totalPrice} €
                    </Button>
                 )}
                 {step === 3 && (
                    <Button w="full" size="lg" colorScheme="gray" onClick={handleClose}>
                        Fermer
                    </Button>
                 )}
              </VStack>
            </ModalFooter>
          </VStack>
        </Flex>
      </ModalContent>
    </Modal>
  );
}