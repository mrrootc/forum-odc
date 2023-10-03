import { useState } from "react";
import Question from "../../components/Question";
import { useCreateMessageMutation, useGetMessageQuery } from "../../api/message";
import { useParams } from "react-router-dom";

export default function Message() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [createMessage, { isLoading, isError, error }] = useCreateMessageMutation();
  const { idcat } = useParams();
  const token = JSON.parse(localStorage.getItem('token'));
  const userId = token?.user._id;

  // Fetch messages using the useGetMessageQuery hook
  const { data: messages, isLoading: isLoadingMessages, isError: isErrorMessages, isSuccess } = useGetMessageQuery(idcat);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleCreateQuestion = async () => {
    try {
      // Create a new message
      createMessage({ content: question, auteur: userId, category: idcat });
      setIsModalOpen(false);
      setQuestion("");
    } catch (error) {
      console.error("Erreur lors de la création de la question :", error);
    }
  };
  console.log(messages)
  console.log(idcat)
  if (isSuccess && messages?.category) {
    console.log("existe")
  } else { console.log("no existe") }
  return (
    <div className="flex flex-col">
      <div className="my-2">
        <button
          onClick={openModal}
          className="px-3 py-2 font-serif text-white bg-blue-500 rounded-md ml-9"
        >
          Posez une question
        </button>
      </div>

      {/* Display messages */}
      {isLoadingMessages ? (
        <p>Loading messages...</p>
      ) : isErrorMessages ? (
        <p>Error loading messages</p>
      ) : (
        messages  &&
          messages.map((message) => <Question key={message.id} name={message.content} />)
      )}

      {/* Le modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75" onClick={closeModal}></div>
          <div className="z-50 w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Posez une question</h2>

            {/* Formulaire ou contenu du modal */}
            <div className="mb-4">
              <label htmlFor="question" className="block text-sm font-medium text-gray-600">
                Question :
              </label>
              <input
                type="text"
                id="question"
                name="question"
                value={question}
                onChange={handleQuestionChange}
                className="w-full p-2 mt-1 border rounded-md"
              />
            </div>

            <button
              onClick={handleCreateQuestion}
              className="px-4 py-2 mx-2 text-white bg-blue-500 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "En cours..." : "Créer"}
            </button>

            <button
              onClick={closeModal}
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
            >
              Fermer
            </button>

            {isError && <div className="mt-2 text-red-500">{error?.message}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
