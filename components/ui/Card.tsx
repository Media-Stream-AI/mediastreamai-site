// components/ui/Card.tsx
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({ children, hover = true, className = '' }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      className={`glass-night rounded-2xl border border-hair p-6 ${hover ? 'card-hover' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
