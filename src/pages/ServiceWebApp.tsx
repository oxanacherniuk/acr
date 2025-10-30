// import ServiceImage from '../assets/images/web-app-service.png';
// import { ServiceLayout } from '../components/services/ServiceLayout';
// import { Breadcrumbs } from '../components/services/Breadcrumbs';
// import { ServiceBanner } from '../components/services/ServiceBanner';
// import { Section } from '../components/ui/Section';
// import { Container } from '../components/ui/Container';
// import { QuizLayout } from '../layout/Quiz/Quiz';
// import { InfoSection } from '../components/services/InfoSectionProps';
// import s from '../styles/ServicePage.module.css';

// export function ServiceWebApp() {
//   return (
//     <ServiceLayout>
//       <div className={s['service-top']}>
//         <Breadcrumbs
//           title="Веб-приложение"
//           links={[
//             {
//               href: "/services/landings",
//               label: "Лендинг",
//               className: "rasdel -b",
//             },
//             {
//               href: "/services/corporate", 
//               label: "Корпоративный сайт",
//               className: "-b",
//             },
//           ]}
//         />
//         <ServiceBanner
//           title="РАЗРАБОТКА WEB ПРИЛОЖЕНИЙ"
//           subtitle="Разрабатываем веб-приложения c нуля или подключаемся на любой стадии проекта. Создаем современные, масштабируемые и высокопроизводительные решения с использованием передовых технологий и лучших практик разработки."
//           imageSrc={ServiceImage}
//           imageAlt="Разработка web приложений"
//         />
//       </div>
//       <div className={s['service-page']}>
//         <Section id="info">
//           <Container>
//             <InfoSection
//               title="разработка web приложений"
//               description="Разрабатываем веб-приложения c нуля или подключаемся на любой стадии проекта. Создаем современные, масштабируемые и высокопроизводительные решения с использованием передовых технологий и лучших практик разработки."
//               additionalContent={
//                 <div>
//                   <div style={{marginBottom: '2rem'}}>
//                     <h3>условия работы</h3>
//                     <ol>
//                       <li>Анализ требований и проектирование архитектуры</li>
//                       <li>Разработка по методологии Agile</li>
//                       <li>Поэтапная сдача проекта</li>
//                       <li>Техническая поддержка после запуска</li>
//                       <li>Гибкие условия сотрудничества</li>
//                       <li>Прозрачная отчетность и коммуникация</li>
//                     </ol>
//                   </div>
//                   <div>
//                     <h3>сроки выполнения</h3>
//                     <p>От 2 недель до 6 месяцев в зависимости от сложности проекта. Мы обеспечиваем соблюдение сроков благодаря тщательному планированию и использованию современных методологий разработки.</p>
//                   </div>
//                 </div>
//               }
//               price="от 150 000 ₽"
//               buttonLink="https://t.me/KP888_Bot"
//               buttonText="обсудить проект"
//             />
//           </Container>
//         </Section>

//         <QuizLayout />
//       </div>
//     </ServiceLayout>
//   );
// }