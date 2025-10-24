import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Animated floating rings */}
      <svg className="absolute left-1/4 top-1/4 animate-float-slow" width="120" height="120" fill="none" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" stroke="#f7d6e0" strokeWidth="8" />
        <circle cx="60" cy="60" r="30" stroke="#f9e7c3" strokeWidth="6" />
      </svg>
      <svg className="absolute right-1/4 bottom-1/4 animate-float-slow" width="80" height="80" fill="none" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="30" stroke="#f7d6e0" strokeWidth="6" />
      </svg>
      <div className="text-center relative z-10">
        <h1 className="mb-4 text-6xl font-bold text-rose animate-bounce">404</h1>
        <p className="mb-4 text-xl text-gray-600 animate-fade-in">Oops! Page not found</p>
        <a href="/" className="inline-block px-6 py-3 bg-rose text-white rounded-full shadow-lg hover:bg-rose/90 transition-all duration-300 animate-float">Return to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
