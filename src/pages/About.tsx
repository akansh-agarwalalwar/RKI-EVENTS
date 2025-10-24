import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import { Heart, Award, Users } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SectionDivider } from "@/utils/SectionDivider";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Lead Wedding Planner",
      image: team1,
      bio: "With over 10 years of experience, Sarah brings creativity and meticulous attention to detail to every wedding."
    },
    {
      name: "Michael Chen",
      role: "Event Coordinator",
      image: team2,
      bio: "Michael's expertise in logistics ensures that every wedding runs flawlessly from start to finish."
    }
  ];

  const stats = [
    { icon: Heart, value: "500+", label: "Weddings Planned" },
    { icon: Award, value: "15+", label: "Industry Awards" },
    { icon: Users, value: "1000+", label: "Happy Couples" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-romantic">
        <div className="container mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            About Us
          </h1>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            We're passionate about creating unforgettable wedding experiences that reflect each couple's unique love story
          </p>
        </div>
      </section>
      <SectionDivider />
      {/* Story Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-playfair text-4xl font-bold text-center mb-8">Our Story</h2>
          <div className="space-y-4 font-inter text-muted-foreground">
            <p>
              Rki Events and Wedding Planners is a wedding decoration company based out of Hyderabad 
              It was created by pairing together passion and six years of professional experience in the event industry. 
              Our team believes that events may be forgotten but the moments will last a lifetime.
            </p>
            <p>
              The team of Rki Events and Wedding Planners organizes mesmerizing moments for you by transforming your event 
              venue to a colorful dream with their stunning decor. Whether you are looking for a small party or big event, 
              Rki events are eagerly waiting to give life to your vision.
            </p>
            <p>
              Nothing is small or big for us because we work with the same dedication and passion. Corporate office : CWS ONE 
              Business center plot no 40,41&42, Near KIMS Hospital Kondapur, Hyderabad, Telangana Contact : +91- 8790966225, 
              Email: rakesh@rkievents.com , www.rkievents.in
            </p>
          </div>
        </div>
      </section>
      <SectionDivider flip />
      {/* Stats Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border-border bg-card text-center hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 animate-scale-in group cursor-pointer"
                style={{ animationDelay: `${index * 0.15}s`, opacity: 0, animationFillMode: "forwards" }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-romantic flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-rose group-hover:animate-pulse-slow" size={32} />
                  </div>
                  <p className="font-playfair text-4xl font-bold mb-2 group-hover:text-rose transition-colors duration-300">{stat.value}</p>
                  <p className="font-inter text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider />
      {/* Team Section (Carousel) */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center mb-12 animate-fade-in-up">Meet Our Team</h2>
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {team.map((member, index) => (
                <CarouselItem key={index} className="flex items-center justify-center">
                  <Card className="border-border overflow-hidden bg-card hover:shadow-elegant transition-all duration-500 animate-fade-in-up group" style={{ animationDelay: `${index * 0.2}s`, opacity: 0, animationFillMode: "forwards" }}>
                    <div className="aspect-square overflow-hidden">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-2xl font-semibold mb-2 group-hover:text-rose transition-colors duration-300">{member.name}</h3>
                      <p className="font-inter text-sm text-rose mb-4">{member.role}</p>
                      <p className="font-inter text-sm text-muted-foreground">{member.bio}</p>
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
      <SectionDivider flip />
      {/* Fun Facts/Timeline Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-playfair text-4xl font-bold text-center mb-8 animate-fade-in-up">Our Journey</h2>
          <ul className="space-y-8">
            <li className="flex items-center gap-6 animate-fade-in-left">
              <Heart className="text-rose animate-pulse-slow" size={32} />
              <span className="font-inter text-lg">Founded in 2012 with a passion for love stories</span>
            </li>
            <li className="flex items-center gap-6 animate-fade-in-right">
              <Award className="text-gold animate-bounce" size={32} />
              <span className="font-inter text-lg">Recognized with 15+ industry awards</span>
            </li>
            <li className="flex items-center gap-6 animate-fade-in-left">
              <Users className="text-rose animate-pulse-slow" size={32} />
              <span className="font-inter text-lg">Over 1000 happy couples and counting</span>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
