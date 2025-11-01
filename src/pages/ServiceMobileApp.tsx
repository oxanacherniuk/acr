import ServiceImage from "../assets/images/mobile-app-service.webp";
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
import { StagesTimeline } from "../components/services/StagesTimeline";
import { QuizLayout } from "../layout/Quiz/Quiz";
import { InfoSection } from "../components/services/InfoSectionProps";
import { ContactSection } from "../layout/FosForm";

export function ServiceMobileApp() {
  return (
    <ServiceLayout>
      <div className={s["service-top"]}>
        <Breadcrumbs
          title="Мобильные приложения"
          links={[]}
        />
        <ServiceBanner
          title="Мобильные приложения"
          subtitle="Создаем нативные и кроссплатформенные мобильные приложения для iOS и Android с фокусом на пользовательский опыт и производительность."
         image={{
            fallback: ServiceImage,
            alt: "Digital-маркетинг",
          }}
        />
      </div>
      
      <div className={s["service-page"]}>
        <Section id="hero">
          <Container>
            <ServiceHero
              title="создайте мобильное приложение, которое полюбят ваши пользователи"
              description="Превратите вашу бизнес-идею в современное мобильное приложение, которое будет работать безупречно на iOS и Android."
              buttonText="обсудить проект"
              buttonLink="https://t.me/KP888_Bot"
            />
          </Container>
        </Section>

        <Section id="benefits">
          <Container title="почему выбирают мобильные приложения?">
            <FeatureGrid
              items={[
                {
                  title: "Прямой доступ <br /> к клиентам",
                  text: "Ваше приложение всегда под рукой у пользователей",
                },
                {
                  title: "Высокая <br /> производительность",
                  text: "Нативные технологии обеспечивают максимальную скорость",
                },
                {
                  title: "Оффлайн-<br />возможности",
                  text: "Работайте даже без интернет-соединения",
                },
                {
                  title: "Push-<br />уведомления",
                  text: "Поддерживайте вовлеченность пользователей",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="services">
          <Container title="что входит в разработку мобильного приложения?">
            <ServiceTabs
              initialTab="development"
              tabs={[
                {
                  id: "development",
                  title: "Разработка",
                  items: [
                    { text: "Нативная разработка для iOS" },
                    { text: "Нативная разработка для Android" },
                    { text: "Кроссплатформенная разработка" },
                    { text: "Архитектура приложения (MVP/MVVM)" },
                    { text: "Интеграция с бэкенд-API" },
                    { text: "Настройка серверной части" },
                  ],
                },
                {
                  id: "design",
                  title: "Дизайн и UX",
                  items: [
                    { text: "UI/UX дизайн по гайдлайнам платформ" },
                    { text: "Прототипирование и вайрфрейминг" },
                    { text: "Адаптивный дизайн для всех устройств" },
                    { text: "Разработка иконки и брендинга" },
                    { text: "Анимации и микроинтеракции" },
                    { text: "Тестирование юзабилити" },
                  ],
                },
                {
                  id: "functionality",
                  title: "Функционал",
                  items: [
                    { text: "Push-уведомления" },
                    { text: "Оффлайн-режим работы" },
                    { text: "Интеграция с платежными системами" },
                    { text: "Социальные авторизации" },
                    { text: "Геолокация и карты" },
                    { text: "Камера и галерея" },
                    { text: "Чат и мессенджер" },
                  ],
                },
                {
                  id: "publication",
                  title: "Публикация",
                  items: [
                    { text: "Подготовка к публикации в App Store" },
                    { text: "Подготовка к публикации в Google Play" },
                    { text: "Создание описаний и скриншотов" },
                    { text: "Настройка метаданных" },
                    { text: "Помощь с модерацией" },
                    { text: "Техническая поддержка после запуска" },
                  ],
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="solution">
          <Container>
            <InfoSection
              title="инвестируйте в мобильное присутствие вашего бизнеса"
              description="Мобильное приложение — это не просто тренд, а необходимость для современного бизнеса, которая увеличивает лояльность клиентов и открывает новые возможности для роста."
              priceNotes={[
                "Точная стоимость зависит от сложности приложения, количество экранов, интеграций и платформ",
                "Техническая поддержка и обновления включены в стоимость",
              ]}
              price="от 250 000 ₽"
              buttonLink="https://t.me/KP888_Bot"
              buttonText="узнать стоимость"
            />
          </Container>
        </Section>

        <Section id="process">
          <Container>
            <StagesTimeline
              title="этапы создания вашего мобильного приложения"
              stages={[
                {
                  stage: "Этап 1",
                  title: "Анализ и планирование",
                  description: "Изучаем требования, анализируем рынок, разрабатываем ТЗ",
                },
                {
                  stage: "Этап 2",
                  title: "Дизайн и прототипирование",
                  description: "Создаем UI/UX дизайн и интерактивные прототипы",
                },
                {
                  stage: "Этап 3",
                  title: "Разработка",
                  description: "Программируем приложение и интегрируем с бэкендом",
                },
                {
                  stage: "Этап 4",
                  title: "Тестирование",
                  description: "Проводим комплексное тестирование на разных устройствах",
                },
                {
                  stage: "Этап 5",
                  title: "Публикация",
                  description: "Помогаем с публикацией в App Store и Google Play",
                },
                {
                  stage: "Этап 6",
                  title: "Поддержка",
                  description: "Обеспечиваем техническую поддержку и обновления",
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
                  q: "Какие платформы вы поддерживаете?",
                  a: "Мы разрабатываем приложения для iOS, Android, а также кроссплатформенные решения с использованием React Native",
                },
                {
                  q: "Сколько времени занимает разработка?",
                  a: "От 1 до 6 месяцев в зависимости от сложности приложения, количества экранов и интеграций",
                },
                {
                  q: "Вы помогаете с публикацией в магазинах приложений?",
                  a: "Да, мы полностью сопровождаем процесс публикации в App Store и Google Play",
                },
              ]}
            />
          </Container>
        </Section>
        <ContactSection/>

        <QuizLayout />
      </div>
    </ServiceLayout>
  );
}