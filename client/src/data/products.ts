import { Product } from '@shared/schema';

export const products: Product[] = [
  {
    id: 1,
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela, manjericão fresco e azeite.',
    price: 49.90,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'pizza',
    featured: true,
    ingredients: [
      'Molho de tomate',
      'Mussarela',
      'Manjericão fresco',
      'Azeite de oliva'
    ],
    sizes: ['Pequena', 'Média', 'Grande'],
    options: []
  },
  {
    id: 2,
    name: 'Pizza Pepperoni',
    description: 'Molho de tomate, mussarela e pepperoni.',
    price: 52.90,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'pizza',
    featured: false,
    ingredients: [
      'Molho de tomate',
      'Mussarela',
      'Pepperoni'
    ],
    sizes: ['Pequena', 'Média', 'Grande'],
    options: []
  },
  {
    id: 3,
    name: 'Pizza Vegetariana',
    description: 'Molho de tomate, mussarela, pimentão, cebola, azeitona e champignon.',
    price: 48.90,
    image: 'https://images.unsplash.com/photo-1595854341625-f33e596b236d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'pizza',
    featured: false,
    ingredients: [
      'Molho de tomate',
      'Mussarela',
      'Pimentão',
      'Cebola',
      'Azeitona',
      'Champignon'
    ],
    sizes: ['Pequena', 'Média', 'Grande'],
    options: []
  },
  {
    id: 4,
    name: 'Burger Clássico',
    description: 'Hambúrguer, queijo, alface, tomate e molho especial.',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'burger',
    featured: false,
    ingredients: [
      'Pão',
      'Hambúrguer 150g',
      'Queijo cheddar',
      'Alface',
      'Tomate',
      'Molho especial'
    ],
    sizes: [],
    options: ['Com bacon', 'Sem bacon']
  },
  {
    id: 5,
    name: 'Burger Duplo',
    description: 'Dois hambúrgueres, queijo cheddar, bacon crocante e molho especial.',
    price: 35.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'burger',
    featured: true,
    ingredients: [
      'Pão',
      '2 Hambúrgueres 150g',
      'Queijo cheddar',
      'Bacon crocante',
      'Molho especial'
    ],
    sizes: [],
    options: ['Com cebola caramelizada', 'Sem cebola caramelizada']
  },
  {
    id: 6,
    name: 'Burger Vegetariano',
    description: 'Hambúrguer de legumes, queijo, alface, tomate e cebola caramelizada.',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'burger',
    featured: false,
    ingredients: [
      'Pão',
      'Hambúrguer de legumes',
      'Queijo',
      'Alface',
      'Tomate',
      'Cebola caramelizada'
    ],
    sizes: [],
    options: []
  },
  {
    id: 7,
    name: 'Spaghetti Carbonara',
    description: 'Massa fresca com molho cremoso, bacon e gema de ovo.',
    price: 39.90,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'pasta',
    featured: false,
    ingredients: [
      'Spaghetti',
      'Bacon',
      'Gema de ovo',
      'Queijo parmesão',
      'Pimenta preta'
    ],
    sizes: ['Meia porção', 'Porção completa'],
    options: []
  },
  {
    id: 8,
    name: 'Fettuccine Alfredo',
    description: 'Massa com molho cremoso de queijo parmesão e manteiga.',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'pasta',
    featured: false,
    ingredients: [
      'Fettuccine',
      'Manteiga',
      'Creme de leite',
      'Queijo parmesão',
      'Noz-moscada'
    ],
    sizes: ['Meia porção', 'Porção completa'],
    options: ['Com frango', 'Sem frango']
  },
  {
    id: 9,
    name: 'Limonada Especial',
    description: 'Limão, hortelã, açúcar e água com gás.',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'drink',
    featured: false,
    ingredients: [
      'Limão',
      'Hortelã',
      'Açúcar',
      'Água com gás'
    ],
    sizes: ['300ml', '500ml'],
    options: []
  },
  {
    id: 10,
    name: 'Sorvete Especial',
    description: 'Três bolas de sorvete com calda quente de chocolate e chantilly.',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'dessert',
    featured: true,
    ingredients: [
      'Sorvete',
      'Calda de chocolate',
      'Chantilly',
      'Cereja'
    ],
    sizes: [],
    options: ['Baunilha', 'Chocolate', 'Morango', 'Misto']
  },
  {
    id: 11,
    name: 'Brownie com Sorvete',
    description: 'Brownie de chocolate com sorvete de baunilha e calda.',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'dessert',
    featured: false,
    ingredients: [
      'Brownie',
      'Sorvete de baunilha',
      'Calda de chocolate'
    ],
    sizes: [],
    options: []
  },
  {
    id: 12,
    name: 'Pizza Quatro Queijos',
    description: 'Molho de tomate, mussarela, provolone, parmesão e gorgonzola.',
    price: 54.90,
    image: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'pizza',
    featured: false,
    ingredients: [
      'Molho de tomate',
      'Mussarela',
      'Provolone',
      'Parmesão',
      'Gorgonzola'
    ],
    sizes: ['Pequena', 'Média', 'Grande'],
    options: []
  },
  {
    id: 13,
    name: 'Burger Artesanal',
    description: 'Hambúrguer artesanal, queijo especial, rúcula, tomate seco e maionese caseira.',
    price: 38.90,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'burger',
    featured: false,
    ingredients: [
      'Pão artesanal',
      'Hambúrguer 180g',
      'Queijo especial',
      'Rúcula',
      'Tomate seco',
      'Maionese caseira'
    ],
    sizes: [],
    options: ['Ponto ao ponto', 'Bem passado']
  },
  {
    id: 14,
    name: 'Mousse de Chocolate',
    description: 'Mousse cremoso de chocolate meio amargo com raspas de chocolate.',
    price: 16.90,
    image: 'https://images.unsplash.com/photo-1511797420914-0ff981da8ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'dessert',
    featured: false,
    ingredients: [
      'Chocolate meio amargo',
      'Creme de leite',
      'Açúcar',
      'Raspas de chocolate'
    ],
    sizes: [],
    options: []
  },
  {
    id: 15,
    name: 'Suco Natural',
    description: 'Suco natural de frutas da estação.',
    price: 9.90,
    image: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'drink',
    featured: false,
    ingredients: [
      'Frutas frescas',
      'Água',
      'Açúcar (opcional)'
    ],
    sizes: ['300ml', '500ml'],
    options: ['Laranja', 'Abacaxi', 'Morango', 'Maracujá']
  }
];
