import ServiceImage from "../assets/images/design-service.webp";
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
import { StagesTimeline } from "../components/services/StagesTimeline";
import { ContactForm } from "../components/services/ContactForm";
import { QuizLayout } from "../layout/Quiz/Quiz";
import { InfoSection } from "../components/services/InfoSectionProps";
import ServiceMp4 from "../assets/video/disainG.mp4";
import ServiceWebm from "../assets/video/disainG.mp4";
export default function ServiceDesign() {
  return (
    <ServiceLayout>
      <div className={s["service-top"]}>
        <Breadcrumbs title="ДИЗАЙН" />
        <ServiceBanner
          title="ДИЗАЙН"
          subtitle="Разрабатываем современный и функциональный дизайн для цифровых продуктов, брендов и маркетинговых материалов."
          imageSrc={ServiceImage}
          imageAlt="Дизайн услуг"

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
              title="создадим запоминающийся визуал <br><span style='color:var(--accent-light)'>за 2-4 недели</span>"
              description="Профессиональный дизайн, который повышает узнаваемость бренда и улучшает пользовательский опыт."
              buttonText="заказать дизайн"
              buttonLink="https://t.me/KP888_Bot"
            />
          </Container>
        </Section>

        <Section id="benefits">
          <Container title="почему выбирают профессиональный дизайн?">
            <FeatureGrid
              items={[
                {
                  title: "Увеличение конверсии",
                  text: "Правильный дизайн повышает доверие и стимулирует действия",
                },
                {
                  title: "Улучшение пользовательского опыта",
                  text: "Интуитивные интерфейсы и комфортное взаимодействие",
                },
                {
                  title: "Укрепление бренда",
                  text: "Узнаваемый стиль и профессиональный имидж",
                },
                {
                  title: "Конкурентное преимущество",
                  text: "Современный дизайн выделяет вас на фоне конкурентов",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="services">
          <Container title="что входит в наши услуги дизайна?">
            <ServiceTabs
              initialTab="uiux"
              tabs={[
                {
                  id: "uiux",
                  title: "UI/UX Дизайн",
                  items: [
                    { text: "Дизайн интерфейсов сайтов и приложений" },
                    { text: "Прототипирование и пользовательские сценарии" },
                    { text: "Адаптивный дизайн для всех устройств" },
                    { text: "Создание дизайн-систем и гайдлайнов" },
                    { text: "Тестирование юзабилити и оптимизация" },
                    { text: "Интерактивные прототипы и анимации" },
                  ],
                },
                {
                  id: "branding",
                  title: "Брендинг",
                  items: [
                    { text: "Разработка логотипа и фирменного стиля" },
                    { text: "Брендбук и гайдлайны использования" },
                    { text: "Дизайн упаковки и полиграфической продукции" },
                    { text: "Фирменные бланки и визитки" },
                    { text: "Мерч и сувенирная продукция" },
                    { text: "Айдентика для социальных сетей" },
                  ],
                },
                {
                  id: "marketing",
                  title: "Маркетинг материалы",
                  items: [
                    { text: "Дизайн презентаций и pitch deck" },
                    { text: "Рекламные баннеры и креативы" },
                    { text: "Инфографика и схемы" },
                    { text: "Email рассылки и шаблоны писем" },
                    { text: "Landing page и посадочные страницы" },
                    { text: "Промо материалы и брошюры" },
                  ],
                },
                {
                  id: "motion",
                  title: "Motion дизайн",
                  items: [
                    { text: "Анимированные логотипы и заставки" },
                    { text: "Рекламные ролики и промо видео" },
                    { text: "Анимация интерфейсов и микровзаимодействий" },
                    { text: "Explainer video и обучающие ролики" },
                    { text: "3D графика и визуализация" },
                    { text: "Анимированные презентации" },
                  ],
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="solution">
          <Container>
            <InfoSection
              title="идеальное решение для вашего бизнеса"
              description="Профессиональный дизайн, который решает бизнес-задачи и создает положительное впечатление о вашем бренде."
              priceNotes={[
                "Точная стоимость зависит от сложности проекта и объема работ.",
              ]}
              price="от 80 000 ₽"
              buttonLink="https://t.me/KP888_Bot"
              buttonText="узнать стоимость"
            />
          </Container>
        </Section>

        <Section id="process">
          <Container>
            <StagesTimeline
              title="этапы работы над дизайном"
              stages={[
                {
                  stage: "День 1-3",
                  title: "Бриф и исследование",
                  description: "Изучаем задачу, анализируем целевую аудиторию и конкурентов",
                },
                {
                  stage: "День 4-7",
                  title: "Концепция и прототипы",
                  description: "Разрабатываем концепцию и создаем первые прототипы",
                },
                {
                  stage: "День 8-14",
                  title: "Дизайн и визуализация",
                  description: "Создаем финальный дизайн и готовим материалы",
                },
                {
                  stage: "День 15-21",
                  title: "Уточнения и правки",
                  description: "Вносим корректировки и финализируем проект",
                },
                {
                  stage: "День 22-28",
                  title: "Подготовка к передаче",
                  description: "Готовим исходные файлы и документацию",
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
                  q: "Сколько времени занимает разработка дизайна?",
                  a: "В зависимости от сложности проекта: от 1 недели для простых задач до 4 недель для комплексных проектов с брендингом.",
                },
                {
                  q: "Какие программы вы используете?",
                  a: "Мы работаем в Figma, Adobe Photoshop, Illustrator, After Effects, Blender и других профессиональных инструментах.",
                },
                {
                  q: "Предоставляете ли вы исходные файлы?",
                  a: "Да, после завершения проекта мы передаем все исходные файлы и права на использование дизайна.",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="cta">
          <Container>
            <ContactForm
              title="получите дизайн, который работает на ваш бизнес!"
              description="Оставьте контакты, и наш менеджер подготовит для вас индивидуальное коммерческое предложение в течение дня."
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
                  name: 'service_type',
                  type: 'select',
                  placeholder: 'Какой тип дизайна вас интересует?',
                  validation: yup.string(),
                  options: [
                    { value: 'uiux', label: 'UI/UX Дизайн' },
                    { value: 'branding', label: 'Брендинг' },
                    { value: 'marketing', label: 'Маркетинг материалы' },
                    { value: 'motion', label: 'Motion дизайн' },
                    { value: 'complex', label: 'Комплексный дизайн' },
                  ],
                },
                {
                  name: 'project_description',
                  type: 'textarea',
                  placeholder: 'Опишите ваш проект...',
                  validation: yup.string().max(500, 'Описание слишком длинное'),
                },
              ]}
              submitText="Оставить заявку"
            />
          </Container>
        </Section>

        <QuizLayout />
      </div>
    </ServiceLayout>
  );
}