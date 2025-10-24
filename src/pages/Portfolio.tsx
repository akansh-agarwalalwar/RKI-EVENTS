import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const Portfolio = () => {
  const categories = ["All", "Venue", "Decoration", "Photography", "Catering"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const portfolioItems = [
    { id: 1, image: gallery2, category: "Venue", title: "Garden Ceremony" },
    { id: 2, image: gallery1, category: "Decoration", title: "Elegant Table Setting" },
    { id: 3, image: gallery5, category: "Photography", title: "Bridal Bouquet" },
    { id: 4, image: gallery3, category: "Catering", title: "Wedding Cake" },
    { id: 5, image: gallery4, category: "Decoration", title: "Invitation Suite" },
    { id: 6, image: gallery1, category: "Decoration", title: "Reception Decor" },
  ];

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-romantic">
        <div className="container mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our Portfolio
          </h1>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Explore our collection of beautiful weddings and celebrations
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 px-4 bg-background border-b border-border">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "hero" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg shadow-soft hover:shadow-elegant transition-all duration-500 animate-fade-in-up cursor-pointer hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: "forwards" }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title} in lightbox`}
                onClick={() => openLightbox(index)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(index); }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-inter text-xs text-rose mb-2 animate-fade-in-left">{item.category}</p>
                    <h3 className="font-playfair text-xl font-semibold text-white animate-fade-in-right">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Lightbox Dialog */}
          <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <DialogContent className="max-w-3xl p-0 bg-transparent shadow-none flex flex-col items-center">
              <Carousel opts={{ startIndex: lightboxIndex }}>
                <CarouselContent>
                  {filteredItems.map((item, idx) => (
                    <CarouselItem key={item.id} className="flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-[70vh] w-auto rounded-lg shadow-elegant animate-fade-in"
                        style={{ maxWidth: '90vw' }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="mt-4 text-center">
                <h3 className="font-playfair text-2xl font-semibold text-white drop-shadow-lg">{filteredItems[lightboxIndex]?.title}</h3>
                <p className="font-inter text-sm text-rose drop-shadow-lg">{filteredItems[lightboxIndex]?.category}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
