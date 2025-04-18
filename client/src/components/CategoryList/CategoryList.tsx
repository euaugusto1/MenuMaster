import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';

interface CategoryListProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory, onSelectCategory }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="mb-8">
      <motion.div 
        className="flex flex-nowrap md:flex-wrap overflow-x-auto md:justify-center pb-4 md:pb-0 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => (
          <motion.button
            key={category.slug}
            className={`flex-shrink-0 flex flex-col items-center p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-2 ${
              selectedCategory === category.slug 
                ? 'border-[#FF6B6B] bg-[#FF6B6B] text-white' 
                : 'border-transparent hover:border-[#FF6B6B]'
            } focus:outline-none min-w-[100px]`}
            onClick={() => onSelectCategory(category.slug)}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden mb-2">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-sm">{category.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryList;
