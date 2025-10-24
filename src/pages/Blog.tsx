import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gallery1 from "@/assets/gallery-1.jpg";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { apiClient } from "@/services/api";
import { toast } from "sonner";
import { SectionDivider } from "@/utils/SectionDivider";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiClient.url}/blogs/`);
      const result = await response.json();

      if (response.ok && result.success) {
        setBlogs(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error("Failed to load blogs. Showing sample content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getImageUrl = (imageArray) => {
    if (imageArray && imageArray.length > 0) {
      return `${apiClient.image_url}/${imageArray[0]}`;
    }
    return gallery1; // Fallback image
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="font-inter text-muted-foreground">Loading blogs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-romantic">
        <div className="container mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Wedding Blog
          </h1>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Tips, inspiration, and expert advice for planning your perfect wedding
          </p>
        </div>
      </section>
      <SectionDivider />
      
      {/* Featured Carousel */}
      {/* {blogs.length > 0 && (
        <section className="py-8 px-4 bg-background">
          <div className="container mx-auto">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {blogs.slice(0, 3).map((post, index) => (
                  <CarouselItem key={post._id} className="flex items-center justify-center">
                    <Card className="border-border overflow-hidden bg-card hover:shadow-elegant transition-all duration-500 animate-fade-in-up group cursor-pointer hover:-translate-y-2">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={getImageUrl(post.image)} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-playfair text-xl font-semibold mb-3 group-hover:text-rose transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="font-inter text-sm text-muted-foreground mb-4">
                          {post.description?.substring(0, 100)}...
                        </p>
                        <Button variant="link" className="p-0 h-auto font-inter text-sm group-hover:translate-x-1 transition-transform duration-300" asChild>
                          <Link to={`/blog/${post._id}`}>Read More →</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      )} */}
      
      {/* <SectionDivider flip /> */}
      
      {/* Blog Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="font-playfair text-2xl font-semibold mb-4">No blogs available</h3>
              <p className="font-inter text-muted-foreground">Check back later for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, index) => (
                <Card 
                  key={post._id} 
                  className="border-border overflow-hidden hover:shadow-elegant transition-all duration-500 animate-fade-in-up bg-card group cursor-pointer hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: "forwards" }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={getImageUrl(post.image)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground font-inter">
                      <span className="text-rose font-medium group-hover:animate-pulse-slow">
                        {post.category || 'Blog'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime || '5 min read'}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-3 group-hover:text-rose transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="font-inter text-sm text-muted-foreground mb-4">
                      {post.description?.substring(0, 120)}...
                    </p>
                    <Button variant="link" className="p-0 h-auto font-inter text-sm group-hover:translate-x-1 transition-transform duration-300" asChild>
                      <Link to={`/blog/${post._id}`}>Read More →</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
