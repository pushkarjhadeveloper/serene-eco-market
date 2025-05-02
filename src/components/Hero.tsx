
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-eco-cream overflow-hidden">
      <div className="eco-container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-eco-moss leading-tight">
              Sustainable Design for
              <span className="block text-eco-sage"> Living in Harmony</span>
            </h1>
            <p className="mt-6 text-xl text-eco-bark max-w-lg">
              Transform your space with eco-friendly furnishings that combine beauty, comfort, and environmental responsibility.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="eco-button text-base px-8 py-6" asChild>
                <Link to="/themes">Shop Collection</Link>
              </Button>
              <Button variant="outline" className="border-eco-sage text-eco-moss hover:bg-eco-sage/10 text-base px-8 py-6" asChild>
                <Link to="/design-services">Design Services</Link>
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
                  alt="Customer" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces" 
                  alt="Customer" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces" 
                  alt="Customer" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>
              <div className="text-sm">
                <div className="font-medium">Trusted by 2,000+ customers</div>
                <div className="text-eco-bark">⭐⭐⭐⭐⭐ <span className="text-eco-bark">(4.9/5)</span></div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img 
                src="/lovable-uploads/ea69fbf3-3d61-4007-a901-a08a6c1fbe17.png" 
                alt="Modern eco-friendly living room with ceiling mural" 
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-eco-moss/30 to-transparent"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-eco-sage/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eco-sage">
                    <path d="M2 22c1.25-1.25 2.5-2.5 3.5-2.5 1.34 0 1.5.5 3 .5s1.66-.5 3-.5c1.34 0 1.5.5 3 .5s1.66-.5 3-.5c1 0 2.25 1.25 3.5 2.5"></path>
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15"></path>
                    <path d="M6 15h12"></path>
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-eco-moss">Immersive Design Solutions</p>
                  <p className="text-sm text-eco-bark">Transform any space with our sustainable design options</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-eco-sage/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-96 h-96 bg-eco-sand/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Hero;
