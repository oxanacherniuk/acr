import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import s from "../../styles/ServicePage.module.css";

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'url'; // Добавляем url тип
  label?: string;
  placeholder: string;
  validation: any;
  options?: { value: string; label: string }[];
}

export interface ContactFormProps {
  title?: string;
  description?: string;
  additionalText?: string;
  fields?: FormField[];
  submitText?: string;
  submittingText?: string;
  privacyText?: string;
  onSubmitSuccess?: (data: any) => void;
  onSubmitError?: (error: any) => void;
  apiUrl?: string;
}

// Базовые поля которые всегда есть
const baseFields: FormField[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Ваше имя',
    validation: yup
      .string()
      .required('Имя обязательно для заполнения')
      .min(2, 'Имя должно содержать минимум 2 символа')
      .max(50, 'Имя слишком длинное')
      .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя может содержать только буквы'),
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Ваш e-mail',
    validation: yup
      .string()
      .required('Email обязателен для заполнения')
      .email('Введите корректный email адрес'),
  },
  {
    name: 'phone',
    type: 'tel',
    placeholder: 'Ваш номер телефона',
    validation: yup
      .string()
      .required('Телефон обязателен для заполнения')
      .min(4, 'Телефон должен содержать минимум 4 цифры')
      .transform((value) => value.replace(/\D/g, '')),
  },
];

export function ContactForm({
  title = "Получить бесплатную консультацию",
  description = "Наш специалист свяжется с вами в течение 15 минут",
  additionalText, // Добавляем новый пропс
  fields = baseFields,
  submitText = "Получить консультацию",
  submittingText = "Отправка...",
  privacyText = "Отправляя заявку, вы соглашаетесь с Политикой обработки персональных данных и Правилами пользования сайта",
  onSubmitSuccess,
  onSubmitError,
  apiUrl = '/api/fos',
}: ContactFormProps) {
  const validationSchema = yup.object(
    fields.reduce((schema, field) => {
      schema[field.name] = field.validation;
      return schema;
    }, {} as any)
  );

  type FormData = yup.InferType<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: fields.reduce((defaults, field) => {
      defaults[field.name] = '';
      return defaults;
    }, {} as any),
  });

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

  const onSubmit = async (data: FormData) => {
    try {
      const formattedData = {
        ...data,
        phone: data.phone?.replace(/\D/g, '') || '',
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof window !== 'undefined' ? document.referrer || '' : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        ...getUTMParams(),
      };

      console.log('Данные для отправки:', formattedData);

      const response = await axios.post(apiUrl, formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert('Замечательно! Мы скоро с Вами свяжемся');
        reset();
        onSubmitSuccess?.(formattedData);
      } else {
        throw new Error(response.data.error || 'Ошибка при отправке формы');
      }
      
    } catch (error) {
      console.error('Ошибка отправки:', error);
      
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
      
      onSubmitError?.(error);
    }
  };

  const renderField = (field: FormField) => {
    const error = errors[field.name as keyof FormData];

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            className={`${s['contact-input']} ${error ? s['input-error'] : ''}`}
            {...register(field.name as any)}
            rows={4}
          />
        );
      
      case 'select':
        return (
          <select
            className={`${s['contact-input']} ${error ? s['input-error'] : ''}`}
            {...register(field.name as any)}
          >
            <option value="">{field.placeholder}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            placeholder={field.placeholder}
            className={`${s['contact-input']} ${error ? s['input-error'] : ''}`}
            type={field.type}
            {...register(field.name as any)}
          />
        );
    }
  };

  return (
    <div className={s['info-section']}>
      {title && <h3 className='glossy-lite text-silver-blue-dark h2'>{title}</h3>}
      {description && <p className={s['info-section__text']}>{description}</p>}
      
      {/* Добавляем отображение дополнительного текста */}
      {additionalText && (
        <p className={s['additional-text']}>{additionalText}</p>
      )}
      
      <form 
        className={s['contact-form']} 
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {fields.map((field) => (
          <div key={field.name} className={s['input-group']}>
            {renderField(field)}
            {errors[field.name as keyof FormData] && (
              <span className={s['error-message']} role="alert">
                {(errors[field.name as keyof FormData] as any)?.message}
              </span>
            )}
          </div>
        ))}
        
        <div className={s['form-footer']}>
          <span className={s['privacy-text']}>
            {privacyText}
          </span>
          
          <button 
            type="submit" 
            className={s['contact-button']}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? submittingText : submitText}
          </button>
        </div>
      </form>
    </div>
  );
}