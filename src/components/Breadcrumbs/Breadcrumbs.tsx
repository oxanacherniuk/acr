import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumbs.scss'; // Импорт SCSS файла
import logoIcon from '../../assets/images/logo1.png';

export interface BreadcrumbItem {
  label: string | null;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  homeHref?: string;
  homeLabel?: string;
  maxItems?: number;
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  separatorClassName?: string;
  truncationLabel?: string;
  ariaLabel?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = <ChevronRight size={16} />,
  showHome = true,
  homeHref = '/',
  homeLabel = 'Главная',
  maxItems,
  className = '',
  itemClassName = '',
  activeItemClassName = '',
  separatorClassName = '',
  truncationLabel = '...',
  ariaLabel = 'Хлебные крошки'
}) => {
  const getDisplayItems = (): BreadcrumbItem[] => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    const firstItems = items.slice(0, 1);
    const lastItems = items.slice(-(maxItems - 2));
    const truncatedItem: BreadcrumbItem = {
      label: truncationLabel,
      className: 'breadcrumbsItemTruncated'
    };

    return [...firstItems, truncatedItem, ...lastItems];
  };

  const displayItems = getDisplayItems();
  const isLastItem = (index: number) => index === displayItems.length - 1;

  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number) => {
    const isActive = isLastItem(index);
    const hasIcon = !!item.icon;
    
    const itemClasses = [
      'breadcrumbsItem',
      isActive && 'breadcrumbsItemActive',
      hasIcon && 'breadcrumbsItemWithIcon',
      !isActive && (item.href || item.onClick) && 'breadcrumbsItemClickable',
      item.className,
      isActive ? activeItemClassName : itemClassName
    ].filter(Boolean).join(' ');

    const content = (
      <>
        {item.icon && (
          <span className="breadcrumbsItemIcon">
            {item.icon}
          </span>
        )}
        <span className="breadcrumbsItemText">
          {item.label}
        </span>
      </>
    );

    if (isActive || !item.href) {
      return (
        <span 
          className={itemClasses}
          aria-current="page"
        >
          {content}
        </span>
      );
    }

    if (item.onClick) {
      return (
        <button
          type="button"
          onClick={item.onClick}
          className={itemClasses}
        >
          {content}
        </button>
      );
    }

    return (
      <a
        href={item.href}
        className={itemClasses}
      >
        {content}
      </a>
    );
  };

  return (
    <nav 
      className={`breadcrumbs ${className}`}
      aria-label={ariaLabel}
    >
      {showHome && (
        <>
          <a
            href={homeHref}
            className={`breadcrumbsHome ${itemClassName}`}
          >
            <img src={logoIcon} alt="" className='breadcrumbsHomeIcon' />
            {homeLabel}
          </a>
          <span className={`breadcrumbsSeparator ${separatorClassName}`}>
            {separator}
          </span>
        </>
      )}

      {displayItems.map((item, index) => (
        <div key={index} className="breadcrumbsWrapper">
          {renderBreadcrumbItem(item, index)}
          {!isLastItem(index) && (
            <span className={`breadcrumbsSeparator ${separatorClassName}`}>
              {separator}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;