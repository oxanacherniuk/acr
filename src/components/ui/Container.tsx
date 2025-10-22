interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Container({
  children,
  title,
  className = "",
}: ContainerProps) {
  return (
    <div className={`container ${className}`}>
      {title && <h3 className="text-silver">{title}</h3>}
      {children}
    </div>
  );
}