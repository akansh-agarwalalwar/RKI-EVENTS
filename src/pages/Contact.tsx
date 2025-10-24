import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/services/api";
import { SectionDivider } from "@/utils/SectionDivider";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${apiClient.url}/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Thank you! We'll be in touch soon.");
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          message: ""
        });
      } else {
        toast.error(result.error || "Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-romantic">
        <div className="container mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 animate-fade-in-down">
            Get In Touch
          </h1>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
            Let's start planning your perfect wedding. We'd love to hear from you!
          </p>
        </div>
      </section>
      <SectionDivider />
      {/* Contact Section */}
      <section className="py-16 px-4 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border bg-card hover:shadow-elegant transition-all duration-500 animate-fade-in-left">
              <CardContent className="p-8">
                <h2 className="font-playfair text-3xl font-bold mb-6 animate-fade-in-up">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
                    <label htmlFor="name" className="font-inter text-sm font-medium mb-2 block">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="font-inter transition-all duration-300 focus:scale-[1.02]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
                    <label htmlFor="email" className="font-inter text-sm font-medium mb-2 block">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="font-inter transition-all duration-300 focus:scale-[1.02]"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}>
                    <label htmlFor="phone" className="font-inter text-sm font-medium mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="font-inter transition-all duration-300 focus:scale-[1.02]"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}>
                    <label htmlFor="message" className="font-inter text-sm font-medium mb-2 block">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="font-inter min-h-[150px] transition-all duration-300 focus:scale-[1.02]"
                      placeholder="Tell us about your dream wedding..."
                    />
                  </div>

                  <div className="animate-scale-in" style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}>
                    <Button type="submit" variant="hero" size="lg" className="w-full hover:scale-105 transition-transform duration-300">
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in-right" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
              <div>
                <h2 className="font-playfair text-3xl font-bold mb-6 animate-fade-in-up">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex gap-4 animate-fade-in-right group cursor-pointer hover:-translate-y-1 transition-transform duration-300" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
                    <div className="w-12 h-12 rounded-lg bg-gradient-romantic flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="text-rose group-hover:animate-pulse-slow" size={20} />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold mb-1 group-hover:text-rose transition-colors duration-300">Email</h3>
                      <p className="font-inter text-sm text-muted-foreground">
                        rakesh@rkievents.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 animate-fade-in-right group cursor-pointer hover:-translate-y-1 transition-transform duration-300" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
                    <div className="w-12 h-12 rounded-lg bg-gradient-romantic flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="text-rose group-hover:animate-pulse-slow" size={20} />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold mb-1 group-hover:text-rose transition-colors duration-300">Phone</h3>
                      <p className="font-inter text-sm text-muted-foreground">
                        8042756462
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 animate-fade-in-right group cursor-pointer hover:-translate-y-1 transition-transform duration-300" style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}>
                    <div className="w-12 h-12 rounded-lg bg-gradient-romantic flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="text-rose group-hover:animate-pulse-slow" size={20} />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold mb-1 group-hover:text-rose transition-colors duration-300">Office</h3>
                      <p className="font-inter text-sm text-muted-foreground">
                        CWS ONE 1st Floor , Beside KIMS Hospital, Kondapur, Hyderabad
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border-border bg-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}>
                <CardContent className="p-8">
                  <h3 className="font-playfair text-2xl font-bold mb-4">Follow Us</h3>
                  <p className="font-inter text-sm text-muted-foreground mb-6">
                    Stay connected for wedding inspiration and updates
                  </p>
                  <div className="flex gap-4 justify-center">
                    <a
                      href="https://www.linkedin.com/shareArticle?url=https://www.rkievents.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-gradient-romantic flex items-center justify-center text-rose hover:shadow-soft transition-all duration-300 hover:scale-110 hover:-rotate-6"
                      aria-label="Instagram"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="https://www.facebook.com/sharer/sharer.php?u=https://www.rkievents.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-gradient-romantic flex items-center justify-center text-rose hover:shadow-soft transition-all duration-300 hover:scale-110 hover:rotate-6"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="https://www.facebook.com/sharer/sharer.php?u=https://www.rkievents.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-gradient-romantic flex items-center justify-center text-rose hover:shadow-soft transition-all duration-300 hover:scale-110 hover:rotate-6"
                      aria-label="Facebook"
                    >
                      <Twitter size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider flip />
      {/* Map Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl flex flex-col items-center">
          <h2 className="font-playfair text-3xl font-bold mb-6 animate-fade-in-up">Our Location</h2>
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-elegant animate-fade-in-up">
            <iframe
              title="RKI Events Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-118.4108%2C34.0736%2C-118.4008%2C34.0836&amp;layer=mapnik"
              className="w-full h-full border-0"
              aria-label="Map showing RKI Events office location"
            />
            <div className="absolute animate-bounce w-8 h-8 bg-rose rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg" />
          </div>
          <p className="font-inter text-sm text-muted-foreground mt-4">123 Wedding Lane, Beverly Hills, CA 90210</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
