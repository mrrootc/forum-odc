import React, { useState } from "react";
import { useCreateSubjectMutation } from "../api/subject";

export default function Modal() {
  const [title, setTitle] = useState("");
  const [create, { isLoading }] = useCreateSubjectMutation();
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(token)?.user;

  const handleSubmit = () => {
    const subjectData = {
      title: title,
      auteur: user._id,
    };

    setShowModal(false);
    create(subjectData);
    setTitle("");
  };

  return (
    <>
      <button
        className="px-3 py-2 font-serif text-white bg-blue-500 rounded-full ml-9"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Créer un sujet
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75" onClick={() => setShowModal(false)}></div>
          <div className="z-50 w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-semibold">Création d'un sujet</h3>
              <button className="text-black bg-transparent border-0" onClick={() => setShowModal(false)}>
                <span className="block w-6 h-6 py-0 text-xl text-black bg-gray-400 rounded-full opacity-7">
                  x
                </span>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-bold text-black text-md">Titre du sujet</label>
                <input
                  className="w-full px-3 py-2 text-black border rounded-md shadow appearance-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-6 py-3 text-sm font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "En cours..." : "Soumettre"}
                </button>
                <button
                  className="px-6 py-3 font-bold text-red-500 rounded-md text-md hover:text-red-600"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
