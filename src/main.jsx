import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import {createBrowserRouter, redirect, RouterProvider} from "react-router";
import Home from "./pages/Home.jsx";
import CategoryAds from "./pages/CategoryAds.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import {AuthProvider} from "./context/Auth/AuthProvider.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreateAd from "./pages/create-ad.jsx";
import CategoriesProvider from "./context/Categories/CategoriesProvider.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import {FavoritesProvider} from "./context/Favorites/FavoritesProvider.jsx";
import Ad from "./pages/Ad.jsx";
import AdErrorPage from "./pages/AdErrorPage.jsx";
import requireAuth from "./utils/authGuard.js";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <h1>Ошибка :(</h1>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "profile",
                element: <ProfilePage/>,
                loader: requireAuth,
            },
            {
                path: "create-ad",
                element: <CreateAd/>,
                loader: requireAuth,
            },
            {
                path: "favorites",
                element: <FavoritesPage/>,
                loader: requireAuth,
            },
            {
                path: "ads/:id",
                element: <Ad/>,
                loader: async ({ params }) => {
                    try {
                        const res = await fetch(`http://localhost:3000/ads/${params.id}`);
                        
                        if (!res.ok) {
                            if (res.status === 404) {
                                throw new Response("Объявление не найдено", { status: 404 });
                            }
                            throw new Response("Ошибка при загрузке объявления", { status: res.status });
                        }
                        
                        const data = await res.json();
                        return data;
                    } catch (error) {
                        if (error instanceof Response) {
                            throw error;
                        }
                        throw new Response("Не удалось загрузить объявление. Проверьте подключение к интернету.", { status: 500 });
                    }
                },
                errorElement: <AdErrorPage/>,
            },
            {
                path: "categories/:id",
                element: <CategoryAds />,
                loader: async ({ params }) => {
                    try {
                        const res = await fetch(`http://localhost:3000/categories/${params.id}`);

                        if (!res.ok) {
                            if (res.status === 404) {
                                throw new Response("Объявление не найдено", { status: 404 });
                            }
                            throw new Response("Ошибка при загрузке объявления", { status: res.status });
                        }

                        const data = await res.json();
                        return data;
                    } catch (error) {
                        if (error instanceof Response) {
                            throw error;
                        }
                        throw new Response("Не удалось загрузить объявление. Проверьте подключение к интернету.", { status: 500 });
                    }
                }
            }
        ],
    },
    {
        path: 'login',
        element: <LoginPage/>,
    },
    {
        path: 'register',
        element: <RegisterPage/>,
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <CategoriesProvider>
              <FavoritesProvider>
                  <RouterProvider router={router} />
              </FavoritesProvider>
          </CategoriesProvider>
      </AuthProvider>
  </StrictMode>,
)
