
const Sustainability = () => {
  const commitments = [
    {
      title: "Sustainable Materials",
      description: "We source renewable materials like bamboo, reclaimed wood, and recycled metals that minimize environmental impact.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 21S2 16 2 12s5-9 5-9c5 5 8 8 8 14a6 6 0 1 1-8-7c0 4 2 6 2 6"></path>
        </svg>
      )
    },
    {
      title: "Ethical Production",
      description: "All products are crafted by artisans who are paid fair wages and work in safe, healthy environments.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h.01"></path>
          <path d="M7 20v-4"></path>
          <path d="M12 20v-8"></path>
          <path d="M17 20V8"></path>
          <path d="M22 4v16"></path>
        </svg>
      )
    },
    {
      title: "Carbon Neutral",
      description: "We offset 100% of our carbon emissions through verified reforestation and renewable energy projects.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.364 5.636a9 9 0 0 1 0 12.728"></path>
          <path d="M13.5 10.5a3 3 0 0 1 0 3"></path>
          <circle cx="8.5" cy="8.5" r="1"></circle>
          <path d="M7 15h.01"></path>
        </svg>
      )
    },
    {
      title: "Zero Waste Design",
      description: "Our production processes are designed to minimize waste, with all byproducts being recycled or repurposed.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.2 7.9l-.8 4.8c0 1.4 1.1 2.5 2.5 2.5h5.2c1.4 0 2.5-1.1 2.5-2.5l-.7-4.7"></path>
          <path d="M17 6h-.9L14 3H9.9L8 6H7a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2Z"></path>
          <path d="m9 10 1 6"></path>
          <path d="m15 10-1 6"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="eco-container py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="section-title text-center">Our Sustainability Commitment</h2>
        <p className="text-eco-bark">
          We believe beautiful design and environmental responsibility go hand in hand. Every product in our collection is created with careful consideration for its impact on our planet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {commitments.map((commitment, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-eco-sand/30 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-eco-sage/10 rounded-full flex items-center justify-center text-eco-sage mb-4">
              {commitment.icon}
            </div>
            <h3 className="font-serif text-lg font-medium text-eco-moss mb-2">{commitment.title}</h3>
            <p className="text-eco-bark text-sm">{commitment.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-eco-cream rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 lg:p-12">
            <h3 className="font-serif text-2xl md:text-3xl font-medium text-eco-moss mb-4">
              Our Design Philosophy
            </h3>
            <p className="text-eco-bark mb-6">
              At SereneEco, we believe that sustainable living doesn't mean compromising on style or comfort. Our design approach combines traditional craftsmanship with modern aesthetics, creating pieces that are timeless, durable, and kind to our planet.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-eco-sage flex items-center justify-center text-white text-xs">✓</div>
                <p className="text-eco-bark"><strong className="text-eco-moss">Biophilic Design</strong> - Creating spaces that connect people with nature</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-eco-sage flex items-center justify-center text-white text-xs">✓</div>
                <p className="text-eco-bark"><strong className="text-eco-moss">Circular Economy</strong> - Products designed for longevity and recycling</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-eco-sage flex items-center justify-center text-white text-xs">✓</div>
                <p className="text-eco-bark"><strong className="text-eco-moss">Non-toxic Materials</strong> - Safe for your family and the environment</p>
              </div>
            </div>
          </div>
          <div className="relative h-64 lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1280&auto=format&fit=crop" 
              alt="Sustainable design workshop" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
