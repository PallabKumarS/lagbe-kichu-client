"use client";

import { motion } from "framer-motion";
import {
  Package,
  ClipboardCheck,
  CreditCard,
  Shield,
  Search,
  FileCheck,
} from "lucide-react";

const Tips = () => {
  const tips = [
    {
      icon: Package,
      title: "Product Research",
      description:
        "Thoroughly research product specifications, reviews, and comparisons. Consider functionality, quality, and user experiences across different brands.",
    },
    {
      icon: ClipboardCheck,
      title: "Product Verification",
      description:
        "Check product authenticity, warranty details, and return policies. Verify seller credentials and product condition before purchasing.",
    },
    {
      icon: CreditCard,
      title: "Budget Planning",
      description:
        "Compare prices across platforms, look for discounts, and consider total cost including shipping and potential additional expenses.",
    },
    {
      icon: Shield,
      title: "Purchase Protection",
      description:
        "Understand buyer protection policies, payment security, and dispute resolution mechanisms before completing your purchase.",
    },
    {
      icon: Search,
      title: "Detailed Comparison",
      description:
        "Use advanced search filters to compare products across multiple dimensions like price, features, ratings, and seller reputation.",
    },
    {
      icon: FileCheck,
      title: "Documentation",
      description:
        "Keep all purchase receipts, warranty cards, and communication records. Prepare necessary documents for potential returns or exchanges.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
    <section className="py-16 bg-background/50">
      <motion.div
        className="mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Essential Product Shopping Tips
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Make informed decisions with our comprehensive guide to finding your
            perfect product
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <tip.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{tip.title}</h3>
              </div>
              <p className="text-muted-foreground">{tip.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-12 text-center" variants={itemVariants}>
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary/5 text-primary">
            <span className="font-medium">Pro Tip:</span>
            <span className="ml-2">
              Always read multiple reviews and compare products before making a
              purchase.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Tips;
