import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header/Header';
import CategoryList from '@/components/CategoryList/CategoryList';
import MenuItemCard from '@/components/MenuItemCard/MenuItemCard';
import MenuItemModal from '@/components/MenuItemModal/MenuItemModal';
import { products } from '@/data/products';
import { Product } from '@shared/schema';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    // Filter products by selected category
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
    
    // Filter featured products
    setFeaturedProducts(products.filter(product => product.featured));
  }, [selectedCategory]);
  
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    
    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <section className="py-16 md:py-24 text-center text-white bg-cover bg-center"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")' 
          }}
        >
          <div className="container mx-auto px-4">
            <motion.h1 
              className="font-poppins font-bold text-4xl md:text-5xl mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              NOSSO CARDÁPIO
            </motion.h1>
            <motion.p
              className="font-inter text-lg md:text-xl max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Pratos deliciosos para todos os gostos. Feitos com ingredientes selecionados e muito carinho.
            </motion.p>
          </div>
        </section>
        
        <section id="categorias" className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-poppins font-bold text-3xl text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Categorias
            </motion.h2>
            
            <CategoryList 
              onSelectCategory={handleSelectCategory} 
              selectedCategory={selectedCategory} 
            />
          </div>
        </section>
        
        <section id="destaques" className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-poppins font-bold text-3xl text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Destaques
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map(product => (
                <MenuItemCard 
                  key={product.id} 
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section id="products" className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-poppins font-bold text-3xl text-center mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s` 
                : 'Todos os Produtos'
              }
            </motion.h2>
            
            <p className="text-center text-gray-600 mb-8">
              {selectedCategory 
                ? `Mostrando produtos da categoria ${selectedCategory}` 
                : 'Mostrando todos os produtos'
              }
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <MenuItemCard 
                    key={product.id} 
                    product={product}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-10">
        <div className="container mx-auto px-4 text-center">
          <div className="font-poppins font-bold text-2xl mb-4 text-[#FF6B6B]">NOSSO CARDÁPIO</div>
          <p className="mb-6 text-gray-300">Pratos deliciosos para todos os gostos.</p>
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm5.5 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 7.5c2.481 0 4.5 2.019 4.5 4.5s-2.019 4.5-4.5 4.5-4.5-2.019-4.5-4.5 2.019-4.5 4.5-4.5zm0 2c-1.379 0-2.5 1.121-2.5 2.5s1.121 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.121-2.5-2.5-2.5z"></path>
              </svg>
            </a>
          </div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} NOSSO CARDÁPIO - Todos os direitos reservados</p>
        </div>
      </footer>
      
      <MenuItemModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default Home;
