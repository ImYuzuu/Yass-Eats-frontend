import React from 'react';
import {
  Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody,
  PopoverArrow, PopoverCloseButton, IconButton, Box, Flex, Text, VStack, Divider
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa6';

// Données de simulation pour les notifications
const notifications = [
  { id: 1, title: "Votre commande chez Marjan Pizza est en préparation." }
];

export default function NotificationBell() {
  const notificationCount = notifications.length;

  return (
    // On utilise trigger="hover" pour que le popover s'ouvre au survol
    <Popover trigger="hover" placement="bottom-end">
      <PopoverTrigger>
        {/* On utilise un Box pour positionner la bulle de notification par-dessus l'icône */}
        <Box position="relative" as="button" p={2}>
          <FaBell size="20px" />
          {notificationCount > 0 && (
            <Flex
              position="absolute"
              top="-1px"
              right="-1px"
              as="span"
              fontSize="xs"
              w="18px"
              h="18px"
              bg="red.500"
              borderRadius="full"
              color="white"
              align="center"
              justify="center"
              fontWeight="bold"
            >
              {notificationCount}
            </Flex>
          )}
        </Box>
      </PopoverTrigger>
      
      {/* Contenu de la liste de notifications */}
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Notifications</PopoverHeader>
        <PopoverBody>
          <VStack align="stretch" spacing={2}>
            {notifications.map((notif, index) => (
              <React.Fragment key={notif.id}>
                <Text fontSize="sm" py={1}>{notif.title}</Text>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}





