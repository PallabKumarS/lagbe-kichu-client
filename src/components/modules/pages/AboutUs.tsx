"use client";

import Container from "@/components/shared/Container";
import { Building2, Home, Users2, Search, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1740927310/photo-1438761681033-6461ffad8d80_hefwjr.jpg",
      bio: "15+ years in real estate tech",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564181/samples/smile.jpg",
      bio: "Expert in property management",
    },
    {
      name: "Emma Davis",
      role: "Lead Developer",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1740927339/photo-1534528741775-53994a69daeb_e7tafu.jpg",
      bio: "Tech innovator & UI specialist",
    },
    {
      name: "James Wilson",
      role: "Marketing Director",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564173/samples/people/kitchen-bar.jpg",
      bio: "Digital marketing strategist",
    },
  ];

  const contactInfo = {
    email: "contact@lagbekichu.com",
    phone: "+1 (555) 123-4567",
    address: "123 Property Lane, Real Estate City, 12345",
    social: {
      facebook: "lagbekichu",
      twitter: "@lagbekichu",
      instagram: "@lagbekichuofficial",
    },
  };

  const features = [
    {
      icon: Home,
      title: "Extensive Property Listings",
      description:
        "Access thousands of verified properties across multiple locations",
    },
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Advanced filters to help you find your perfect product quickly",
    },
    {
      icon: Users2,
      title: "Expert Agents",
      description: "Professional real estate agents to guide your journey",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your housing needs",
    },
    {
      icon: Shield,
      title: "Verified Listings",
      description: "All properties are verified for your peace of mind",
    },
    {
      icon: Building2,
      title: "Property Insights",
      description:
        "Detailed analytics and market trends for informed decisions",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
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
    <Container>
      <motion.div
        className="space-y-16 py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            About Lagbe Kichu
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in finding the perfect products. We combine
            technology and expertise to make product discovery simple and
            enjoyable.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={itemVariants}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              At Lagbe Kichu, we&apos;re committed to revolutionizing the way
              people find their desired products. We believe everyone deserves
              access to the best products, and we&apos;re here to make that
              journey as smooth as possible.
            </p>
          </div>
          <motion.div
            className="bg-primary/5 rounded-2xl p-8 hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
            <ul className="space-y-3">
              {[
                "Trusted by thousands of happy customers",
                "Cutting-edge product search technology",
                "Transparent and hassle-free process",
                "Dedicated customer support team",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  ✓ {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all"
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-primary/5 rounded-2xl p-8"
          variants={itemVariants}
        >
          {[
            ["10000+", "Products Listed"],
            ["5000+", "Happy Customers"],
            ["200+", "Verified Sellers"],
            ["10+", "Years Experience"],
          ].map(([number, label], index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-primary">{number}</div>
              <div className="text-muted-foreground">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Team Section */}
      <motion.section variants={itemVariants} className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-card"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
                <p className="text-muted-foreground text-sm mt-2">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        variants={itemVariants}
        className="bg-primary/5 rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center">Get in Touch</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            className="flex flex-col items-center text-center space-y-3"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-8 h-8 text-primary" />
            <h3 className="font-semibold">Email Us</h3>
            <p className="text-muted-foreground">{contactInfo.email}</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center space-y-3"
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="w-8 h-8 text-primary" />
            <h3 className="font-semibold">Call Us</h3>
            <p className="text-muted-foreground">{contactInfo.phone}</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center space-y-3"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="w-8 h-8 text-primary" />
            <h3 className="font-semibold">Visit Us</h3>
            <p className="text-muted-foreground">{contactInfo.address}</p>
          </motion.div>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          {Object.entries(contactInfo.social).map(([platform, handle]) => (
            <motion.a
              key={platform}
              href={`#${platform}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              {handle}
            </motion.a>
          ))}
        </div>
      </motion.section>
    </Container>
  );
};

export default AboutUs;
