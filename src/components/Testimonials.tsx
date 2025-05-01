
const Testimonials = () => {
  const testimonials = [
    {
      content: "The quality of SereneEco's furniture is exceptional. I love that I can have beautiful pieces in my home while knowing they're made sustainably. The bamboo lounge chair is now my favorite spot to read.",
      author: "Emma J.",
      role: "Interior Designer",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces"
    },
    {
      content: "Working with the SereneEco team to design my eco-friendly kitchen was a wonderful experience. They suggested materials I hadn't considered and created a space that's both functional and aligned with my values.",
      author: "Marcus T.",
      role: "Homeowner",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces"
    },
    {
      content: "I've purchased several lighting fixtures from SereneEco, and I'm consistently impressed by their craftsmanship. The recycled glass pendants in my dining room always receive compliments from guests.",
      author: "Sarah L.",
      role: "Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces"
    }
  ];

  return (
    <section className="bg-eco-cream py-16">
      <div className="eco-container">
        <h2 className="section-title text-center">What Our Clients Say</h2>
        <p className="text-eco-bark text-center max-w-2xl mx-auto mb-12">
          Discover why eco-conscious homeowners and design professionals choose SereneEco for their sustainable interior needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-eco-sand/30 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 text-eco-sage mb-4">
                {Array(5).fill(null).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <blockquote className="mb-6 text-eco-bark">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-eco-moss">{testimonial.author}</p>
                  <p className="text-sm text-eco-bark">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
