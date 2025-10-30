import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useCenteredTabs } from "../../hooks/useCenteredTabs";
import s from "../../styles/ServicePage.module.css";
import { NavigationButton } from "../NavigationButton/NavigationButton";

export interface TabItem {
  id: string;
  title: string;
  items: {
    text: string;
    subtext?: string;
  }[];
  additionalContent?: {
    result: string;
    target: string;
    price: string;
    buttonText: string;
    buttonLink: string;
  };
}

interface ServiceTabsProps {
  tabs: TabItem[];
  initialTab?: string;
}

export function ServiceTabs({ tabs, initialTab }: ServiceTabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.id);
  const isMobile = useIsMobile();
  const { headerRef, btnRefs } = useCenteredTabs(activeTab, isMobile);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      const centerTab = (btnRefs as any).centerTab;
      if (centerTab) centerTab(tabId);
    }
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);

  const renderItem = (item: { text: string; subtext?: string }, index: number) => (
    <li key={index}>
      {item.text}
      {item.subtext && (
        <>
          <br />
          <span className={s['tab-panel__subtext']}>{item.subtext}</span>
        </>
      )}
    </li>
  );

  return (
    <div className={s['tabs']}>
      <div className={s['tabs-header']} ref={headerRef}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => { (btnRefs as any).current[tab.id] = el; }}
            className={`${s['tab-button']} ${activeTab === tab.id ? s['active'] : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className={s['tabs-content']}>
        {currentTab && (
          <div className={s['tab-panel']}>
            <ul>
              {currentTab.items.map(renderItem)}
            </ul>
            
            {currentTab.additionalContent && (
              <div className={s['tab-additional-content']}>
                <h4 className={s['price-note']}>Результат:</h4>
                <p>{currentTab.additionalContent.result}</p>
                
                <h4 className={s['price-note']}>Кому подходит:</h4>
                <p>{currentTab.additionalContent.target}</p>
                
                <div className={s['price-inner']}>
                  <span className={s['main-price']}>{currentTab.additionalContent.price}</span>
                  <NavigationButton to={currentTab.additionalContent.buttonLink}>
                    {currentTab.additionalContent.buttonText}
                  </NavigationButton>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}