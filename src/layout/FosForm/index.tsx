import { Phone, Mail, MapPin, Send, TimerIcon } from 'lucide-react';
import { useState } from 'react';
import './scss/style.scss';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.acr-agency.ru/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', contact: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-section">
      {/* Large background text */}
      <div className="contact-section__background">
        <span className="contact-section__background-text">
          24/7
        </span>
      </div>

      {/* Floating particles/stars */}
      <div className="contact-section__particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="contact-section__particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container">
        {/* Title */}
        <h2 className="glossy-lite text-silver-blue-dark h2">
          Свяжитесь с нами
        </h2>

        <div className="contact-section__content">
          {/* Left side - Contact Info */}
          <div className="contact-section__info">
            <div>
              <h3 className="contact-section__subtitle">Наши контакты:</h3>
              
              <div className="contact-section__contacts">
                {/* Phone */}
                <a href="tel:+79656966565" className="contact-section__contact-item">
                  <div className="contact-section__icon-wrapper">
                    <Phone className="contact-section__icon" />
                  </div>
                  <span className="contact-section__contact-text hov">8-965-696-65-65</span>
                </a>

                {/* Email */}
                <a href="mailto:acr-agency@yandex.ru" className="contact-section__contact-item">
                  <div className="contact-section__icon-wrapper">
                    <Mail className="contact-section__icon" />
                  </div>
                  <span className="contact-section__contact-text hov">acr-agency@yandex.ru</span>
                </a>

                {/* Address */}
                <a href="https://yandex.ru/maps/195/ulyanovsk/?ll=48.370973%2C54.333762&mode=whatshere&whatshere%5Bpoint%5D=48.370999%2C54.333752&whatshere%5Bzoom%5D=17&z=17" className="contact-section__contact-item">
                  <div className="contact-section__icon-wrapper">
                    <MapPin className="contact-section__icon" />
                  </div>
                  <span className="contact-section__contact-text hov">г. Ульяновск, ул. Чайковского, д. 1</span>
                </a>
                 <div className="contact-section__contact-item">
                  <div className="contact-section__icon-wrapper">
                    <TimerIcon className="contact-section__icon" />
                  </div>
                  <span className="contact-section__contact-text">Пн-Пт: 9:00 - 18:00</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="contact-section__social">
              <h4 className="contact-section__social-title">Социальные сети</h4>
              <div className="contact-section__social-links">
                <a href="https://t.me/KP888_Bot" className="contact-section__social-link">
                  <Send className="contact-section__social-icon" />
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="contact-section__form-wrapper">
            {/* Decorative border */}
            <div className="contact-section__form-border" />
            
            <div>
              <h3 className="contact-section__subtitle">Форма обратной связи:</h3>
              
              {/* Сообщения о статусе отправки */}
              {submitStatus === 'success' && (
                <div className="contact-section__alert contact-section__alert--success">
                  Сообщение успешно отправлено!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="contact-section__alert contact-section__alert--error">
                  Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-section__form">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="contact-section__input"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Ваш email или телефон"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="contact-section__input"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <textarea
                    placeholder="сообщение"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="contact-section__textarea"
                    required
                    disabled={isLoading}
                  />
                </div>

                <button 
                  type="submit"
                  className="contact-section__submit-button butt"
                  disabled={isLoading}
                >
                  <span>
                    {isLoading ? 'Отправка...' : 'Отправить сообщение'}
                  </span>
                </button>

                <p className="contact-section__privacy-text">
                  Нажимая "Оставить связщение", вы соглашаетесь с <a className='hov' href="/soglasie-obrabotka-pers-dannih">Политикой конфиденциальность.</a>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="contact-section__map">
          <div className="contact-section__map-overlay" />
          
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A148b4d8d414a5d6710d30e4ed0cd3105f6c07ae2a085ef7f991f8776be183475&amp;source=constructor"
            title="Карта расположения компании"
            loading="lazy"
            width="100%"
            height="400"
          ></iframe>
          
          <svg className="contact-section__map-lines">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00bfff" stopOpacity="0" />
                <stop offset="50%" stopColor="#00bfff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00bfff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,100 Q200,50 400,100 T800,100" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
            <path d="M0,150 Q300,100 600,150 T1200,150" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
            <path d="M800,50 Q600,100 400,50 T0,50" stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>
    </section>
  );
}