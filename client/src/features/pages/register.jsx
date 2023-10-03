import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "../../api/auth";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    firstName: yup.string().required("Le prénom est obligatoire"),
    lastName: yup.string().required("Le nom est obligatoire"),
    phone: yup.string().required("Le numéro de téléphone est obligatoire"),
    email: yup.string().email("Veuillez entrer un email valide").required("L'email est obligatoire"),
    password: yup.string().min(4).required("Le mot de passe est obligatoire"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre')
});

export default function Register() {
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [resgistration, { isLoading, isSuccess, isError, error, data }] = useRegisterMutation();
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate(`/validate/${data}`)
        }
    }, [isSuccess]);

    const onSubmit = (data) => {
        resgistration(data);
    };
    console.log(error)
    // console.log(data)
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md px-8 py-4 bg-white rounded-lg shadow-md">
                <h1 className="mb-6 text-3xl font-bold text-gray-800">Inscription</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom :</label>
                            <input
                                {...register("firstName")}
                                id="firstName"
                                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-opacity-50"
                                type="text"
                                placeholder="Prénom"
                            />
                            {errors.firstName && (
                                <p className="text-red-500">{errors.firstName.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom :</label>
                            <input
                                {...register("lastName")}
                                id="lastName"
                                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-opacity-50"
                                type="text"
                                placeholder="Nom"
                            />
                            {errors.lastName && (
                                <p className="text-red-500">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Numéro de téléphone :</label>
                        <input
                            {...register("phone")}
                            id="phone"
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-opacity-50"
                            type="text"
                            placeholder="Numéro de téléphone"
                        />
                        {errors.phone && (
                            <p className="text-red-500">{errors.phone.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email :</label>
                        <input
                            {...register("email")}
                            id="email"
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-opacity-50"
                            type="text"
                            placeholder="Email"
                        />
                        {errors.email && (
                            <p className="text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe :</label>
                        <input
                            {...register("password")}
                            id="password"
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-opacity-50"
                            type="password"
                            placeholder="Mot de passe"
                        />
                        {errors.password && (
                            <p className="text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe :</label>
                        <input
                            {...register("confirmPassword")}
                            id="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-opacity-50"
                            type="password"
                            placeholder="Confirmer le mot de passe"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    {
                        isError && (
                            <p className="text-red-500">
                                {error.status === 400
                                    ? error.data
                                    : error.status === 500
                                        ? error.data
                                        : "Une erreur s'est produite. Veuillez réessayer."}
                            </p>
                        )
                    }



                    <button
                        type="submit"
                        className={`${isLoading ? `disable` : ``}px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-200`}
                    >
                        {isLoading ? "Inscription en cours ..." : " S'inscrire"}
                    </button>
                    <Link to={'/'}>
                        <p className="text-sm">
                            Vous avec dejà un compte ? <span className="text-blue-500">Connectez-vous</span>
                        </p>
                    </Link>
                </form>
            </div>
        </div>

    );
}
