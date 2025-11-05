import TextEffect from '../../components/HoverText';
import styles from './Banner.module.css';
import { useEffect, useState } from 'react';

export function BannerLayout() {
    const [displayTextMini, setDisplayTextMini] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndexMini, setCurrentIndexMini] = useState(0);
    const [startMiniTyping, setStartMiniTyping] = useState(false);
    const fullText = "Разрабатываем";
    const fullTextMini = "эффективные цифровые продукты для бизнеса";

    useEffect(() => {
        if (currentIndex < fullText.length) {
            const timer = setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
            }, 100)

            return () => clearTimeout(timer);
        } else if (!startMiniTyping) {
            setStartMiniTyping(true);
        }
    }, [currentIndex, fullText, startMiniTyping]);

    useEffect(() => {
        if (startMiniTyping && currentIndexMini < fullTextMini.length) {
            const timer = setTimeout(() => {
                setDisplayTextMini(prev => prev + fullTextMini[currentIndexMini]);
                setCurrentIndexMini(prev => prev + 1);
            }, 50) 

            return () => clearTimeout(timer);
        }
    }, [currentIndexMini, fullTextMini, startMiniTyping]);

    return (
        <div className={styles['banner']}>
            <div className='container'>
                <div className={styles['banner-content']}>
                    <TextEffect text={fullText} className={styles['banner-bigtitle'] + " banner-subtitle"}/>
                    
                    <h1 className={styles['banner-title']}>
                        {displayTextMini}
                        {startMiniTyping && currentIndexMini < fullTextMini.length && <span className={styles['cursor']}>|</span>}
                    </h1>
                    <br />
                    <h2 className={styles['banner-subtitle']}>здесь ИИ встречается с живыми идеями</h2>
                </div>
            </div>
        </div>
    );
}