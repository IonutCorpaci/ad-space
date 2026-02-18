
import './App.css'
import Header from "../components/Header.jsx";
import AdsList from "../layouts/AdsList.jsx";
import Footer from "../components/Footer.jsx";
import {Outlet} from "react-router";
import {Toaster} from "react-hot-toast";

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className='flex-1'>
                <Outlet/>
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        className: '',
                        duration: 3000,
                        style: {
                            background: '#155dfc',
                            color: '#fff',
                        },

                        // Default options for specific types
                        success: {
                            duration: 3000,
                            iconTheme: {
                                primary: 'green',
                                secondary: 'black',
                            },
                        },
                        error: {
                            duration: 3000,
                            style: {
                                background: '#ff8278',
                            }
                        },
                    }}
                />
            </main>
            <Footer />
        </div>
    )
}

export default App;
