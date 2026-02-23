import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router";
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
import {createLoader} from "./utils/createLoader.js";
import MyAdsPage from "./pages/MyAdsPage.jsx";
import EditAd from "./pages/EditAd.jsx";


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
                path: "my-ads",
                element: <MyAdsPage/>,
                loader: requireAuth,
            },
            {
                path: "edit/:id",
                element: <EditAd/>,
                loader: async ({ params }) => {
                    const auth = requireAuth();
                    if (auth instanceof Response) return auth;

                    const adLoader = createLoader(({ id }) => `http://localhost:3000/ads/${id}`);
                    return adLoader({ params });
                },
            },
            {
                path: "ads/:id",
                element: <Ad/>,
                loader: createLoader(({ id }) => `http://localhost:3000/ads/${id}`),
                errorElement: <AdErrorPage/>,
            },
            {
                path: "categories/:id",
                element: <CategoryAds />,
                loader: createLoader(({ id }) => `http://localhost:3000/categories/${id}`),
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
