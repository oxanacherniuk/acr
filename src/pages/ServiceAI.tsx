import ServiceImage from "../assets/images/ai-service.webp";
import { ServiceLayout } from "../components/services/ServiceLayout";
import { Breadcrumbs } from "../components/services/Breadcrumbs";
import { ServiceBanner } from "../components/services/ServiceBanner";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { FeatureGrid } from "../components/services/FeatureGrid";
import { FAQ } from "../components/services/FAQ";
import "../styles/service.css";
import s from "../styles/ServicePage.module.css";
import ServiceMp4 from "../assets/video/ii.mp4";
import ServiceWebm from "../assets/video/ii.webm";
import ServiceHero from "../components/services/ServiceHero";
import { ServiceTabs } from "../components/services/ServiceTabs";
import { InfoSection } from "../components/services/InfoSectionProps";
import { StagesTimeline } from "../components/services/StagesTimeline";
import { ContactForm } from "../components/services/ContactForm";
import { QuizLayout } from "../layout/Quiz/Quiz";

export default function ServiceAI() {
  return (
    <ServiceLayout>
      <div className={s["service-top"]}>
        <Breadcrumbs title="Внедрение ИИ" />
        <ServiceBanner
          title="Внедрение ИИ"
          subtitle="Интегрируем AI-решения для оптимизации бизнес-процессов, анализа данных, прогнозирования и автоматизации принятия решений."
          imageSrc={ServiceImage}
          imageAlt="AI/ML сервисы"
          video={{
            webm: ServiceWebm,
            mp4: ServiceMp4,
            poster: ServiceImage,
          }}
        />
      </div>
      <div className={s["service-page"]}>
        <Section id="heero">
          <Container>
            <ServiceHero
              title={"преобразите бизнес с помощью искусственного интеллекта"}
              description="Используйте силу машинного обучения и нейронных сетей для создания интеллектуальных систем, способных трансформировать ваши бизнес-процессы."
              buttonText="обсудить внедрение"
              buttonLink="https://t.me/KP888_Bot"
            />
          </Container>
        </Section>
        <Section id="why">
          <Container title="почему выбирают внедрение ИИ?">
            <FeatureGrid
              items={[
                {
                  title: "Автоматизация процессов",
                  text: "Сокращение рутинных операций и повышение эффективности ",
                },
                {
                  title: "Точность прогнозов",
                  text: "Анализ данных и предсказание трендов с высокой точностью",
                },
                {
                  title: "Персонализация",
                  text: "Индивидуальный подход к каждому клиенту и сотруднику",
                },
                {
                  title: "Конкурентное преимущество",
                  text: "Использование передовых технологий для опережения рынка",
                },
              ]}
            />
          </Container>
        </Section>
        <Section id="tabs">
          <Container title="что входит во внедрение искусственного интеллекта?">
            <ServiceTabs
              initialTab="solutions"
              tabs={[
                {
                  id: "solutions",
                  title: "AI-решения",
                  items: [
                    { text: "Чат-боты и виртуальные ассистенты" },
                    { text: "Системы рекомендаций и персонализации" },
                    { text: "Прогнозная аналитика и машинное обучение" },
                    { text: "Обработка естественного языка (NLP)" },
                    { text: "Компьютерное зрение и анализ изображений" },
                    { text: "Голосовые интерфейсы и speech-to-text" },
                  ],
                },
                {
                  id: "integration",
                  title: "Интеграция",
                  items: [
                    { text: "Анализ бизнес-процессов и выявление точек роста" },
                    { text: "Интеграция с существующей IT-инфраструктурой" },
                    { text: "Миграция данных и настройка ETL-процессов" },
                    { text: "Создание API для взаимодействия систем" },
                    { text: "Настройка безопасности и контроля доступа" },
                    {
                      text: "Тестирование на совместимость и производительность",
                    },
                  ],
                },
                {
                  id: "technologies",
                  title: "Технологии",
                  items: [
                    { text: "Машинное обучение и глубокие нейросети" },
                    { text: "Обработка больших данных (Big Data)" },
                    { text: "Облачные AI-платформы (AWS, GCP, Azure)" },
                    { text: "Фреймворки: TensorFlow, PyTorch, Keras" },
                    { text: "MLOps - автоматизация жизненного цикла моделей" },
                    { text: "Генеративный AI и языковые модели" },
                  ],
                },
                {
                  id: "support",
                  title: "Поддержка",
                  items: [
                    { text: "Обучение сотрудников работе с новыми системами" },
                    { text: "Мониторинг и постоянная оптимизация алгоритмов" },
                    { text: "Техническая поддержка 24/7" },
                    { text: "Регулярные обновления и дообучение моделей" },
                    { text: "Анализ эффективности внедренных решений" },
                    { text: "Консультации по развитию AI-стратегии" },
                  ],
                },
              ]}
            />
          </Container>
        </Section>

        <Section>
          <Container>
            <InfoSection
              title="инвестируйте в интеллектуальное будущее вашего бизнеса"
              description="Искусственный интеллект — это не просто технология, а стратегическое преимущество, которое позволяет автоматизировать процессы, принимать более точные решения и создавать уникальный клиентский опыт."
              priceNotes={[
                "Точная стоимость зависит от сложности решений, объема данных и масштаба интеграции.",
                "Поэтапное внедрение с возможностью быстрого получения первых результатов.",
              ]}
              price="от 200 000 ₽"
              buttonLink="https://t.me/KP888_Bot"
              buttonText="узнать стоимость"
            />
          </Container>
        </Section>

        <Section id="process">
          <Container>
            <StagesTimeline
              title="этапы внедрения искусственного интеллекта"
              stages={[
                {
                  stage: "Этап 1",
                  title: "Анализ и аудит",
                  description:
                    "Изучаем бизнес-процессы, данные и инфраструктуру",
                },
                {
                  stage: "Этап 2",
                  title: "Разработка стратегии",
                  description: "Определяем цели, метрики и roadmap внедрения",
                },
                {
                  stage: "Этап 3",
                  title: "Прототипирование",
                  description: "Создаем и тестируем пилотные решения",
                },
                {
                  stage: "Этап 4",
                  title: "Интеграция",
                  description: "Внедряем и настраиваем AI-решения",
                },
                {
                  stage: "Этап 5",
                  title: "Обучение",
                  description: "Обучаем команду работе с новыми инструментами",
                },
                {
                  stage: "Этап 6",
                  title: "Поддержка",
                  description: "Обеспечиваем мониторинг и развитие системы",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="faq">
          <Container title="ответы на частые вопросы">
            <FAQ
              items={[
                {
                  q: "Какие бизнес-задачи решает ИИ?",
                  a: "Автоматизация процессов, прогнозирование спроса, персонализация предложений, анализ sentiment, обнаружение аномалий, оптимизация цепочек поставок и многое другое",
                },
                {
                  q: "Нужны ли специальные знания у сотрудников?",
                  a: "Мы предоставляем полное обучение и создаем интуитивно понятные интерфейсы. Для сложных решений можем подготовить ваших специалистов",
                },
                {
                  q: "Как быстро можно получить первые результаты?",
                  a: "Пилотные проекты и MVP мы запускаем в течение 2-4 недель. Полное внедрение занимает от 1 до 3 месяцев",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="cta">
          <Container>
            <ContactForm
              title="начните использовать искусственный интеллект уже сегодня!"
              description="Оставьте контакты, и наш AI-эксперт подготовит для вас индивидуальное коммерческое предложение в течение дня."
            />
          </Container>
        </Section>
        <QuizLayout />
      </div>
    </ServiceLayout>
  );
}
