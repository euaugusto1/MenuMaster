import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Product } from '@shared/schema';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (isOpen && product) {
      // Reset states when modal opens
      setQuantity(1);
      
      // Initialize options
      const initialOptions: Record<string, string> = {};
      
      if (product.sizes && product.sizes.length > 0) {
        initialOptions.size = product.sizes[0];
      }
      
      if (product.options && product.options.length > 0) {
        initialOptions.option = product.options[0];
      }
      
      setSelectedOptions(initialOptions);
      
      // Prevent body scrolling
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen, product]);
  
  if (!isOpen || !product) return null;
  
  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      selectedOptions
    });
    
    onClose();
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="absolute top-3 right-3 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-200"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 md:h-full object-cover"
              />
              {product.featured && (
                <span className="absolute top-2 right-2 bg-[#FF6B6B] text-white text-xs font-bold px-2 py-1 rounded">
                  Destaque
                </span>
              )}
            </div>
            
            <div className="md:w-1/2 p-6">
              <h2 className="font-poppins font-bold text-2xl mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="mb-4">
                <span className="text-[#FF6B6B] font-bold text-2xl">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-poppins font-semibold text-lg mb-2">Ingredientes:</h3>
                  <ul className="text-gray-600">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="mb-1 flex items-start">
                        <span className="text-[#FF6B6B] mr-2">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-poppins font-semibold text-lg mb-2">Tamanho:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`py-2 px-4 rounded-md border-2 transition-colors duration-200 font-medium ${
                          selectedOptions.size === size 
                            ? 'border-[#FF6B6B] bg-[#FF6B6B] text-white' 
                            : 'border-gray-300 hover:border-[#FF6B6B]'
                        }`}
                        onClick={() => setSelectedOptions({ ...selectedOptions, size })}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {product.options && product.options.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-poppins font-semibold text-lg mb-2">Opções:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.options.map((option) => (
                      <button
                        key={option}
                        className={`py-2 px-4 rounded-md border-2 transition-colors duration-200 font-medium ${
                          selectedOptions.option === option 
                            ? 'border-[#FF6B6B] bg-[#FF6B6B] text-white' 
                            : 'border-gray-300 hover:border-[#FF6B6B]'
                        }`}
                        onClick={() => setSelectedOptions({ ...selectedOptions, option })}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-poppins font-semibold text-lg mb-2">Quantidade:</h3>
                <div className="flex items-center">
                  <button 
                    className="w-10 h-10 rounded-l-md bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white text-lg font-medium">
                    {quantity}
                  </div>
                  <button 
                    className="w-10 h-10 rounded-r-md bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <Button 
                variant="primary"
                className="w-full py-3 font-bold"
                onClick={handleAddToCart}
              >
                EU QUERO
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuItemModal;
