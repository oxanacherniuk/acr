import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AnimatedLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedLink({ to, children, className, onClick }: AnimatedLinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Добавляем класс для блокировки скролла
    document.body.classList.add('animating');
    
    if (onClick) {
      onClick();
    }

    // Задержка для начала анимации перед навигацией
    setTimeout(() => {
      navigate(to);
      // Убираем класс после завершения анимации
      setTimeout(() => {
        document.body.classList.remove('animating');
      }, 500);
    }, 100);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={className}
        onClick={handleClick}
      >
        {children}
      </Link>
    </motion.div>
  );
}