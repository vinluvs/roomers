
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 text-center font-sans">
      <div>
        <img
          src="/assets/lost-in-space.jpg"
          alt="Cute mascot"
          className="rounded-full mb-6 shadow-lg w-32 h-32 animate-bounce"
        />
      </div>
      <h1 className="text-4xl font-bold text-purple-700 mb-4">Oops! Page Lost in Space</h1>
      <p className="text-lg text-purple-600 mb-6">
        It seems you’ve taken a wrong turn. But every great journey has detours!
      </p>
      <a
        href="/"
        className="text-white bg-purple-600 px-6 py-3 rounded-full shadow-lg hover:bg-purple-800 hover:shadow-xl transition-transform transform hover:scale-105"
      >
        🚀 Take Me Home
      </a>
    </div>
  );
};

export default NotFoundPage;