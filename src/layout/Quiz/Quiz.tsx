import { useState, useRef, useEffect, type JSX } from 'react';
import styles from './Quiz.module.css';

interface Answer {
    name?: string;
    organizationType?: string;
    hasWebsite?: string;
    websiteFeedback?: string;
    productService?: string;
    targetAudience?: string;
    businessTask?: string;
    userAction?: string;
    solutionType?: string;
}

interface Step {
    type: 'text' | 'options' | 'conditional';
    message: string | ((answers: Answer) => string);
    options?: string[];
    condition?: (answers: Answer) => boolean;
    key: keyof Answer;
}

interface ChatItem {
    step: number;
    question: string;
    answer: string;
    timestamp: Date;
}

export function QuizLayout() {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [answers, setAnswers] = useState<Answer>({});
    const [inputValue, setInputValue] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [showBotRedirect, setShowBotRedirect] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const steps: Step[] = [
        {
            type: 'text',
            message: 'Здравствуйте! Я помогу Вам создать сайт или настроить продвижение. Давайте начнем с нескольких вопросов. ✅ Как Вас зовут?',
            key: 'name'
        },
        {
            type: 'options',
            message: (answers: Answer) => `Я рад нашему знакомству, ${answers.name || ''}! Как называется ваша организация, и к какой категории она относится?`,
            options: ['Физическое лицо', 'ИП', 'Юридическое лицо', 'Другое'],
            key: 'organizationType'
        },
        {
            type: 'options',
            message: 'Отлично! У вас уже есть сайт?',
            options: ['Да', 'Нет'],
            key: 'hasWebsite'
        },
        {
            type: 'conditional',
            condition: (answers: Answer) => answers.hasWebsite === 'Да',
            message: 'Что вам нравится в вашем сайте, и что бы вы хотели изменить?',
            key: 'websiteFeedback'
        },
        {
            type: 'text',
            message: 'Какой продукт или услугу вы планируете продавать или рекламировать?',
            key: 'productService'
        },
        {
            type: 'text',
            message: 'Кто ваши идеальные клиенты? Например, их пол, возраст, род деятельности или интересы.',
            key: 'targetAudience'
        },
        {
            type: 'options',
            message: 'Какую главную задачу должен решить ваш сайт?',
            options: [
                'Продавать товары онлайн',
                'Собирать заявки',
                'Информировать о деятельности',
                'Повышать узнаваемость бренда',
                'Продавать товары или услуги в интернете',
                'Другое'
            ],
            key: 'businessTask'
        },
        {
            type: 'options',
            message: 'Какое основное действие должен совершить пользователь на сайте?',
            options: ['Купить', 'Позвонить', 'Оставить заявку', 'Подписаться', 'Другое'],
            key: 'userAction'
        },
        {
            type: 'options',
            message: 'Какое решение вы хотите?',
            options: ['Лендинг (визитка-одностраничник)', 'Интернет-магазин', 'Корпоративный сайт', 'Чат-бот', 'Маркетинг (SEO, контекстная реклама)'],
            key: 'solutionType'
        }
    ];

    useEffect(() => {
        const savedAnswers = localStorage.getItem('quizAnswers');
        const savedHistory = localStorage.getItem('quizHistory');
        const savedStep = localStorage.getItem('quizCurrentStep');
        
        if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
        if (savedHistory) setChatHistory(JSON.parse(savedHistory));
        if (savedStep) setCurrentStep(parseInt(savedStep));
    }, []);

    useEffect(() => {
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
        localStorage.setItem('quizHistory', JSON.stringify(chatHistory));
        localStorage.setItem('quizCurrentStep', currentStep.toString());
        
        // Проверяем, завершен ли квиз
        if (currentStep >= steps.length) {
            setShowBotRedirect(true);
        }
    }, [answers, chatHistory, currentStep, steps.length]);

    const addToChatHistory = (step: number, question: string, answer: string) => {
        const newChatItem: ChatItem = {
            step,
            question,
            answer,
            timestamp: new Date()
        };
        setChatHistory(prev => [...prev, newChatItem]);
    };

    const handleAnswer = (answer: string, key: keyof Answer): void => {
        const updatedAnswers = { ...answers, [key]: answer };
        setAnswers(updatedAnswers);
        
        const currentStepData = steps[currentStep];
        if (currentStepData) {
            const question = typeof currentStepData.message === 'function' 
                ? currentStepData.message(answers) 
                : currentStepData.message;
            addToChatHistory(currentStep, question, answer);
        }

        if (steps[currentStep].type !== 'conditional') {
            setCurrentStep(prev => prev + 1);
        }
        
        setInputValue('');
    };

    const handleEditAnswer = (stepIndex: number) => {
        setIsEditing(stepIndex);
        setCurrentStep(stepIndex);
        setShowBotRedirect(false);

        const stepKey = steps[stepIndex].key;
        const currentAnswer = answers[stepKey];
        if (currentAnswer && steps[stepIndex].type === 'text') {
            setInputValue(currentAnswer as string);
        }
    };

    const handleSaveEdit = () => {
        if (isEditing !== null) {
            const stepKey = steps[isEditing].key;
            if (inputValue.trim()) {
                const updatedAnswers = { ...answers, [stepKey]: inputValue.trim() };
                setAnswers(updatedAnswers);

                setChatHistory(prev => prev.map((item, index) => 
                    index === isEditing 
                        ? { ...item, answer: inputValue.trim() }
                        : item
                ));
                
                setIsEditing(null);
                setInputValue('');
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const handleSendMessage = (): void => {
        if (inputValue.trim()) {
            const currentStepData = steps[currentStep];
            if (currentStepData) {
                if (isEditing !== null) {
                    handleSaveEdit();
                } else {
                    handleAnswer(inputValue.trim(), currentStepData.key);
                    if (currentStepData.type === 'conditional') {
                        setCurrentStep(prev => prev + 1);
                    }
                }
            }
        }
    };

    const handleOptionSelect = (option: string, key: keyof Answer): void => {
        handleAnswer(option, key);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleBotRedirect = (): void => {
        window.open('https://t.me/KP888_Bot', '_blank');
    };

    const renderStep = (): JSX.Element | null => {
        if (showBotRedirect) {
            return (
                <div className={styles['quiz-step']}>
                    <div className={styles['bot-message']}>
                        <div className={styles['message-bubble']}>
                            Спасибо за ответы! Для получения коммерческого предложения перейдите в нашего бота
                        </div>
                    </div>
                    
                    <div className={styles['user-input']}>
                        <button 
                            onClick={handleBotRedirect}
                            className={styles['bot-redirect-button']}
                        >
                            Перейти в Telegram-бота
                        </button>
                    </div>
                </div>
            );
        }

        const step = steps[currentStep];
        if (!step) return null;

        const message = typeof step.message === 'function' ? step.message(answers) : step.message;
        const shouldShowConditional = step.type === 'conditional' && step.condition && step.condition(answers);

        return (
            <div className={styles['quiz-step']}>
                <div className={styles['bot-message']}>
                    <div className={styles['message-bubble']}>
                        {message}
                    </div>
                </div>
                
                <div className={styles['user-input']}>
                    {(step.type === 'text' || shouldShowConditional) && (
                        <div className={styles['input-container']}>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Введите ваш ответ..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className={styles['text-input']}
                            />
                            <button 
                                onClick={handleSendMessage}
                                className={styles['send-button']}
                                disabled={!inputValue.trim()}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
                                </svg>
                            </button>
                        </div>
                    )}
                    
                    {step.type === 'options' && step.options && (
                        <div className={styles['options-grid']}>
                            {step.options.map(option => (
                                <button
                                    key={option}
                                    onClick={() => handleOptionSelect(option, step.key)}
                                    className={styles['option-button']}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {step.type === 'conditional' && !shouldShowConditional && (
                        <div style={{ display: 'none' }}>
                            {setTimeout(() => {
                                setCurrentStep(prev => prev + 1);
                            }, 0)}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className={styles['quiz']}>
                <div className={styles['quiz-container-wrapper']}>
                    <div className={styles['chat-sidebar']}>
                        <div className={styles['sidebar-header']}>
                            <h3>Ваши ответы</h3>
                        </div>
                        <div className={styles['chat-list']}>
                            {chatHistory.map((chat, index) => (
                                <div 
                                    key={index} 
                                    className={styles['chat-item']}
                                    onClick={() => handleEditAnswer(chat.step)}
                                >
                                    <div className={styles['chat-arrow']}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                    </div>
                                    <div className={styles['chat-content']}>
                                        <div className={styles['chat-question']}>
                                            {chat.question.length > 50 
                                                ? chat.question.substring(0, 50) + '...' 
                                                : chat.question
                                            }
                                        </div>
                                        <div className={styles['chat-answer']}>
                                            {chat.answer}
                                        </div>
                                        <div className={styles['chat-time']}>
                                            {chat.timestamp.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles['quiz-main']}>
                        <p className={styles['quiz-title']}>рассчитать свою услугу</p>
                        <div className={styles['quiz-container']}>
                            {renderStep()}
                        </div>
                        {!showBotRedirect && (
                            <div className={styles['progress-bar']}>
                                <div 
                                    className={styles['progress-fill']}
                                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                />
                                <span className={styles['progress-text']}>
                                    {currentStep + 1} / {steps.length}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}