"use client";

import { motion } from "framer-motion";
import {
  HomeIcon,
  ClipboardCheck,
  PiggyBank,
  Shield,
  Map,
  FileSearch,
} from "lucide-react";

const Tips = () => {
  const tips = [
    {
      icon: HomeIcon,
      title: "Location Research",
      description:
        "Research neighborhood safety, amenities, and commute times. Consider proximity to schools, shopping, and public transport.",
    },
    {
      icon: ClipboardCheck,
      title: "Property Inspection",
      description:
        "Check for structural issues, proper ventilation, and adequate lighting. Document existing damage during walk-throughs.",
    },
    {
      icon: PiggyBank,
      title: "Budget Planning",
      description:
        "Calculate all costs including rent, utilities, maintenance, and security deposits. Plan for unexpected expenses.",
    },
    {
      icon: Shield,
      title: "Lease Understanding",
      description:
        "Read the lease agreement carefully. Understand terms about maintenance, pets, modifications, and renewal options.",
    },
    {
      icon: Map,
      title: "Area Development",
      description:
        "Research future development plans in the area. This can affect property value and living quality.",
    },
    {
      icon: FileSearch,
      title: "Documentation",
      description:
        "Prepare necessary documents like ID, proof of income, and references. Keep copies of all signed agreements.",
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
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Essential House Hunting Tips
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Make informed decisions with our comprehensive guide to finding your
            perfect home
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
              Always visit properties at different times of day to get a
              complete picture.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Tips;
