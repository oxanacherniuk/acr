import ServiceImage from "../assets/images/corporate.webp";
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
// import { InfoSection } from "../components/services/InfoSection";

export function ServiceCorporate() {
  return (
    <ServiceLayout>
      <div className={s["service-top"]}>
        <Breadcrumbs
          title="Корпоративный сайт"
          links={[
            {
              href: "/services/ecommerce",
              label: "Интернет-магазин",
              className: "rasdel -b",
            },
            {
              href: "/services/landings",
              label: "Лендинг",
              className: "-b",
            },
          ]}
        />
        <ServiceBanner
          title="Корпоративный сайт"
          subtitle="Ваше мощное представительство в интернете. Всё для имиджа, доверия и лидов."
        //   description="Создадим современный и функциональный сайт, который расскажет о вашей компании лучше любого менеджера и будет работать на вас 24/7."
          image={{
            fallback: ServiceImage,
            alt: "Современный корпоративный сайт",
          }}
        />
      </div>
      
      <div className={s["service-page"]}>
        <Section id="hero">
          <Container>
            <ServiceHero
              title="Корпоративный сайт — <br /><span style='color:var(--accent-light)'>лицо вашего бизнеса</span> в digital-пространстве"
              description="Откройте представительство своей компании в интернете с помощью создания современного и функционального корпоративного сайта."
              buttonText="обсудить проект"
              buttonLink="https://t.me/KP888_Bot"
            />
          </Container>
        </Section>

        <Section id="benefits">
          <Container title="почему выбирают корпоративный сайт?">
            <FeatureGrid
              items={[
                {
                  title: "Укрепление имиджа <br /> и доверия",
                  text: "Профессиональное представление вашей компании в сети",
                },
                {
                  title: "Привлечение клиентов <br /> и заявок",
                  text: "Постоянный поток качественных лидов 24/7",
                },
                {
                  title: "Домен и хостинг <br /> в подарок",
                  text: "Полностью бесплатное размещение в первый год",
                },
                {
                  title: "Полная готовность <br /> к работе",
                  text: "Запускаем сразу после завершения разработки",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="services">
          <Container title="что входит в стоимость корпоративного сайта?">
            <ServiceTabs
              initialTab="foundation"
              tabs={[
                {
                  id: "foundation",
                  title: "Фундамент и Безопасность",
                  items: [
                    { text: "Домен и хостинг на 1 год в подарок" },
                    { text: "Установка SSL сертификата" },
                    { text: "Регулярное резервное копирование" },
                    { text: "Загрузка сайта на хостинг клиента" },
                  ],
                },
                {
                  id: "strategy",
                  title: "Стратегия и Дизайн",
                  items: [
                    { text: "Анализ тематики и конкурентов" },
                    { text: "Анализ целевой аудитории" },
                    { text: "Маркетинговая стратегия" },
                    { text: "Индивидуальный мотивирующий дизайн" },
                    { text: "Полная проработка структуры сайта (до 20 страниц)" },
                    { text: "Составление УТП" },
                    { text: "Слайд-шоу на главной странице" },
                  ],
                },
                {
                  id: "functionality",
                  title: "Функционал",
                  items: [
                    { text: "Подключение окон с рабочими формами заказа" },
                    { text: "Формы обратной связи (звонок, мессенджер)" },
                    { text: "Фото- или видео-галерея с увеличением" },
                    { text: "Фото-, видео-отзывы (на выбор)" },
                    { text: "Каталог услуг и продукции" },
                    { text: "Возможность скачать прайс-лист" },
                    { text: "Модуль с логотипами клиентов и партнеров" },
                    { text: "Интерактивная карта (Яндекс)" },
                  ],
                },
                {
                  id: "technical",
                  title: "Техническое качество",
                  items: [
                    { text: "Адаптация для всех устройств" },
                    { text: "Кроссбраузерность" },
                    { text: "Базовая СЕО-оптимизация" },
                    { text: "Ускорение загрузки сайта" },
                    { text: "Закладываем потенциал для расширения функционала" },
                    { text: "Тестирование всего проекта на наличие ошибок" },
                  ],
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="solution">
          <Container>
            <InfoSection
              title="инвестиция в репутацию и рост, а не просто траты на сайт"
              description="Мы создаем не «визитку», а рабочий маркетинговый инструмент, который окупает вложения за счет привлечения качественных клиентов."
              priceNotes={[
                "Итоговая стоимость рассчитывается индивидуально, исходя из сложности дизайна и объема функционала",
              ]}
              price="от 100 000 ₽"
              buttonLink="https://t.me/KP888_Bot"
              buttonText="узнать стоимость"
            />
          </Container>
        </Section>

        <Section id="process">
          <Container>
            <StagesTimeline
              title="этапы создания вашего сайта"
              stages={[
                {
                  stage: "Этап 1",
                  title: "Погружение",
                  description: "Изучаем вашу компанию, ЦА и конкурентов. Согласовываем структуру.",
                },
                {
                  stage: "Этап 2",
                  title: "Прототип и дизайн",
                  description: "Разрабатываем макет и уникальный дизайн главной и внутренних страниц.",
                },
                {
                  stage: "Этап 3",
                  title: "Верстка и интеграция",
                  description: "Наполняем сайт жизнью: анимации, подключение форм, CMS.",
                },
                {
                  stage: "Этап 4",
                  title: "Наполнение",
                  description: "Работаем с подготовкой и публикацией текстов и изображений.",
                },
                {
                  stage: "Этап 5",
                  title: "Тестирование и запуск",
                  description: "Проверяем всё на ошибках и запускаем проект.",
                },
                {
                  stage: "Этап 6",
                  title: "Обучение и поддержка",
                  description: "Передаем доступы, обучаем ваших сотрудников работе с сайтом.",
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
                  q: "Сколько страниц включает корпоративный сайт?",
                  a: "Обычно от 5 до 20 страниц, включая главную, о компании, услуги, контакты и другие разделы",
                },
                {
                  q: "Можно ли потом расширить функционал?",
                  a: "Да, мы закладываем потенциал для будущего расширения и добавляем новые модули",
                },
                {
                  q: "Предоставляете ли вы контент?",
                  a: "Мы помогаем с структурированием, но тексты и фото предоставляет клиент или заказывает отдельно",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="cta">
          <Container>
            <ContactForm
              title="сделайте первый шаг к сильному имиджу в сети!"
              description="Оставьте контакты, и наш менеджер подготовит для вас индивидуальное коммерческое предложение в течение дня."
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