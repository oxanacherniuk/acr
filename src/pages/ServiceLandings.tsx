import ServiceImage from "../assets/images/service/lending.png";
import ServiceImageWebp from "../assets/images/service/lending.webp";

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
import * as yup from "yup";
import { StagesTimeline } from "../components/services/StagesTimeline";
import { ContactForm } from "../components/services/ContactForm";
import { QuizLayout } from "../layout/Quiz/Quiz";
import { InfoSection } from "../components/services/InfoSectionProps";
import ServiceMp4 from "../assets/video/lending2.mp4";
import ServiceWebm from "../assets/video/lending2.webm"
export default function ServiceLandings() {
  return (
    <ServiceLayout>
      <div className={s["service-top"]}>
        <Breadcrumbs
          title="Лендинг"
          links={[
            {
              href: "/services/ecommerce",
              label: "Интернет-магазин",
              className: "rasdel -b",
            },
            {
              href: "/services/corporate",
              label: "Корпоративный сайт",
              className: "-b",
            },
          ]}
        />
        <ServiceBanner
          title="Лендинг"
          subtitle="Создадим функциональный одностраничный сайт, который сфокусирует внимание на вашем предложении и превратит посетителей в клиентов."
          image={{
            webp: ServiceImageWebp,
            fallback: ServiceImage,
            alt: "Продающий лендинг",
          }}

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
              title="запустите продажи с мощного лендинга <span style='color:var(--accent-light)'>за 10 дней</span>"
              description="Функциональный одностраничный сайт - идеальное решение для эффективного продвижения и демонстрации сильных сторон продукта."
              buttonText="заказать лендинг"
              buttonLink="https://t.me/KP888_Bot"
            />
          </Container>
        </Section>

        <Section id="benefits">
          <Container title="почему выбирают лендинг?">
            <FeatureGrid
              items={[
                {
                  title: "Фокус на 1 цель <br /> или акцию",
                  text: "Максимальная концентрация на главном предложении",
                },
                {
                  title: "Быстрый запуск <br /> (от 10 дней)",
                  text: "Оперативное получение работающего инструмента",
                },
                {
                  title: "Низкая стоимость против сайта",
                  text: "Экономически эффективное решение",
                },
                {
                  title: "Максимальная конверсия в заявки",
                  text: "Высокий процент превращения посетителей в клиентов",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="services">
          <Container title="что входит в стоимость лендинга?">
            <ServiceTabs
              initialTab="marketing"
              tabs={[
                {
                  id: "marketing",
                  title: "Маркетинговая основа",
                  items: [
                    { text: "Аудит Вашего бизнеса и конкурентов" },
                    { text: "Анализ целевой аудитории" },
                    { text: "Маркетинговая стратегия" },
                    {
                      text: "Составление УТП",
                      subtext: "(уникального торгового предложения)",
                    },
                    {
                      text: "Проработка продающих триггеров доверия",
                      subtext: "(подтолкнем ваших клиентов к действию)",
                    },
                    {
                      text: "Копирайтинг",
                      subtext: "(наполнение продающим текстом)",
                    },
                  ],
                },
                {
                  id: "design",
                  title: "Дизайн и Вовлечение",
                  items: [
                    { text: "Индивидуальный мотивирующий дизайн" },
                    { text: "Полная проработка структуры сайта" },
                    {
                      text: "Видеофон первого экрана (предоставляется заказчиком)",
                    },
                    { text: "Фото-/видео-галерея с увеличением" },
                    { text: "Фото-/видео-отзывы (предоставляется заказчиком)" },
                    { text: "Анимация элементов лендинга" },
                  ],
                },
                {
                  id: "tech",
                  title: "Техника и Захват лидов",
                  items: [
                    { text: "Домен и хостинг на 1 год в подарок" },
                    { text: "Установка SSL сертификата" },
                    { text: "Подключение почты для сбора заявок" },
                    {
                      text: "Специализированные формы обратной связи для заказа",
                    },
                    { text: "Интеграция с социальными сетями" },
                    { text: "Интерактивная карта (Яндекс)" },
                    { text: "Загрузка лендинга на хостинг клиента" },
                  ],
                },
                {
                  id: "quality",
                  title: "Качество и Оптимизация",
                  items: [
                    { text: "Адаптация для всех устройств" },
                    { text: "Кроссбраузерность" },
                    { text: "Ускорение загрузки сайта" },
                    { text: "Закладываем потенциал для расширения" },
                    { text: "Тестирование всего проекта на ошибки" },
                  ],
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="solution">
          <Container>
            <InfoSection
              title="идеальное решение для акций, запусков и точечных предложений"
              description="Получите работающий инструмент для генерации заявок в сжатые сроки и с предсказуемым бюджетом."
              priceNotes={[
                "Точная стоимость зависит от сложности, анимации и объема текстов.",
              ]}
              price="от 30 000 ₽"
              buttonLink="https://t.me/KP888_Bot"
              buttonText="узнать стоимость"
            />
          </Container>
        </Section>

        <Section id="process">
          <Container>
            <StagesTimeline
              title="этапы создания вашего лендинга"
              stages={[
                {
                  stage: "День 1-2",
                  title: "Бриф и аналитика",
                  description:
                    "Заполняем анкету, анализируем целевую аудиторию",
                },
                {
                  stage: "День 3-5",
                  title: "Прототип и текст",
                  description: "Рисуем структуру и пишем продающие тексты",
                },
                {
                  stage: "День 6-8",
                  title: "Дизайн и верстка",
                  description: "Утверждаем визуал и оживляем его",
                },
                {
                  stage: "День 9-10",
                  title: "Программирование",
                  description: "Подключаем формы, анимации",
                },
                {
                  stage: "День 10",
                  title: "Тест и запуск",
                  description: "Проверяем и публикуем ваш лендинг",
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
                  q: "Чем лендинг лучше многостраничного сайта?",
                  a: "Для точечных предложений, акций и товаров-новинок. Он ведет клиента по четкому сценарию к одной цели, минимизируя отвлекающие факторы.",
                },
                {
                  q: "Как быстро вы сделаете лендинг?",
                  a: "Средний срок разработки — 10-14 рабочих дней. Доступна опция срочного запуска за 7 дней.",
                },
                {
                  q: "Можно ли потом доработать лендинг до полноценного сайта?",
                  a: "Да, мы закладываем архитектуру, которая позволяет легко масштабировать лендинг до многостраничного сайта при необходимости.",
                },
                {
                  q: "Вы предоставляете домен и хостинг?",
                  a: "Да, мы дарим домен и хостинг на 1 год. В дальнейшем вы можете продолжить обслуживание у нас или перенести к другому провайдеру.",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="cta">
          <Container>
            <ContactForm
              title="получите поток заявок с вашего первого лендинга!"
              description="Оставьте контакты, наш менеджер подготовит для вас индивидуальное коммерческое предложение в течение дня."
              fields={[
                {
                  name: "name",
                  type: "text",
                  placeholder: "Ваше имя",
                  validation: yup
                    .string()
                    .required("Имя обязательно для заполнения")
                    .min(2, "Имя должно содержать минимум 2 символа")
                    .max(50, "Имя слишком длинное")
                    .matches(
                      /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
                      "Имя может содержать только буквы",
                    ),
                },
                {
                  name: "email",
                  type: "email",
                  placeholder: "Ваш e-mail",
                  validation: yup
                    .string()
                    .required("Email обязателен для заполнения")
                    .email("Введите корректный email адрес"),
                },
                {
                  name: "phone",
                  type: "tel",
                  placeholder: "Ваш номер телефона",
                  validation: yup
                    .string()
                    .required("Телефон обязателен для заполнения")
                    .min(4, "Телефон должен содержать минимум 4 цифры")
                    .transform((value: string) => value.replace(/\D/g, "")),
                },
                {
                  name: "project_type",
                  type: "select",
                  placeholder: "Тип лендинга",
                  validation: yup.string(),
                  options: [
                    { value: "product", label: "Продажа товара" },
                    { value: "service", label: "Продвижение услуги" },
                    { value: "event", label: "Анонс мероприятия" },
                    { value: "lead", label: "Сбор заявок" },
                    { value: "other", label: "Другое" },
                  ],
                },
                {
                  name: "deadline",
                  type: "select",
                  placeholder: "Желаемый срок запуска",
                  validation: yup.string(),
                  options: [
                    { value: "urgent", label: "Срочно (7 дней)" },
                    { value: "standard", label: "Стандартно (10-14 дней)" },
                    { value: "flexible", label: "Гибкий график" },
                  ],
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
