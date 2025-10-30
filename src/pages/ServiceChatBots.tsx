import ServiceImage from "../assets/images/chat-bots-service.webp";
import { ServiceLayout } from "../components/services/ServiceLayout";
import { Breadcrumbs } from "../components/services/Breadcrumbs";
import { ServiceBanner } from "../components/services/ServiceBanner";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { FeatureGrid } from "../components/services/FeatureGrid";
import { FAQ } from "../components/services/FAQ";
import "../styles/service.css";
import s from "../styles/ServicePage.module.css";
import ServiceHero from "../components/services/ServiceHero";
import { ServiceTabs } from "../components/services/ServiceTabs";
import * as yup from 'yup';
import ServiceMp4 from "../assets/video/chatBotQ.mp4";
import ServiceWebm from "../assets/video/chatBotQ.webm";
import { StagesTimeline } from "../components/services/StagesTimeline";
import { ContactForm } from "../components/services/ContactForm";
import { QuizLayout } from "../layout/Quiz/Quiz";
import { InfoSection } from "../components/services/InfoSectionProps";
import { NavigationButton } from "../components/NavigationButton/NavigationButton";

export default function ServiceChatBots() {
  return (
    <ServiceLayout>
      <div className={s["service-top"]}>
        <Breadcrumbs title="Умные чат-боты" />
        <ServiceBanner
          title="Умные чат-боты"
          subtitle="Автоматизируйте продажи и поддержку 24/7 с помощью интеллектуальных ботов, которые не просто отвечают, а ведут диалог и решают бизнес-задачи"
          imageSrc={ServiceImage}
          imageAlt="Умные чат-боты"
          video={{
            webm: ServiceWebm,
            mp4: ServiceMp4,
            poster: ServiceImage,
          }}
        />
      </div>
      <div className={s["service-page"]}>
        <Section id="hero">
          <Container>
            <ServiceHero
              title="Умные чат-боты: автоматизируйте <br> продажи и поддержку <span style='color:var(--accent-light)'>24/7</span>"
              description="Внедряем chat-боты, которые не просто отвечают, а ведут диалог, собирают заявки, консультируют и экономят до 30% вашего бюджета на операционные задачи."
              buttonText="рассчитать стоимость"
              buttonLink="https://t.me/KP888_Bot"
            />
          </Container>
        </Section>

        <Section id="philosophy">
          <Container title="наша философия в разработке ботов">
            <FeatureGrid
              items={[
                {
                  title: "Глубокая аналитика <br> перед созданием",
                  text: "Изучаем бизнес-процессы, типичные вопросы клиентов и «боли». Бот строится на реальных сценариях",
                },
                {
                  title: "Естественное общение",
                  text: "Наши боты умеют понимать смысл и контекст запроса благодаря AI, что повышает лояльность клиентов",
                },
                {
                  title: "Интеграция в ядро бизнеса",
                  text: "Бот не работает сам по себе. Подключаем к вашей CRM, базе знаний, системе бронирования",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="tasks">
          <Container title="какие задачи решают наши боты?">
            <ServiceTabs
              initialTab="sales"
              tabs={[
                {
                  id: "sales",
                  title: "Продажи и лиды",
                  items: [
                    { text: "Консультация и подбор товара/услуги" },
                    { text: "Прием заказов и бронирование прямо в мессенджере" },
                    { text: "Проведение акций и сбор базы подписчиков" },
                    { text: "Генерация качественных лидов 24/7" },
                  ],
                },
                {
                  id: "service",
                  title: "Клиентский сервис",
                  items: [
                    { text: "Ответы на частые вопросы (снижает нагрузку на менеджеров)" },
                    { text: "Статус заказа, отслеживание доставки" },
                    { text: "Запись на услугу или прием" },
                    { text: "Техническая поддержка клиентов" },
                  ],
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="process">
          <Container>
            <StagesTimeline
              title="наш процесс разработки"
              stages={[
                {
                  stage: "Этап 1",
                  title: "Аудит и сценарий",
                  description: "Изучаем бизнес-процессы, прописываем диалоги и логику",
                },
                {
                  stage: "Этап 2",
                  title: "Прототип",
                  description: "Создаем и согласовываем карту диалогов",
                },
                {
                  stage: "Этап 3",
                  title: "Копирайтинг",
                  description: "Пишем тексты для бота в стиле вашего бренда",
                },
                {
                  stage: "Этап 4",
                  title: "Разработка",
                  description: "Программируем бота, подключаем API",
                },
                {
                  stage: "Этап 5",
                  title: "Тестирование",
                  description: "Проверяем все сценарии на ошибки",
                },
                {
                  stage: "Этап 6",
                  title: "Запуск",
                  description: "Запускаем бота и обучаем вашу команду",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="technologies">
          <Container className={s['info-section__tech']} title="технологии и платформы">
            <p >
              Разрабатываем для всех популярных платформ. Выберем оптимальное решение под ваши задачи.
            </p>
            <FeatureGrid
              items={[
                {
                  title: "Telegram",
                  text: "Для продаж и поддержки в мессенджере",
                },
                {
                  title: "WhatsApp",
                  text: "Профессиональные решения для бизнеса",
                },
                {
                  title: "Виджет на сайт",
                  text: "Для захвата лидов и помощи посетителям",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="pricing">
          <Container className={s['info-section__price']}>
            <InfoSection
              title="что входит в стоимость?"
              description="Стоимость проекта зависит от сложности логики, количества интеграций и платформы."
              price="от 20 000 ₽"
              buttonLink="https://t.me/KP888_Bot"
              buttonText="узнать стоимость"
            />
            <p >
              Базовая комплектация включает:
            </p>
            <div className={s["punct-panel"]} style={{ marginTop: "30px" }}>
              <ul className={s["puncts"]}>
                <li>Проектирование сложного сценария с 10+ ветками диалога</li>
                <li>Написание продающих текстов для бота</li>
                <li>Разработка бота на одной платформе</li>
                <li>Базовая интеграция для сбора заявок</li>
                <li>Тестирование и запуск</li>
                <li>Обучение вашего менеджера</li>
              </ul>
            </div>

            <div className={s["additional-options"]} style={{ marginTop: "50px" }}>
              <h3 style={{ textAlign: "center", marginBottom: "30px" }}>дополнительные опции</h3>
              <div className={s["additional-options-grid"]}>
                <div className={s["option-item"]}>
                  <div className={s["option-name"]}>Интеграция с CRM</div>
                  <div className={s["option-price"]}>+20 000 ₽</div>
                </div>
                <div className={s["option-item"]}>
                  <div className={s["option-name"]}>NLP (понимание вопросов)</div>
                  <div className={s["option-price"]}>+30 000 ₽</div>
                </div>
                <div className={s["option-item"]}>
                  <div className={s["option-name"]}>Вторая платформа</div>
                  <div className={s["option-price"]}>+40 000 ₽</div>
                </div>
              </div>
        
              <NavigationButton to={'https://t.me/KP888_Bot'} children={'получить расчет'} />
              
            </div>
          </Container>
        </Section>

        <Section id="faq">
          <Container title="ответы на частые вопросы">
            <FAQ
              items={[
                {
                  q: "Чем умный бот отличается от обычного?",
                  a: "Умный бот понимает контекст, поддерживает естественный диалог, обучается на основе взаимодействий и может решать сложные многошаговые задачи, а не просто отвечать по шаблону",
                },
                {
                  q: "Сколько времени занимает разработка бота?",
                  a: "От 2 недель для простого бота до 2 месяцев для сложного решения с интеграциями и AI-функциями. Мы всегда запускаем MVP в кратчайшие сроки",
                },
                {
                  q: "Можно ли перенести существующего бота на вашу платформу?",
                  a: "Да, мы проводим миграцию ботов с сохранением всей логики и истории. Часто при этом улучшаем функциональность",
                },
                {
                  q: "Как измеряется эффективность бота?",
                  a: "Мы настраиваем аналитику: конверсия в заявки, время ответа, процент решенных вопросов, NPS клиентов и снижение нагрузки на менеджеров",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="cta">
          <Container>
            <ContactForm
              title="готовы автоматизировать рутину и увеличить продажи?"
              description="Опишите задачу, и наш специалист по AI бесплатно подготовит предварительный сценарий и расчет стоимости."
              fields={[
                {
                  name: 'name',
                  type: 'text',
                  placeholder: 'Ваше имя',
                  validation: yup.string()
                    .required('Имя обязательно для заполнения')
                    .min(2, 'Имя должно содержать минимум 2 символа')
                    .max(50, 'Имя слишком длинное')
                    .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя может содержать только буквы'),
                },
                {
                  name: 'email',
                  type: 'email',
                  placeholder: 'Ваш e-mail',
                  validation: yup.string()
                    .required('Email обязателен для заполнения')
                    .email('Введите корректный email адрес'),
                },
                {
                  name: 'phone',
                  type: 'tel',
                  placeholder: 'Ваш номер телефона',
                  validation: yup.string()
                    .required('Телефон обязателен для заполнения')
                    .min(4, 'Телефон должен содержать минимум 4 цифры')
                    .transform((value: string) => value.replace(/\D/g, '')),
                },
                {
                  name: 'platform',
                  type: 'select',
                  placeholder: 'К какой платформе нужен бот?',
                  validation: yup.string(),
                  options: [
                    { value: 'telegram', label: 'Telegram' },
                    { value: 'whatsapp', label: 'WhatsApp' },
                    { value: 'website', label: 'Виджет на сайт' },
                    { value: 'vk', label: 'VK Мессенджер' },
                    { value: 'multiple', label: 'Несколько платформ' },
                  ],
                },
                {
                  name: 'task',
                  type: 'textarea',
                  placeholder: 'Опишите задачу для бота...',
                  validation: yup.string().max(500, 'Сообщение слишком длинное'),
                },
              ]}
              submitText="Обсудить разработку бота"
            />
          </Container>
        </Section>

        <QuizLayout />
      </div>
    </ServiceLayout>
  );
}