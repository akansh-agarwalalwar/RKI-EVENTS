import { Link } from "react-router-dom";
import { Instagram, Facebook, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-playfair text-xl font-semibold">RKI Events</h3>
            <p className="font-inter text-sm text-muted-foreground">
              Making your dream wedding a reality with elegance and grace.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-inter font-semibold text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="font-inter text-sm text-muted-foreground hover:text-rose transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="font-inter text-sm text-muted-foreground hover:text-rose transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-inter text-sm text-muted-foreground hover:text-rose transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="font-inter text-sm text-muted-foreground hover:text-rose transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-inter font-semibold text-sm">Services</h4>
            <ul className="space-y-2 font-inter text-sm text-muted-foreground">
              <li>Full Planning</li>
              <li>Partial Planning</li>
              <li>Day-of Coordination</li>
              <li>Venue Selection</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-inter font-semibold text-sm">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-rose transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-rose transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-inter text-sm text-muted-foreground">
              © 2025 RKI Events. All rights reserved.
            </p>
            <p className="font-inter text-sm text-muted-foreground flex items-center gap-2">
              Made with <Heart size={14} className="text-rose fill-rose" /> for love stories
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
