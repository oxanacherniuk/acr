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
      {title && <h3 className="glossy-lite text-silver-blue-dark h2">{title}</h3>}
      {children}
    </div>
  );
}