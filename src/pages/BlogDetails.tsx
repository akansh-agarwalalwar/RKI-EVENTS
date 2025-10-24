import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Loader2 } from "lucide-react";
import { apiClient } from "@/services/api";
import { toast } from "sonner";
import { SectionDivider } from "@/utils/SectionDivider";
import gallery1 from "@/assets/gallery-1.jpg";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiClient.url}/blogs/${id}`);
      const result = await response.json();

      if (response.ok && result.success) {
        setBlog(result.data);
      } else {
        throw new Error(result.error || 'Blog not found');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error("Failed to load blog post.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch(`${apiClient.url}/blogs/`);
      const result = await response.json();

      if (response.ok && result.success) {
        // Filter out current blog and limit to 3
        const filtered = result.data.filter(b => b._id !== id).slice(0, 3);
        setRelatedBlogs(filtered);
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog();
      fetchRelatedBlogs();
    }
  }, [id]);

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
    return gallery1;
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || 'Check out this blog';
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="font-inter text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="font-playfair text-2xl font-bold mb-4">Blog post not found</h2>
            <p className="font-inter text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">← Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Back Button */}
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-romantic">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4 sm:mb-6 hover:bg-white/20 transition-colors duration-300 animate-fade-in-left text-sm"
            asChild
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-muted-foreground font-inter animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
              <span className="text-rose font-medium">Blog</span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                5 min read
              </span>
            </div>
            
            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in-up px-2" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
              {blog.title}
            </h1>
            
            <p className="font-inter text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up px-4" style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}>
              {blog.description}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Main Content */}
      <section className="py-6 px-4 lg:px-8 bg-background">
        <div className=" max-w-full">
          {/* Hero Image */}
          <div className="mb-8 sm:mb-12 animate-fade-in-up rounded-lg overflow-hidden shadow-elegant" style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}>
            <img
              src={getImageUrl(blog.image)}
              alt={blog.title}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none animate-fade-in-up" style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}>
                <div className="font-inter text-foreground leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                  {blog.content}
                </div>
              </div>

              {/* Detailed Images Gallery */}
              {blog.detailed_page_image && blog.detailed_page_image.length > 0 && (
                <div className="mt-8 sm:mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}>
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {blog.detailed_page_image.map((image, index) => (
                      <div 
                        key={index} 
                        className="rounded-lg overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 animate-fade-in-up group"
                        style={{ animationDelay: `${0.7 + index * 0.1}s`, opacity: 0, animationFillMode: "forwards" }}
                      >
                        <img
                          src={`${apiClient.image_url}/${image}`}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-secondary rounded-lg animate-fade-in-up" style={{ animationDelay: "0.8s", opacity: 0, animationFillMode: "forwards" }}>
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between">
                  <h3 className="font-playfair text-lg sm:text-xl font-semibold mb-4 sm:mb-0">Share this article</h3>
                  <div className="flex gap-2 sm:gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('facebook')}
                      className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Facebook size={16} className="sm:hidden" />
                      <Facebook size={18} className="hidden sm:block" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('twitter')}
                      className="hover:bg-sky-50 hover:border-sky-300 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Twitter size={16} className="sm:hidden" />
                      <Twitter size={18} className="hidden sm:block" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('linkedin')}
                      className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Linkedin size={16} className="sm:hidden" />
                      <Linkedin size={18} className="hidden sm:block" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('copy')}
                      className="hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Share2 size={16} className="sm:hidden" />
                      <Share2 size={18} className="hidden sm:block" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4 order-first lg:order-last">
              <div className="lg:sticky lg:top-32">
                {/* Related Posts */}
                {relatedBlogs.length > 0 && (
                  <Card className="animate-fade-in-right border-border bg-card hover:shadow-elegant transition-all duration-500" style={{ animationDelay: "0.9s", opacity: 0, animationFillMode: "forwards" }}>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="font-playfair text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Related Posts</h3>
                      <div className="space-y-4 sm:space-y-6">
                        {relatedBlogs.map((relatedBlog, index) => (
                          <Link 
                            key={relatedBlog._id} 
                            to={`/blog/${relatedBlog._id}`}
                            className="block group animate-fade-in-right"
                            style={{ animationDelay: `${1.0 + index * 0.1}s`, opacity: 0, animationFillMode: "forwards" }}
                          >
                            <div className="flex gap-3 hover:bg-secondary/50 p-2 rounded-lg transition-all duration-300">
                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={getImageUrl(relatedBlog.image)}
                                  alt={relatedBlog.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-inter font-medium text-xs sm:text-sm mb-1 line-clamp-2 group-hover:text-rose transition-colors duration-300">
                                  {relatedBlog.title}
                                </h4>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Calendar size={10} />
                                  {formatDate(relatedBlog.createdAt)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider flip />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 animate-fade-in-up px-4">
            Ready to Plan Your Dream Wedding?
          </h2>
          <p className="font-inter text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 animate-fade-in-up px-4" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
            Let our experienced team help you create the perfect wedding day you've always imagined.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up px-4" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
            <Button variant="hero" size="lg" asChild className="hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetails;
