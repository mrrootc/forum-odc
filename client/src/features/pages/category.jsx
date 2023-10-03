import { useState } from "react";
import Category from "../../components/category";
import { useGetCategoryQuery } from "../../api/category";
import { Link, Outlet, useParams } from "react-router-dom";
import { useCreateCategoryMutation } from "../../api/category";

export default function CategoryPage() {
    const { id, idcat } = useParams();
    const { data } = useGetCategoryQuery(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        picture: "",
        subject: id
    });
    const [create, { isLoading}] = useCreateCategoryMutation()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = () => {
        create(formData)
        console.log(formData)
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <h1>Loading ...</h1>;
    }
    console.log('id subject :', id)
    console.log("id category: ", idcat)

    return (
        <div className="ml-60">
            {!idcat && (
                <>
                    <div className="my-2 ml-5">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-3 py-2 font-serif text-white bg-blue-500 rounded-md"
                        >
                            Créer une catégorie
                        </button>
                    </div>

                    <div className="grid justify-center grid-cols-3 gap-4 mx-3">
                        {data ? (
                            data.map((item) => (
                                <Link key={item._id} to={`${item._id}`}>
                                    <Category name={item.title} image={item.picture} />
                                </Link>
                            ))
                        ) : (
                            'Aucune catégorie pour ce sujet'
                        )}
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen">
                                <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                                    <h2 className="mb-4 text-lg font-semibold">Créer une catégorie</h2>
                                    {/* Formulaire de création de catégorie */}
                                    <form>
                                        <div className="mb-4">
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                                                Titre :
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className="w-full p-2 mt-1 border rounded-md"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                                                Image URL :
                                            </label>
                                            <input
                                                type="text"
                                                id="picture"
                                                name="picture"
                                                value={formData.picture}
                                                onChange={handleInputChange}
                                                className="w-full p-2 mt-1 border rounded-md"
                                            />
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 mr-3 font-serif bg-gray-300 rounded-md"
                                        >
                                            Fermer
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleFormSubmit}
                                            className="px-4 py-2 font-serif text-white bg-blue-500 rounded-md"
                                        >
                                            Créer
                                        </button>

                                    </form>


                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            <Outlet />
        </div>
    );
}
