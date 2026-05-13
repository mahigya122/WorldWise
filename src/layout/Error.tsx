import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  let errorMessage = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      
      <p className="my-4 text-gray-600">
        {errorMessage}
      </p>

      <button 
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        &larr; Go Back
      </button>
    </div>
  );
}

export default Error;
