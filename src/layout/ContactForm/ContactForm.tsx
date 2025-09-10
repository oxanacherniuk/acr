import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './ContactForm.module.css';
import type { ContactFormData } from './formTypes';

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

    const onSubmit = async (data: ContactFormData) => {
        try {
            const formattedData = {
                ...data,
                phone: data.phone.replace(/\D/g, '')
            };

            console.log('Данные формы:', formattedData);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Замечательно! Мы скоро с Вами свяжемся');
            reset();
        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert('Произошла ошибка при отправке формы');
        }
    };

    return (
        <div className={styles['contact']} id='contact'>
            <div className='container'>
                <p className={styles['contact-title']}>связаться</p>
                
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