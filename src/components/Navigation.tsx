import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
const whatsappNumber = "919999999999"; // Replace with your WhatsApp number
const whatsappMessage = encodeURIComponent("Hello! I'm interested in your wedding planning services.");

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const setDocumentTheme = (theme: string) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  };

  // Sync theme on mount and when changed
  React.useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-playfair text-2xl font-semibold text-foreground">
                RKI Events
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-inter text-sm font-medium transition-colors hover:text-rose ${
                    isActive(link.path) ? "text-rose" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="hero" size="sm" asChild>
                <Link to="/contact">Start Planning</Link>
              </Button>
              {/* Theme Switcher */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  aria-label="Light mode"
                  className={`p-2 rounded-full transition-colors ${theme === "light" ? "bg-rose/20 text-rose" : "hover:bg-muted"}`}
                  onClick={() => setTheme("light")}
                >
                  <Sun size={18} />
                </button>
                <button
                  aria-label="Dark mode"
                  className={`p-2 rounded-full transition-colors ${theme === "dark" ? "bg-rose/20 text-rose" : "hover:bg-muted"}`}
                  onClick={() => setTheme("dark")}
                >
                  <Moon size={18} />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-6 animate-fade-in">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-inter text-sm font-medium transition-colors hover:text-rose ${
                      isActive(link.path) ? "text-rose" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button variant="hero" size="sm" className="w-full" asChild>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Start Planning
                  </Link>
                </Button>
                {/* Theme Switcher for mobile */}
                <div className="flex items-center justify-center space-x-2 pt-4">
                  <button
                    aria-label="Light mode"
                    className={`p-2 rounded-full transition-colors ${theme === "light" ? "bg-rose/20 text-rose" : "hover:bg-muted"}`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun size={18} />
                  </button>
                  <button
                    aria-label="Dark mode"
                    className={`p-2 rounded-full transition-colors ${theme === "dark" ? "bg-rose/20 text-rose" : "hover:bg-muted"}`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex fixed bottom-6 right-6 z-50 items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-300 group"
        style={{ boxShadow: "0 8px 32px rgba(37, 211, 102, 0.25)" }}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} className="text-white group-hover:scale-110 transition-transform" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </>
  );
};

export default Navigation;
