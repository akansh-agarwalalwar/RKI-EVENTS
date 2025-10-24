import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-wedding.jpg";
import {
  Calendar,
  Palette,
  Camera,
  Music,
  MapPin,
  Utensils,
  Mail,
  Clock,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionDivider } from "@/utils/SectionDivider";
import { useState, useEffect } from "react";
import { apiClient } from "@/services/api";
import { toast } from "sonner";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

const Index = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      setTestimonialsLoading(true);
      const response = await fetch(`${apiClient.url}/testimonials/`);
      const result = await response.json();

      if (response.ok && result.success) {
        setTestimonials(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch testimonials');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Show fallback testimonials or empty state
      setTestimonials([]);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const services = [
    {
      icon: Calendar,
      title: "Full Planning",
      description: "Complete wedding planning from start to finish"
    },
    {
      icon: Clock,
      title: "Partial Planning",
      description: "Assistance with specific aspects of your wedding"
    },
    {
      icon: Star,
      title: "Day-of Coordination",
      description: "Ensure your wedding day runs smoothly"
    },
    {
      icon: MapPin,
      title: "Venue Selection",
      description: "Find the perfect location for your celebration"
    },
    {
      icon: Palette,
      title: "Decoration",
      description: "Beautiful decor that reflects your style"
    },
    {
      icon: Utensils,
      title: "Catering",
      description: "Exquisite culinary experiences"
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Capture every precious moment"
    },
    {
      icon: Music,
      title: "Entertainment",
      description: "Music and entertainment coordination"
    },
    {
      icon: Mail,
      title: "Invitations",
      description: "Custom-designed wedding stationery"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero Section */}
        <section aria-label="Hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>

          <div className="relative z-10 text-center px-4">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-down">
              Making Your Dream<br />Wedding a Reality
            </h1>
            <p className="font-inter text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
              From intimate ceremonies to grand celebrations, we bring your vision to life with elegance and grace
            </p>
            <div className="animate-scale-in" style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}>
              <Button variant="hero" size="lg" asChild className="hover:scale-105 transition-transform duration-300">
                <Link to="/contact">Start Planning</Link>
              </Button>
            </div>
          </div>
        </section>
        <SectionDivider />

        {/* Services Section */}
        <section aria-label="Our Services" className="py-20 px-4 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive wedding planning services tailored to your unique vision
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(237, 66, 100, 0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  className="h-full"
                >
                  <Card
                    className="border-border bg-card group cursor-pointer h-full flex flex-col justify-between"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-romantic flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="text-rose group-hover:animate-pulse-slow" size={24} />
                      </div>
                      <h3 className="font-playfair text-xl font-semibold mb-2 group-hover:text-rose transition-colors">{service.title}</h3>
                      <p className="font-inter text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <SectionDivider flip />

        {/* Testimonials Section */}
        <section aria-label="Testimonials" className="py-20 px-4 bg-secondary">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Testimonials</h2>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear what our happy couples have to say about their special day
              </p>
            </div>

            {testimonialsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose mx-auto mb-4"></div>
                <p className="font-inter text-muted-foreground">Loading testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="font-playfair text-2xl font-semibold mb-4">No testimonials yet</h3>
                <p className="font-inter text-muted-foreground">Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={testimonial._id}
                    className="border-border bg-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 animate-slide-up group cursor-pointer"
                    style={{ animationDelay: `${index * 0.15}s`, opacity: 0, animationFillMode: "forwards" }}
                  >
                    <CardContent className="p-6">
                      <p className="font-inter text-sm text-foreground mb-6 italic leading-relaxed">
                        "{testimonial.message}"
                      </p>
                      <div className="text-center">
                        <p className="font-playfair font-semibold text-rose group-hover:text-gold transition-colors duration-300">
                          {testimonial.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Call to action for testimonials */}
            {testimonials.length > 0 && (
              <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}>
                <p className="font-inter text-muted-foreground mb-4">
                  Ready to create your own love story?
                </p>
                <Button variant="outline" asChild className="hover:scale-105 transition-transform duration-300">
                  <Link to="/contact">Share Your Vision</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
        <SectionDivider />

        {/* CTA Section */}
        <section aria-label="Call to Action" className="py-20 px-4 bg-gradient-romantic overflow-hidden">
          <div className="container mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Ready to Plan Your Perfect Day?
            </h2>
            <p className="font-inter text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
              Let's create something beautiful together. Get in touch to start planning your dream wedding.
            </p>
            <div className="animate-scale-in" style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}>
              <Button variant="gold" size="lg" asChild className="hover:scale-105 transition-transform duration-300 animate-float">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
