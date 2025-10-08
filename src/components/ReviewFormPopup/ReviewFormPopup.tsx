import { useState, useRef, useEffect } from 'react';
import styles from './ReviewFormPopup.module.css';

interface ReviewFormPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ReviewFormPopup({ isOpen, onClose }: ReviewFormPopupProps) {
    const [selectedFileName, setSelectedFileName] = useState<string>('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFileName(file.name);
        } else {
            setSelectedFileName('');
        }
    };

    const handleCustomFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name.trim() || !message.trim()) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        setIsSubmitting(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Данные отзыва:', {
                name: name,
                message: message,
                photo: selectedFileName || 'Не прикреплено'
            });
            
            alert('Спасибо за ваш отзыв! Мы его рассмотрим и опубликуем.');
            
            setName('');
            setMessage('');
            setSelectedFileName('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            onClose();
        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert('Произошла ошибка при отправке отзыва');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePopupClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <div className={styles['popup-overlay']} onClick={onClose}>
            <div className={styles['popup-content']} onClick={handlePopupClick}>
                <button className={styles['popup-close']} onClick={onClose}>×</button>
                
                <div className={styles['popup-scroll-container']}>
                    <h2 className={styles['popup-title']}>Оставить отзыв</h2>
                    
                    <form className={styles['review-form']} onSubmit={handleSubmit}>
                        <div className={styles['input-group']}>
                            <div className={styles['file-upload-section']}>
                                <input
                                    type="file"
                                    id="photo"
                                    accept="image/*"
                                    className={styles['file-input']}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="button"
                                    className={styles['file-upload-button']}
                                    onClick={handleCustomFileButtonClick}
                                >
                                    Загрузить фото
                                </button>
                                {selectedFileName && (
                                    <span className={styles['file-name']}>{selectedFileName}</span>
                                )}
                            </div>
                        </div>

                        <div className={styles['input-group']}>
                            <input 
                                placeholder='Ваше имя' 
                                className={styles['form-input']}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles['input-group']}>
                            <textarea 
                                placeholder='Ваш отзыв' 
                                className={styles['form-textarea']}
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles['form-footer']}>
                            <p className={styles['privacy-text']}>
                                Отправляя отзыв, вы соглашаетесь с Политикой обработки персональных данных
                            </p>
                            
                            <button 
                                type="submit" 
                                className={styles['submit-button']}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'отправка...' : 'отправить отзыв'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}