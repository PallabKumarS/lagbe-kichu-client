"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Buyer",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564183/cld-sample.jpg",
      content:
        "Found my perfect product within days! The platform's search features made it incredibly easy to filter and find exactly what I was looking for.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Seller",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564182/samples/woman-on-a-football-field.jpg",
      content:
        "As a seller, I've had great success listing my products here. The process is streamlined and the support team is excellent.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "First-time Shopper",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564179/samples/two-ladies.jpg",
      content:
        "The detailed product descriptions and images saved me so much time. I could explore multiple products from home before making a decision.",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="py-16 bg-background">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why thousands of people trust Lagbe Kichu for their product
            needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              <p className="text-muted-foreground mb-6">
                {testimonial.content}
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-12" variants={itemVariants}>
          <div className="inline-flex items-center justify-center gap-2 text-primary">
            <span className="font-semibold">4.9/5</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-muted-foreground">from 10,000+ reviews</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
