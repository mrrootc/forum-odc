import { useState } from "react";
import { useParams } from "react-router-dom";
import { useValidateMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";



export default function Validation() {

 
  const [code, setCode] = useState("");
  const [validate, {isError}] = useValidateMutation();
  const navigate = useNavigate();
  // const email = useParams();
  const handleValidation = () => {
   
    // const data = {
    //   email,
    //   verifCode: code
    // };


    validate({verifCode: code}).unwrap().then(() => {

      navigate('/');
    }).catch((error) => {
      
      console.error("Validation error:", error);
    });
    console.log(isError)
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Validation du compte</h1>
        <p>Saisissez le code de validation reçu par e-mail :</p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 mt-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-opacity-50"
          placeholder="Code de validation"
        />
        {/* {isError && (
          <p className="text-red-500">
            {error.status === 400
              ? error.data.message
              : error.status === 500
              ? error.error
              : "Une erreur est survenue, veuillez réessayer ultérieurement"}
          </p>
        )} */}
        <button
          onClick={handleValidation}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-200"
        >
          Valider
        </button>
      </div>
    </div>
  );
}

