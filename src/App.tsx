import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AppLayout from './layout/environment';
import NotFound from './pages/NotFound';
// Ленивые импорты с корректными путями

const HomePage = lazy(() => import("./pages/index"));
const AmentiesPage = lazy(() => import("./pages/amenities"));
const DevelopersPage = lazy(() => import("./pages/developers"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const DeveloperPage = lazy(() => import("./pages/developerPage"));

// потом вынести и вообще нормальный сделать 
const LoadingSpinner = () => {
  return <div>Загрузка...</div>
}

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingSpinner  />}>
              <HomePage  />
            </Suspense>
          ),
        },
        {
          path: "amenties",
          element: (
            <Suspense fallback={<LoadingSpinner  />}>
              <AmentiesPage  />
            </Suspense>
          ),
        },
           {
          path: "developers",
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<LoadingSpinner  />}>
              <DevelopersPage  />
            </Suspense>
              ),
            },
            {
              path: ":id",
              element: (
                <Suspense fallback={<LoadingSpinner  />}>
                  <DeveloperPage  />
                </Suspense>
              ),
            },
          ],
         
        },
           {
          path: "soglasie-obrabotka-pers-dannih",
          element: (
            <Suspense fallback={<LoadingSpinner  />}>
              <PrivacyPolicy  />
            </Suspense>
          ),
        },
          
        {
          path: "*",
          element: (
            <Suspense fallback={<LoadingSpinner  />}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
