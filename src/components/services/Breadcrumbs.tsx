import { Container } from "../ui/Container";

interface BreadcrumbLink {
  href: string;
  label: string;
  className?: string;
}

interface BreadcrumbsProps {
  title: string;
  links?: BreadcrumbLink[];
  className?: string;
}

export function Breadcrumbs({ 
  title, 
  links = [], 
  className = ""
}: BreadcrumbsProps) {
  return (
    <Container className={className}>
      <div className="breadCrumbs">
        <a className="breadCrumbs-item" href="/services">услуги</a>
        <span>|</span>
        <p className="breadCrumbs-item end">{title}</p>

        {links.map((link, index) => (
          < >
            <a 
            key={link.href}
              className={`breadCrumbs-item ${link.className || ''}`} 
              href={link.href}
            >
              {link.label}
            </a>
            {index < links.length - 1 && <span>|</span>}
          </>
        ))}
      </div>
    </Container>
  );
}