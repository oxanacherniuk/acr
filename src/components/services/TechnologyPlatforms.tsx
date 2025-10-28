import { FeatureGrid } from './FeatureGrid';

interface TechnologyPlatformsProps {
    title: string;
    description?: string;
    platforms: Array<{
        title: string;
        text: string;
    }>;
}

export function TechnologyPlatforms({ 
    title, 
    description,
    platforms 
}: TechnologyPlatformsProps) {
    return (
        <div>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            <FeatureGrid items={platforms} />
        </div>
    );
}