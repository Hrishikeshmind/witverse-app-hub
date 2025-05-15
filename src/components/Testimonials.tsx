
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { User } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "I published my first app in WITVerse and got over 100 downloads in a week!",
    author: "Arjun Patel",
    role: "2nd year CS student"
  },
  {
    quote: "WITVerse Store made it easy for me to share my college event app with everyone!",
    author: "Priya Sharma",
    role: "3rd year IT student"
  },
  {
    quote: "As a professor, I can recommend useful apps to all my students in one place.",
    author: "Dr. Rajesh Verma",
    role: "Faculty, Computer Engineering"
  },
  {
    quote: "My note-sharing app helped many juniors. Thanks to WITVerse for the platform!",
    author: "Nikhil Joshi",
    role: "Final year student"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="py-12 bg-gradient-to-br from-gray-900/40 to-gray-900/70">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">What Our Users Say</h2>
          <p className="text-gray-300">Hear from the WITVerse community</p>
        </motion.div>

        <Carousel 
          opts={{ loop: true }} 
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="sm:basis-full md:basis-1/2 lg:basis-1/2 pl-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4 text-accent-orange text-4xl">"</div>
                        <p className="text-gray-100 mb-6 flex-grow">{testimonial.quote}</p>
                        <div className="flex items-center">
                          <div className="bg-primary-purple/40 p-2 rounded-full mr-3">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{testimonial.author}</p>
                            <p className="text-xs text-gray-300">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="left-0 bg-white/10 text-white border-white/20 hover:bg-white/20" />
            <CarouselNext className="right-0 bg-white/10 text-white border-white/20 hover:bg-white/20" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
