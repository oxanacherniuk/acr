import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import styles from './ContactForm.module.css';
import type { ContactFormData } from '../../types/fos';
import GradientHeadingLite from '../../components/GradientHeading/GradientHeading';

const schema = yup.object({
    name: yup
        .string()
        .required('Имя обязательно для заполнения')
        .min(2, 'Имя должно содержать минимум 2 символа')
        .max(50, 'Имя слишком длинное')
        .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя может содержать только буквы'),
    email: yup
        .string()
        .required('Email обязателен для заполнения')
        .email('Введите корректный email адрес'),
    phone: yup
        .string()
        .required('Телефон обязателен для заполнения')
        .min(4, 'Телефон должен содержать минимум 4 цифры')
        .transform((value) => value.replace(/\D/g, '')) 
});

export function ContactLayout() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<ContactFormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone: ''
        }
    });

    // Функция для получения UTM параметров из URL
    const getUTMParams = () => {
        if (typeof window === 'undefined') return {};
        
        const urlParams = new URLSearchParams(window.location.search);
        return {
            utm_source: urlParams.get('utm_source') || undefined,
            utm_medium: urlParams.get('utm_medium') || undefined,
            utm_campaign: urlParams.get('utm_campaign') || undefined,
            utm_term: urlParams.get('utm_term') || undefined,
            utm_content: urlParams.get('utm_content') || undefined,
        };
    };

    const onSubmit = async (data: ContactFormData) => {
        try {
            // Форматируем телефон и собираем все данные для таблицы
            const formattedData = {
                name: data.name,
                email: data.email,
                phone: data.phone.replace(/\D/g, ''),
                page_url: window.location.href,
                referrer: document.referrer || '',
                user_agent: navigator.userAgent,
                ...getUTMParams()
            };

            console.log('Данные для отправки:', formattedData);
            // const URL = '/api/fos';
            const URL = 'http://localhost:3010/api/fos';
            // Отправляем данные на API
            const response = await axios.post(URL, formattedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                alert('Замечательно! Мы скоро с Вами свяжемся');
                reset();
            } else {
                throw new Error(response.data.error || 'Ошибка при отправке формы');
            }
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            
            // Обрабатываем ошибки axios
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    alert(`Ошибка: ${error.response.data.error || 'Произошла ошибка при отправке формы'}`);
                } else if (error.request) {
                    alert('Не удалось соединиться с сервером. Проверьте подключение к интернету.');
                } else {
                    alert('Произошла ошибка при отправке формы');
                }
            } else {
                alert('Произошла непредвиденная ошибка');
            }
        }
    };

    return (
        <div className={styles['contact']} id='contact'>
            <div className='container'>
                 <GradientHeadingLite
          as="p"
          className="h2"
          blueBoost={20}
          track="viewport"
          baseAngle={25}
        >
        связаться
        </GradientHeadingLite>
                
                <div className={styles['contact-box']}>
                    <form 
                        className={styles['contact-form']} 
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <div className={styles['input-group']}>
                            <input 
                                placeholder='Ваше имя' 
                                className={`${styles['contact-input']} ${errors.name ? styles['input-error'] : ''}`}
                                type="text"
                                {...register('name')}
                            />
                            {errors.name && (
                                <span className={styles['error-message']} role="alert">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>
                        
                        <div className={styles['input-group']}>
                            <input 
                                placeholder='Ваш e-mail' 
                                className={`${styles['contact-input']} ${errors.email ? styles['input-error'] : ''}`}
                                type="email"
                                {...register('email')}
                            />
                            {errors.email && (
                                <span className={styles['error-message']} role="alert">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        
                        <div className={styles['input-group']}>
                            <input 
                                placeholder='Ваш номер телефона' 
                                className={`${styles['contact-input']} ${errors.phone ? styles['input-error'] : ''}`}
                                type="tel"
                                {...register('phone')}
                            />
                            {errors.phone && (
                                <span className={styles['error-message']} role="alert">
                                    {errors.phone.message}
                                </span>
                            )}
                        </div>
                        
                        <div className={styles['form-footer']}>
                            <p className={styles['privacy-text']}>
                                Отправляя заявку, вы соглашаетесь с Политикой обработки персональных данных и Правилами пользования сайта
                            </p>
                            
                            <button 
                                type="submit" 
                                className={styles['contact-button']}
                                disabled={isSubmitting || !isValid}
                            >
                                {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}