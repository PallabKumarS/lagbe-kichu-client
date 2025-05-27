"use client";
import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-background rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />

      <div className="mx-auto px-4 py-24 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Find Your Perfect
              <span className="text-gradient block mt-2 drop-shadow-lg">
                Product Today!
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Discover thousands of products across multiple categories. Your
            perfect item is just a click away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link
              href="/dashboard/seller/create-listing"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              <Package className="mr-2 h-5 w-5" /> List Your Product
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              { number: "10K+", label: "Active Products" },
              { number: "50K+", label: "Happy Customers" },
              { number: "99%", label: "Customer Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card/50 backdrop-blur shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
