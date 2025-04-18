import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Product } from '@shared/schema';

interface MenuItemCardProps {
  product: Product;
  onClick: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      selectedOptions: {}
    });
  };
  
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.featured && (
          <span className="absolute top-2 right-2 bg-[#FF6B6B] text-white text-xs font-bold px-2 py-1 rounded">
            Destaque
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col h-[calc(100%-192px)]">
        <h3 className="font-poppins font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="font-semibold text-gray-800">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <Button 
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
          >
            EU QUERO
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
