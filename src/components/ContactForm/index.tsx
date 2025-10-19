// components/ContactForm/ContactForm.tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './ContactForm.module.css';

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

interface ContactFormProps {
    title: string;
    description: string;
    buttonText?: string;
    onSubmit: (data: any) => Promise<void>;
    showPrivacy?: boolean;
    privacyText?: string;
}

export function ContactForm({ 
    title, 
    description, 
    buttonText = "Оставить заявку",
    onSubmit,
    showPrivacy = true,
    privacyText = "Отправляя заявку, вы соглашаетесь с Политикой обработки персональных данных и Правилами пользования сайта"
}: ContactFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone: ''
        }
    });

    const handleFormSubmit = async (data: any) => {
        try {
            await onSubmit(data);
            reset();
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
        }
    };

    return (
        <div className={styles['info-section']}>
            <h3>{title}</h3>
            <p>{description}</p>
            
            <form 
                className={styles['contact-form']} 
                onSubmit={handleSubmit(handleFormSubmit)}
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
                    {showPrivacy && (
                        <p className={styles['privacy-text']}>
                            {privacyText}
                        </p>
                    )}
                    
                    <button 
                        type="submit" 
                        className={styles['contact-button']}
                        disabled={isSubmitting || !isValid}
                    >
                        {isSubmitting ? 'Отправка...' : buttonText}
                    </button>
                </div>
            </form>
        </div>
    );
}