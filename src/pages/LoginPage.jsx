import {Link, useNavigate} from "react-router";
import {useContext, useState} from "react";
import {AuthContext} from "../context/Auth/AuthContext.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "../schemas/auth/authSchema.js";


const LoginPage = () => {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const {register, formState: {errors}, handleSubmit} = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleSubmitForm = async (data) => {
        try {
            await login(data.email, data.password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            <Link to="/" className="absolute top-10 left-10 text-2xl">Назад</Link>
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Вход</h2>
                <form className="space-y-4" onSubmit={handleSubmit(handleSubmitForm)}>
                    <input
                        type="text"
                        placeholder="Логин"
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        {...register("email")}
                    />
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                    <input
                        type="password"
                        placeholder="Пароль"
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        {...register("password")}
                    />
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white py-2 rounded-md cursor-pointer hover:bg-blue-900 transition"
                    >
                        Войти
                    </button>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <p className="text-sm">У вас нету аккаунта? Тогда вы можете <Link to="/register" className="text-blue-800">зарегестрироваться</Link>.</p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;