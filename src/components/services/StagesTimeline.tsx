import { useRef } from 'react';
import s from "../../styles/ServicePage.module.css";

export interface TimelineItem {
  stage: string;
  title: string;
  description: string;
}

export interface StagesTimelineProps {
  title: string;
  stages: TimelineItem[];
}

export function StagesTimeline({ title, stages }: StagesTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (timelineRef.current?.offsetLeft || 0);
    scrollLeft.current = timelineRef.current?.scrollLeft || 0;
    if (timelineRef.current) {
      timelineRef.current.style.cursor = 'grabbing';
      timelineRef.current.style.scrollBehavior = 'auto';
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (timelineRef.current) {
      timelineRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (timelineRef.current) {
      timelineRef.current.style.cursor = 'grab';
      timelineRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    timelineRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (timelineRef.current) {
      const scrollAmount = 300;
      timelineRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={s['info-section__stages']}>
      <h3 className='glossy-lite text-silver-blue-dark h2'>{title}</h3>
      
      <div className={s['timeline-container']}>
        <button 
          className={s['timeline-nav-button']}
          onClick={() => scroll('left')}
          aria-label="Предыдущие этапы"
        >
          ‹
        </button>
        
        <div
          ref={timelineRef}
          className={s['timeline']}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {stages.map((stage, index) => (
            <div key={index} className={s['timeline-item']}>
              <span className={s['timeline-days']}>{stage.stage}</span>
              <h4>{stage.title}</h4>
              <p>{stage.description}</p>
            </div>
          ))}
        </div>

        <button 
          className={s['timeline-nav-button']}
          onClick={() => scroll('right')}
          aria-label="Следующие этапы"
        >
          ›
        </button>
      </div>
    </div>
  );
}