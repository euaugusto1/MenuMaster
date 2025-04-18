import { db } from './db';
import { categories, products } from '@shared/schema';
import { slugify } from '../client/src/lib/utils';

async function seedDatabase() {
  try {
    console.log('Seeding database...');

    // Check if we already have data
    const existingCategories = await db.select().from(categories);
    if (existingCategories.length > 0) {
      console.log('Database already seeded. Skipping...');
      return;
    }

    // Seed categories
    const categoriesData = [
      { name: 'Lanches', image: '/images/categories/burgers.jpg', slug: 'lanches' },
      { name: 'Pizzas', image: '/images/categories/pizzas.jpg', slug: 'pizzas' },
      { name: 'Bebidas', image: '/images/categories/drinks.jpg', slug: 'bebidas' },
      { name: 'Sobremesas', image: '/images/categories/desserts.jpg', slug: 'sobremesas' },
      { name: 'Combos', image: '/images/categories/combos.jpg', slug: 'combos' },
    ];

    console.log('Inserting categories...');
    const insertedCategories = await db.insert(categories).values(categoriesData).returning();
    
    // Create a map of category slugs to IDs for easy lookup
    const categoryMap = new Map(insertedCategories.map(cat => [cat.slug, cat.id]));

    // Seed products
    const productsData = [
      // Lanches
      {
        name: 'X-Burger Tradicional',
        description: 'Hambúrguer artesanal, queijo cheddar, alface, tomate e maionese especial',
        price: 25.90,
        image: '/images/products/x-burger.jpg',
        categoryId: categoryMap.get('lanches')!,
        featured: true,
        ingredients: ['Pão brioche', 'Hambúrguer 150g', 'Queijo cheddar', 'Alface', 'Tomate', 'Maionese especial'],
        sizes: ['Médio', 'Grande'],
        options: ['Com bacon', 'Sem cebola', 'Sem picles'],
      },
      {
        name: 'X-Salada Especial',
        description: 'Hambúrguer artesanal, queijo cheddar, alface, tomate, cebola roxa e maionese verde',
        price: 27.90,
        image: '/images/products/x-salad.jpg',
        categoryId: categoryMap.get('lanches')!,
        featured: false,
        ingredients: ['Pão brioche', 'Hambúrguer 150g', 'Queijo cheddar', 'Alface', 'Tomate', 'Cebola roxa', 'Maionese verde'],
        sizes: ['Médio', 'Grande'],
        options: ['Com bacon', 'Sem cebola', 'Sem picles'],
      },
      {
        name: 'X-Bacon Premium',
        description: 'Hambúrguer artesanal, queijo cheddar, bacon crocante, alface, tomate e molho especial',
        price: 29.90,
        image: '/images/products/x-bacon.jpg',
        categoryId: categoryMap.get('lanches')!,
        featured: true,
        ingredients: ['Pão brioche', 'Hambúrguer 150g', 'Queijo cheddar', 'Bacon crocante', 'Alface', 'Tomate', 'Molho especial'],
        sizes: ['Médio', 'Grande'],
        options: ['Bacon extra', 'Sem cebola', 'Sem picles'],
      },
      
      // Pizzas
      {
        name: 'Pizza Margherita',
        description: 'Molho de tomate, mussarela, tomate, manjericão fresco e azeite',
        price: 45.90,
        image: '/images/products/pizza-margherita.jpg',
        categoryId: categoryMap.get('pizzas')!,
        featured: true,
        ingredients: ['Massa fresca', 'Molho de tomate', 'Mussarela', 'Tomate', 'Manjericão fresco', 'Azeite'],
        sizes: ['Média', 'Grande', 'Família'],
        options: ['Borda recheada', 'Extra mussarela', 'Sem manjericão'],
      },
      {
        name: 'Pizza Calabresa',
        description: 'Molho de tomate, mussarela, calabresa, cebola e orégano',
        price: 47.90,
        image: '/images/products/pizza-calabresa.jpg',
        categoryId: categoryMap.get('pizzas')!,
        featured: false,
        ingredients: ['Massa fresca', 'Molho de tomate', 'Mussarela', 'Calabresa', 'Cebola', 'Orégano'],
        sizes: ['Média', 'Grande', 'Família'],
        options: ['Borda recheada', 'Extra calabresa', 'Sem cebola'],
      },
      
      // Bebidas
      {
        name: 'Refrigerante Lata',
        description: 'Refrigerante em lata 350ml (Coca-Cola, Guaraná, Sprite)',
        price: 5.90,
        image: '/images/products/soda.jpg',
        categoryId: categoryMap.get('bebidas')!,
        featured: false,
        ingredients: [],
        sizes: [],
        options: ['Coca-Cola', 'Guaraná', 'Sprite', 'Coca Zero'],
      },
      {
        name: 'Suco Natural',
        description: 'Suco natural 500ml feito na hora',
        price: 9.90,
        image: '/images/products/juice.jpg',
        categoryId: categoryMap.get('bebidas')!,
        featured: true,
        ingredients: [],
        sizes: ['300ml', '500ml'],
        options: ['Laranja', 'Limão', 'Abacaxi', 'Maracujá'],
      },
      
      // Sobremesas
      {
        name: 'Pudim de Leite',
        description: 'Pudim de leite condensado com calda de caramelo',
        price: 12.90,
        image: '/images/products/pudding.jpg',
        categoryId: categoryMap.get('sobremesas')!,
        featured: true,
        ingredients: ['Leite condensado', 'Leite', 'Ovos', 'Calda de caramelo'],
        sizes: ['Individual', 'Para compartilhar'],
        options: [],
      },
      {
        name: 'Brownie com Sorvete',
        description: 'Brownie quentinho com sorvete de creme e calda de chocolate',
        price: 15.90,
        image: '/images/products/brownie.jpg',
        categoryId: categoryMap.get('sobremesas')!,
        featured: false,
        ingredients: ['Brownie caseiro', 'Sorvete de creme', 'Calda de chocolate'],
        sizes: ['Individual', 'Para compartilhar'],
        options: ['Sem calda', 'Calda extra', 'Com nozes'],
      },
      
      // Combos
      {
        name: 'Combo Casal',
        description: '2 hambúrgueres, 2 porções de batata frita e 2 refrigerantes',
        price: 69.90,
        image: '/images/products/combo-couple.jpg',
        categoryId: categoryMap.get('combos')!,
        featured: true,
        ingredients: ['2 X-Burgers', '2 Batatas fritas', '2 Refrigerantes lata'],
        sizes: [],
        options: ['Troca por X-Bacon (+R$8)', 'Troca por X-Salada (+R$4)'],
      },
      {
        name: 'Combo Família',
        description: '4 hambúrgueres, 2 porções grandes de batata frita e 1 refrigerante 2L',
        price: 119.90,
        image: '/images/products/combo-family.jpg',
        categoryId: categoryMap.get('combos')!,
        featured: false,
        ingredients: ['4 X-Burgers', '2 Batatas fritas grandes', '1 Refrigerante 2L'],
        sizes: [],
        options: ['Troca por X-Bacon (+R$16)', 'Troca por X-Salada (+R$8)'],
      },
    ];

    console.log('Inserting products...');
    await db.insert(products).values(productsData);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();