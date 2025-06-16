import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Flex, Heading, Input, IconButton, Button, Text, VStack, HStack, Image, Icon, Badge, useDisclosure
} from '@chakra-ui/react';
import {
    FaBars, FaStar, FaRegHeart, FaRegClock, FaPlus, FaCartShopping, FaLocationDot
} from 'react-icons/fa6';
import CardModal from './CardModal';
import Sidebar from './SideBar';

// --- Données de simulation ---
const initialMenu = [
  { id: 1, category: 'Pizzas', name: 'PIZZA MARGHERITA', description: 'Base Tomate, Mozzarella, Origan', price: '8,90 €', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500' },
  { id: 2, category: 'Pizzas', name: 'PIZZA 3 FROMAGES', description: 'Base Tomate, Mozzarella, Chèvre, Emmental', price: '10,90 €', img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500' },
  { id: 3, category: 'Pizzas', name: 'PIZZA 4 SAISONS', description: 'Base Tomate, Mozzarella, Poivrons, Artichaut, Champignons', price: '10,90 €', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500' },
  { id: 4, category: 'Pizzas', name: 'PIZZA BOLOGNAISE', description: 'Base Tomate, Mozzarella, Epices, Emmental, Viande hachée', price: '10,90 €', img: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500' },
  { id: 5, category: 'Pizzas', name: 'PIZZA CURRY', description: 'Base Tomate, Mozzarella, Crème fraîche, Curry, Poulet', price: '9,90 €', img: 'https://images.unsplash.com/photo-1571066811602-716837d681de?w=500' },
   { id: 10, category: 'Entrées', name: 'BRUSCHETTA TOMATE', description: 'Pain grillé, tomates fraîches, ail, basilic', price: '6,50 €', img: 'https://images.unsplash.com/photo-1505253716362-afb74bf60d44?w=500' },
  { id: 11, category: 'Entrées', name: 'SALADE CÉSAR', description: 'Salade romaine, poulet grillé, croûtons, parmesan', price: '7,90 €', img: 'https://images.unsplash.com/photo-1580013759943-8a16104f9755?w=500' },
  { id: 12, category: 'Menu enfants', name: 'MINI PIZZA JAMBON', description: 'Petite pizza avec jambon et fromage', price: '7,00 €', img: 'https://images.unsplash.com/photo-1595708684062-f38b16527ca4?w=500' },
  { id: 6, category: 'Desserts', name: 'TIRAMISU', description: 'Crémeux et savoureux, fait maison', price: '5,50 €', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500' },
  { id: 7, category: 'Desserts', name: 'MOUSSE AU CHOCOLAT', description: 'Riche et onctueuse', price: '4,90 €', img: 'https://images.unsplash.com/photo-1603532641889-4604e38b375b?w=500' },
  { id: 8, category: 'Boissons', name: 'COCA-COLA', description: '33cl', price: '2,50 €', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32a64ba?w=500' },
  { id: 9, category: 'Boissons', name: 'EAU MINÉRALE', description: '50cl', price: '2,00 €', img: 'https://images.unsplash.com/photo-1553565229-a07ab5912068?w=500' },
];
const categories = [ { id: 'pizzas', name: 'Pizzas' }, { id: 'entrees', name: 'Entrées' }, { id: 'desserts', name: 'Desserts' }, { id: 'boissons', name: 'Boissons' }, { id: 'menu-enfants', name: 'Menu enfants' }];

export default function RestaurantPage() {
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(initialMenu);
  const [activeCategory, setActiveCategory] = useState('pizzas');
  const [cart, setCart] = useState([]);

  const categoryRefs = useRef({});

  const scrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px', threshold: 0 }
    );
    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [menu]);

  const handleAddToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  const cartItemsCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

      useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
          navigate("/login");
        }
      }, []);


  return (
    <Box>
      <Sidebar isOpen={isMenuOpen} onClose={onMenuClose} />
      <Flex as="header" position="sticky" top="0" zIndex="sticky" align="center" justify="space-between" bg="white" px={6} py={3} boxShadow="sm">
        <HStack spacing={3}>
            <IconButton icon={<FaBars />} variant="ghost" aria-label="Ouvrir le menu" onClick={onMenuOpen} />
            <Image src="/img/logo.png" alt="Yass'Eats" h="40px" />
        </HStack>
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}><Button variant="ghost" colorScheme="green" onClick={() => navigate(`/home`)}>Accueil</Button><Button variant="ghost">Commandes</Button><Button variant="ghost">Autour de moi</Button><Button variant="ghost">Profil</Button></HStack>
        <Box><Button size="sm" variant="outline" p={2}><Icon as={FaLocationDot} mr={2} /><Text fontWeight="normal" isTruncated maxW="200px">10 rue du moulin, 75000 Paris</Text></Button></Box>
      </Flex>
      
      <Box maxW="1400px" mx="auto">
        <Box h={{ base: '150px', md: '250px' }} bgImage="url('https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070')" bgSize="cover" bgPosition="center" position="relative" ><Flex h="100%" align="center" justify="center" bg="blackAlpha.500"><Heading color="white" fontSize={{ base: '3xl', md: '5xl' }}>Domino's Pizza</Heading></Flex></Box>
        <Flex align="center" justify="space-between" p={4} bg="white" boxShadow="md" m={-4} mt={-8} mx={{ base: 2, md: 8 }} borderRadius="lg" zIndex="docked" position="relative"><HStack spacing={4}><HStack><Icon as={FaLocationDot} color="green.500" /><Text fontSize="sm">8.2 km</Text></HStack><HStack><Icon as={FaStar} color="yellow.400" /><Text fontSize="sm">4.6 / 5</Text></HStack><HStack><Icon as={FaRegClock} color="gray.500" /><Text fontSize="sm">Fermé à 15h</Text></HStack></HStack><IconButton icon={<FaRegHeart />} isRound aria-label="Ajouter aux favoris" /></Flex>

        <Flex mt={16} px={{ base: 2, md: 8 }}>
          <VStack as="aside" w={{ base: "100px", md:"250px" }} position="sticky" top="80px" alignSelf="flex-start" spacing={2} pr={8}>
            {categories.map((cat) => (
              <Button key={cat.id} w="full" justifyContent="flex-start" variant={activeCategory === cat.id ? "solid" : "ghost"} colorScheme={activeCategory === cat.id ? "green" : "gray"} onClick={() => scrollToCategory(cat.id)}>
                {cat.name}
              </Button>
            ))}
            <Box flex="1" />
            <Button w="full" size="lg" colorScheme="green" leftIcon={<Icon as={FaCartShopping} />} mt={8}
              onClick={onCartOpen}
            >
              PANIER <Badge ml={2} colorScheme='whiteAlpha' fontSize="md" borderRadius="full" px={2}>{cartItemsCount}</Badge>
            </Button>
          </VStack>
          <VStack as="main" flex="1" spacing={10} align="stretch">
            {categories.map((category) => {
              const itemsInCategory = menu.filter((item) => item.category === category.name);
              if (itemsInCategory.length === 0) return null;

              return (
                <Box key={category.id} id={category.id} ref={(el) => (categoryRefs.current[category.id] = el)}>
                  <Heading size="lg" mb={4}>{category.name}</Heading>
                  <VStack spacing={4} align="stretch">
                    {itemsInCategory.map((item) => (
                      <Flex key={item.id} p={3} bg="white" borderRadius="md" boxShadow="sm" align="center">
                        <VStack align="flex-start" flex="1"><Text fontWeight="bold">{item.name}</Text><Text fontSize="sm" color="gray.600">{item.description}</Text><Text fontWeight="bold" color="green.500" pt={2}>{item.price}</Text></VStack>
                        <HStack spacing={4}>
                          <Image src={item.img} alt={item.name} boxSize="80px" objectFit="cover" borderRadius="md" />
                          <IconButton icon={<FaPlus />} isRound colorScheme="green" aria-label="Ajouter au panier"
                            onClick={() => handleAddToCart(item)}
                          />
                        </HStack>
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              );
            })}
          </VStack>
        </Flex>
      </Box>
      
      <CardModal isOpen={isCartOpen} onClose={onCartClose} cart={cart} setCart={setCart} />
    </Box>
  );
}