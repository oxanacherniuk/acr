import ServiceImage from "../assets/images/service/marketing.png";
import ServiceImageWebp from "../assets/images/service/marketing.webp";
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
import ServiceMp4 from "../assets/video/service/marketing.mp4";
import ServiceWebm from "../assets/video/service/marketing.webm";
import { ContactSection } from "../layout/FosForm";

export function ServiceMarketing() {
  return (
    <ServiceLayout>
      <div className={s["service-top"]}>
        <Breadcrumbs title="DIGITAL - МАРКЕТИНГ" links={[]} />
        <ServiceBanner
          title="DIGITAL-МАРКЕТИНГ"
          subtitle="Мы не просто настраиваем рекламу. Мы выстраиваем единую систему привлечения и удержания клиентов, где каждый рубль работает на окупаемость."
          //   description="От стратегии до запуска и полной аналитики."
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
              title="Digital-маркетинг, который <br /><span style='color:var(--accent-light)'>считает вашу прибыль</span>"
              description="Мы выстраиваем комплексную систему продвижения, где все каналы работают согласованно на ваш результат."
              buttonText="заказать аудит и стратегию"
              buttonLink="https://t.me/KP888_Bot"
            />
          </Container>
        </Section>

        <Section id="benefits">
          <Container title="наша философия в маркетинге">
            <FeatureGrid
              items={[
                {
                  title: "Глубина прежде <br /> действий",
                  text: "Мы не бросаемся в рекламу. Сначала мы проводим глубокий аудит, анализируем вашу ЦА и рынок. Каждая наша гипотеза основана на данных.",
                },
                {
                  title: "Комплексность <br /> и синергия",
                  text: "Мы связываем все каналы продвижения (SEO, контекст, SMM) в единую экосистему. Это убирает конфликт каналов и повышает общую эффективность.",
                },
                {
                  title: "Прозрачность <br /> и результат",
                  text: "Мы считаем деньги. Вы всегда видите, какой канал сколько принес и какова окупаемость. Наша цель — не потратить бюджет, а заработать для вас.",
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="services">
          <Container title="Полный цикл услуг для вашего роста">
            <ServiceTabs
              initialTab="complex"
              tabs={[
                {
                  id: "complex",
                  title: "Комплексное продвижение",
                  items: [
                    { text: "SEO-оптимизация" },
                    {
                      text: "Ведение и стратегия контекстной рекламы (Яндекс.Директ)",
                    },
                    { text: "Настройка и ведение рекламы в социальных сетях" },
                  ],
                  additionalContent: {
                    result:
                      "Увеличение видимости вашего бренда в сети, постоянный поток целевых заявок со всех каналов.",
                    target:
                      "Компаниям, которые хотят получать стабильный поток заявок и контролировать рекламный бюджет.",
                    price: "от 25 000 ₽",
                    buttonText: "рассчитать под ключ",
                    buttonLink: "https://t.me/KP888_Bot",
                  },
                },
                {
                  id: "audit",
                  title: "Аудит и аналитика",
                  items: [
                    {
                      text: "Аудит сайта, юзабилити, рекламных каналов и конкурентов",
                    },
                    { text: "Анализ воронки продаж и выявление «узких» мест" },
                  ],
                  additionalContent: {
                    result:
                      "Готовый план по оптимизации и развитию digital-направления с четким KPI.",
                    target:
                      "Тем, кто хочет понять, что не так с текущим продвижением, и получить дорожную карту для исправления.",
                    price: "от 20 000 ₽",
                    buttonText: "заказать аудит",
                    buttonLink: "https://t.me/KP888_Bot",
                  },
                },
                {
                  id: "strategy",
                  title: "Стратегия развития",
                  items: [
                    {
                      text: "Разработка детальной годовой дорожной карты по digital-продвижению",
                    },
                    { text: "Определение целей, этапов, бюджета" },
                    { text: "Прогноз по лидам и ROI" },
                  ],
                  additionalContent: {
                    result:
                      "Понимание, куда и зачем двигаться, и как распределять ресурсы на год вперед.",
                    target:
                      "Собственникам бизнеса и директорам по маркетингу для планирования и обоснования бюджета.",
                    price: "от 60 000 ₽",
                    buttonText: "разработать стратегию",
                    buttonLink: "https://t.me/KP888_Bot",
                  },
                },
                {
                  id: "smm",
                  title: "SMM",
                  items: [
                    { text: "Разработка контент-стратегии" },
                    { text: "Создание креативов и текстов" },
                    { text: "Ведение сообществ" },
                    { text: "Запуск и ведение таргетированной рекламы" },
                    { text: "Работа с вовлечением" },
                  ],
                  additionalContent: {
                    result:
                      "Узнаваемость бренда, лояльное комьюнити и постоянный поток лидов из соцсетей.",
                    target:
                      "Компаниям, которые хотят строить долгосрочные отношения с аудиторией в Instagram, VK, Telegram.",
                    price: "от 40 000 ₽",
                    buttonText: "продумать SMM",
                    buttonLink: "https://t.me/KP888_Bot",
                  },
                },
              ]}
            />
          </Container>
        </Section>

        <Section id="process">
          <Container>
            <StagesTimeline
              title="как мы выстраиваем работу?"
              stages={[
                {
                  stage: "этап 1",
                  title: "Диагностика",
                  description:
                    "Проводим глубокий аудит текущей ситуации (если есть) и погружаемся в бизнес-процессы.",
                },
                {
                  stage: "этап 2",
                  title: "Стратегия",
                  description:
                    "Согласовываем цели, KPI и разрабатываем поэтапный план работ.",
                },
                {
                  stage: "этап 3",
                  title: "Реализация",
                  description:
                    "Запускаем и ведем рекламные каналы, оптимизируем сайт, наполняем соцсети.",
                },
                {
                  stage: "этап 4",
                  title: "Анализ",
                  description:
                    "Еженедельно и ежемесячно снимаем данные, анализируем эффективность, тестируем гипотезы.",
                },
                {
                  stage: "этап 5",
                  title: "Отчет и корректировка",
                  description:
                    "Предоставляем понятные отчеты о результатах и корректируем стратегию для увеличения ROI.",
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
                  q: "Сколько времени нужно для получения первых результатов?",
                  a: "Первые результаты от контекстной рекламы видны в течение 1-2 недель. SEO требует больше времени - от 1 до 3 месяцев для стабильного роста позиций.",
                },
                {
                  q: "Как вы измеряете эффективность кампаний?",
                  a: "Мы настраиваем сквозную аналитику и отслеживаем каждый этап воронки продаж - от клика до покупки. Вы получаете понятные отчеты с расчетом ROI.",
                },
                {
                  q: "Работаете ли вы с небольшими бюджетами?",
                  a: "Да, мы разрабатываем стратегии для разных бюджетов. Главное - правильное распределение средств по наиболее эффективным каналам.",
                },
              ]}
            />
          </Container>
        </Section>

        {/* <Section id="cta">
          <Container>
            <ContactForm
              title="готовы выстроить маркетинг, который приносит деньги?"
              description="Закажите бесплатный экспресс-аудит ваших рекламных каналов. Наш специалист проанализирует их и даст 3 рекомендации по улучшению уже завтра."
              additionalText="Это ни к чему вас не обязывает. Только экспертное мнение."
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
                  name: "website",
                  type: "text",
                  placeholder: "Ссылка на сайт",
                  validation: yup.string().url("Введите корректный URL"),
                },
                {
                  name: "service_type",
                  type: "select",
                  placeholder: "Интересующая услуга",
                  validation: yup.string(),
                  options: [
                    { value: "complex", label: "Комплексное продвижение" },
                    { value: "audit", label: "Аудит и аналитика" },
                    { value: "strategy", label: "Стратегия развития" },
                    { value: "smm", label: "SMM" },
                    { value: "consultation", label: "Консультация" },
                  ],
                },
              ]}
              submitText="Получить бесплатный аудит"
            />
          </Container>
        </Section> */}
        <ContactSection />
        {/* <QuizLayout /> */}
      </div>
    </ServiceLayout>
  );
}
