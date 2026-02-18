import {Link, useNavigate} from "react-router";
import {useContext, useState} from "react";
import {AuthContext} from "../context/Auth/AuthContext.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "../schemas/auth/authSchema.js";

const RegisterPage = () => {

    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {register, formState: {errors}, handleSubmit} = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const handleSubmitForm = async (data) => {
        // e.preventDefault();
        try {
            await registerUser(data.name, data.email, data.password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Link to="/" className="absolute top-10 left-10 text-2xl">Назад</Link>
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Зарегестрироваться</h2>
                <form className="space-y-4" onSubmit={handleSubmit(handleSubmitForm)}>
                    <input
                        type="text"
                        placeholder="Имя"
                        // value={name}
                        // onChange={e => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        {...register("name")}
                    />
                    {errors.name && (
                        <span className="text-red-600">{errors.name.message}</span>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        // value={email}
                        // onChange={e => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        {...register("email")}
                    />
                    {errors.email && (
                        <span className="text-red-600">{errors.email.message}</span>
                    )}
                    <input
                        type="password"
                        placeholder="Пароль"
                        // value={password}
                        // onChange={e => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        {...register("password")}
                    />
                    {errors.password && (
                        <span className="text-red-600">{errors.password.message}</span>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white py-2 rounded-md cursor-pointer hover:bg-blue-900 transition"
                    >
                        Зарегестрироваться
                    </button>
                    <p className="text-sm">Уже есть аккаунт? <Link to="/login" className="text-blue-800">Войти</Link></p>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage