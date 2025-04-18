import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex-1">
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <motion.a 
              className="font-poppins font-bold text-2xl text-[#FF6B6B] tracking-wide cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              NOSSO CARDÁPIO
            </motion.a>
          </Link>
        </div>
        
        <div className="flex-1 flex justify-end">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-700 relative"
            >
              <ShoppingCart className="h-6 w-6" />
              <motion.span 
                key={totalItems}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            </Button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-white"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <nav className="py-4 px-6 flex flex-col gap-4">
            <a href="#categorias" className="text-gray-800 hover:text-[#FF6B6B]" onClick={() => setMobileMenuOpen(false)}>
              Categorias
            </a>
            <a href="#destaques" className="text-gray-800 hover:text-[#FF6B6B]" onClick={() => setMobileMenuOpen(false)}>
              Destaques
            </a>
            <a href="#produtos" className="text-gray-800 hover:text-[#FF6B6B]" onClick={() => setMobileMenuOpen(false)}>
              Produtos
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
