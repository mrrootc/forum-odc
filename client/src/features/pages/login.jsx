import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useLoginMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const schema = yup.object().shape({
    email: yup.string().email("Veuillez enter un email valide").required("le champ est obligatoire"),
    password: yup.string().min(4).required()
});

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const navigate = useNavigate();
    const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation()

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem("token", JSON.stringify(data));
            navigate("/home")
        }
    }, [isSuccess])

    const onSubmit = (data) => {
        login(data)
    }

    console.log(error)
    console.log(data)
    return (



        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">CONNEXION</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            {...register("email")}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            placeholder="Email"
                        />
                        {errors.email && (
                            <p className="text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input
                            {...register("password")}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="password"
                            placeholder="Mot de passe"
                        />
                        {errors.password && (
                            <p className="text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    {isError && (
                        <p className="text-red-500">
                            {error.status === 400
                                ? error.data
                                : "Une erreur s'est produite. Veuillez réessayer."}
                        </p>)}
                    <button
                        type="submit"
                        className={`${isLoading ? 'disabled bg-blue-500' : ''} bg-blue-500 text-green-50 px-4 py-2 rounded-md`}
                    >
                        {isLoading ? "Connexion..." : "Se connecter"}
                    </button>
                    <Link to={'/register'}>
                        <p className="text-sm">
                            Vous nvez pas de compte? <span className="text-blue-500">Inscrivez-vous</span>
                        </p>
                    </Link>
                </form>
            </div>
        </div>

    )
}
