import { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import logoIcon from '../../assets/images/logo1.png';

export function HeaderLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const rafRef = useRef<number | null>(null);

  const toggleMenu = () => setIsMenuOpen(v => !v);

  useEffect(() => {
    const calc = () => {
      const doc = document.documentElement;
      const scrollTop   = doc.scrollTop || document.body.scrollTop || 0;
      const scrollHeight = doc.scrollHeight || document.body.scrollHeight || 1;
      const clientHeight = doc.clientHeight || window.innerHeight || 1;
      const max = Math.max(1, scrollHeight - clientHeight);
      const p = Math.min(1, Math.max(0, scrollTop / max));
      setProgress(p);
      setIsScrolled(scrollTop > 50);
      rafRef.current = null;
    };

    const onScroll = () => {
      // троттлим через rAF, чтобы не дергать setState слишком часто
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(calc);
      }
    };

    // посчитать один раз при монтировании
    calc();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // опционально: клик по полоске — «промотать» к месту
  const onDividerClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const doc = document.documentElement;
    const max = (doc.scrollHeight - doc.clientHeight);
    window.scrollTo({ top: max * ratio, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`${styles['header']} ${isScrolled ? styles['scrolled'] : ''} ${isMenuOpen ? styles['menu-open'] : ''}`}
      >
        <div className='container'>
          <div className={styles['header-box']}>
            <a href="/" className={styles['logo']}>
              <img className={styles['logo-img']} src={logoIcon} alt="Логотип АЦР" />
            </a>

            {/* divider теперь — трек + заполнение */}
            <div
              className={styles['divider']}
              onClick={onDividerClick}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              aria-label="Прогресс прокрутки страницы"
            >
              <span
                className={styles['divider-fill']}
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>

            <button
              className={`${styles['burger']} ${isMenuOpen ? styles['burger-active'] : ''} ${isScrolled ? styles['burger-scrolled'] : ''}`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
              aria-controls="fullscreen-nav"
            >
              <span className={styles['burger-line']}></span>
              <span className={styles['burger-line']}></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`${styles['menu-overlay']} ${isMenuOpen ? styles['menu-overlay-active'] : ''}`}>
        <div className={styles['menu-content']}>
          <nav id="fullscreen-nav" className={styles['fullscreen-nav']}>
            <ul className={styles['fullscreen-nav-list']}>
              <li><a href="/stocks" style={{color:"var(--accent-light)"}} className={styles['fullscreen-nav-link']}>Акции</a></li>
              <li><a href="/services" className={styles['fullscreen-nav-link']}>Услуги</a></li>

              <li><a href="/developers" className={styles['fullscreen-nav-link']}>Команда</a></li>
              <li><a href="/company" className={styles['fullscreen-nav-link']}>О компании</a></li>
            </ul>
          </nav>

          <div className={styles['contact-info']}>
            <div className={styles['contact-column']}>
              <a href="tel:+79656966565"><p className={styles['contact-item']}>+7 (965) 696-65-65</p></a>
              <a href="mailto:acr-agency@yandex.ru"><p className={styles['contact-item']}>acr-agency@yandex.ru</p></a>
            </div>
            <div className={styles['contact-column']}>
              <a href="https://yandex.ru/maps/195/ulyanovsk/?ll=48.370973%2C54.333762&mode=whatshere&whatshere%5Bpoint%5D=48.370999%2C54.333752&whatshere%5Bzoom%5D=17&z=17">
                <p className={styles['contact-item']}>г. Ульяновск, ул. Чайковского, д. 1</p>
              </a>
              <p className={styles['contact-item']}>Пн-Пт: 9:00-18:00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
