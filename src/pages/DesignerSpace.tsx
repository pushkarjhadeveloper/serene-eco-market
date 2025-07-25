import React from 'react';
import Layout from '@/components/Layout';
import SplitText from '@/components/SplitText';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';

const DesignerSpace = () => {
  return (
    <Layout>
      <div className="eco-container py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="text-eco-bark hover:text-eco-moss">
              <Link to="/" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Icon */}
          <div className="w-24 h-24 bg-eco-sage/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Clock className="h-12 w-12 text-eco-sage" />
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-eco-moss mb-6">
            <SplitText text="Coming Soon" />
          </h1>

          {/* Description */}
          <p className="text-xl text-eco-bark mb-8 max-w-lg mx-auto">
            We're working hard to bring you an amazing Designer Space experience. 
            Stay tuned for sustainable design tools, community features, and collaboration opportunities.
          </p>

          {/* Features Preview */}
          <div className="bg-eco-cream/30 rounded-2xl p-8 mb-8">
            <h3 className="font-serif text-2xl font-medium text-eco-moss mb-4">What's Coming:</h3>
            <ul className="text-eco-bark space-y-2">
              <li>• Sustainable design resource library</li>
              <li>• Designer collaboration tools</li>
              <li>• Portfolio showcase platform</li>
              <li>• Eco-friendly material database</li>
              <li>• Carbon footprint calculator</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <p className="text-eco-bark">Be the first to know when we launch!</p>
            <Button className="eco-button" asChild>
              <Link to="/signup">Get Notified</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DesignerSpace;
