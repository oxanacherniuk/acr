import ServiceImage from "../assets/images/internet-shop.webp";
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

export function ServiceEcommerce() {
  return (
    <ServiceLayout>
      <div className={s["service-top"]}>
        <Breadcrumbs
          title="Интернет-магазин"
          links={[
            {
              href: "/services/corporate",
              label: "Корпоративный сайт",
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
          title="Интернет-магазин"
          subtitle="Запустите мощный интернет-магазин, который продает 24/7. Всё включено — от домена до маркетинга и онлайн-кассы."
        //   description="Вы сосредотачиваетесь на товарах, мы берём на себя всю техническую часть."
          imageSrc={ServiceImage}
          imageAlt="Современный интернет-магазин"
        />
      </div>
      
      <div className={s["service-page"]}>
        <Section id="hero">
          <Container>
            <ServiceHero
              title="Интернет-магазин под ключ — <br /><span style='color:var(--accent-light)'>ваш новый канал продаж</span>"
              description="Полностью готовый к работе инструмент для вашего бизнеса, современный и функциональный интернет-магазин с корзиной, оформлением заказов, оповещениями и админ-панелью."
              buttonText="получить коммерческое предложение"
              buttonLink="https://t.me/KP888_Bot"
            />
          </Container>
        </Section>

        <Section id="benefits">
          <Container title="почему выбирают нас">
            <FeatureGrid
              items={[
                {
                  title: "Домен и хостинг <br /> в подарок на 1 год",
                  text: "Полностью бесплатное размещение в первый год",
                },
                {
                  title: "Готов к работе <br /> с онлайн-платежами",
                  text: "Интеграция с популярными платежными системами",
                },
                {
                  title: "Полная маркетинговая <br /> подготовка",
                  text: "Анализ ЦА, конкурентов и маркетинговая стратегия",
                },
                {
                  title: "Тестирование <br /> и гарантия запуска",
                  text: "Гарантия 1 год на все работы и поддержку",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="services">
          <Container title="что входит в стоимость сайта?">
            <ServiceTabs
              initialTab="foundation"
              tabs={[
                {
                  id: "foundation",
                  title: "Фундамент и Безопасность",
                  items: [
                    { text: "Домен и хостинг на 1 год в подарок" },
                    { text: "Установка SSL сертификата" },
                    { text: "Система управления сайтом (CMS)" },
                    { text: "Соответствие ФЗ «О персональных данных» (152-ФЗ)" },
                    { text: "Подключение онлайн-кассы и соответствие 54-ФЗ" },
                  ],
                },
                {
                  id: "marketing",
                  title: "Маркетинг и Конверсия",
                  items: [
                    { text: "Анализ тематики и конкурентов" },
                    { text: "Анализ целевой аудитории" },
                    { text: "Маркетинговая стратегия" },
                    { text: "Индивидуальный мотивирующий дизайн" },
                    { text: "Составление УТП" },
                    { text: "Блокировка советника Яндекс" },
                    { text: "Модули рекомендаций товаров" },
                    { text: "Формы обратной связи" },
                    { text: "Фото-/видео-отзывы" },
                    { text: "Модуль с логотипами клиентов" },
                  ],
                },
                {
                  id: "functionality",
                  title: "Функционал и Автоматизация",
                  items: [
                    { text: "Полная проработка структуры сайта" },
                    { text: "Подключение платежей по банковским картам" },
                    { text: "Настройка бизнес-процессов обслуживания" },
                    { text: "Интерактивный калькулятор" },
                    { text: "Комплексная система автоматизации" },
                    { text: "Подключение корзины и модулей доставки" },
                    { text: "Многоуровневый каталог товаров" },
                    { text: "Карточка товара (полная)" },
                    { text: "Интеграция с CRM" },
                    { text: "Настройки для прайс-листов поставщиков" },
                    { text: "Интерактивная карта (Яндекс)" },
                    { text: "Online-консультант" },
                    { text: "Потенциал для расширения" },
                  ],
                },
                {
                  id: "technical",
                  title: "Техническое совершенство",
                  items: [
                    { text: "Адаптация для всех устройств" },
                    { text: "Кроссбраузерность" },
                    { text: "Ускорение загрузки" },
                    { text: "Тестирование всего проекта на ошибки" },
                    { text: "Возможность упаковки в мобильное приложение" },
                  ],
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="solution">
          <Container>
            <InfoSection
              title="прозрачное ценообразование без скрытых платежей"
              description="Вы платите за комплексное решение, а не просто за «создание сайта». В указанную стоимость уже входит 34 пункта работ. Это полный пакет «под ключ», который выводит ваш бизнес в онлайн с полной юридической и технической готовностью."
              priceNotes={[
                "Точная стоимость зависит от объема каталога и специфичных интеграций.",
                "Гарантия 1 год на все работы и техническую поддержку",
              ]}
              price="от 120 000 ₽"
              additionalOptions={{
                title: "что влияет на стоимость?",
                items: [
                  { name: "Размер каталога", price: "Количество товаров" },
                  { name: "Сложность интеграций", price: "CRM, 1C, ERP" },
                  { name: "Уникальный функционал", price: "Нестандартные модули" },
                ]
              }}
              buttonLink="https://t.me/KP888_Bot"
              buttonText="узнать стоимость"
            />
          </Container>
        </Section>

        <Section id="process">
          <Container>
            <StagesTimeline
              title="этапы создания вашего интернет-магазина"
              stages={[
                {
                  stage: "Этап 1",
                  title: "Заявка и обсуждение",
                  description: "Бесплатная консультация и обсуждение проекта",
                },
                {
                  stage: "Этап 2",
                  title: "Аналитика",
                  description: "Анализ ниши, конкурентов и целевой аудитории",
                },
                {
                  stage: "Этап 3",
                  title: "Прототип и дизайн",
                  description: "Создание и согласование макета магазина",
                },
                {
                  stage: "Этап 4",
                  title: "Разработка",
                  description: "Верстка, программирование и подключение функционала",
                },
                {
                  stage: "Этап 5",
                  title: "Тестирование",
                  description: "Наполнение товарами и комплексное тестирование",
                },
                {
                  stage: "Этап 6",
                  title: "Запуск",
                  description: "Запуск проекта и обучение управлению",
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
                  q: "Сколько времени занимает разработка?",
                  a: "От 30 до 90 дней в зависимости от сложности проекта и объема каталога",
                },
                {
                  q: "Можно ли интегрировать с моей CRM?",
                  a: "Да, мы интегрируем с популярными CRM системами и разрабатываем кастомные интеграции",
                },
                {
                  q: "Предоставляете ли вы обучение?",
                  a: "Да, мы проводим полное обучение управлению магазином и предоставляем инструкции",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="cta">
          <Container>
            <ContactForm
              title="готовы увеличить свои продажи?"
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
                {
                  name: "catalog_size",
                  type: "select",
                  placeholder: "Примерный размер каталога",
                  validation: yup.string(),
                  options: [
                    { value: "small", label: "До 50 товаров" },
                    { value: "medium", label: "50-200 товаров" },
                    { value: "large", label: "200-500 товаров" },
                    { value: "xlarge", label: "Более 500 товаров" },
                  ],
                },
                {
                  name: "integration",
                  type: "select",
                  placeholder: "Необходимые интеграции",
                  validation: yup.string(),
                  options: [
                    { value: "none", label: "Без интеграций" },
                    { value: "crm", label: "CRM система" },
                    { value: "1c", label: "1C" },
                    { value: "erp", label: "ERP система" },
                    { value: "other", label: "Другое" },
                  ],
                },
              ]}
              submitText="Получить КП"
            />
          </Container>
        </Section>

        <QuizLayout />
      </div>
    </ServiceLayout>
  );
}