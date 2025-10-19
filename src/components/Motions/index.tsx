import { motion } from 'framer-motion';
import type { ReactElement } from 'react';

export const MoveUp = ({
  children,
  delays = 0,
  opacity = 0.8,
  duration= 0.8,
  className = ''
}: {
  children: ReactElement;
  delays?: number;
  opacity?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: opacity, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: duration, 
      delay: delays
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeInUp = ({
  children,
  delay = 0,
  distance = -600,     // насколько «снизу» вылетает
  duration = 0.5,
  className = '',
}: {
  children: ReactElement;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: distance, scale:0.95 }}
    whileInView={{ opacity: 1, y: 0, scale:1 }}
    viewport={{ once: true, amount: 0.1 }}  // появляется, когда 20% блока видно
    transition={{
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1],           // плавное cubic-bezier движение
    }}
    className={className}
  >
    {children}
  </motion.div>
);
export const FadeIn =({
  children,
  delays = 0,
  className = ''
}: {
  children: ReactElement;
  delays?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0  }}
    whileInView={{ opacity: 1}}
    viewport={{ once: true}}
    transition={{ 
      duration: 2, 
      delay:delays
    }}
    className={className ? className :''}

  >
    {children}
  </motion.div>
);


export const MoveLeft = ({
  children,
  delays = 0,
  className = ''
}: {
  children: ReactElement;
  delays?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, }}
    transition={{ 
      duration: 0.6, 
      delay:delays
    }}
    className={className ? className :''}
    
  >
    {children}
  </motion.div>
);