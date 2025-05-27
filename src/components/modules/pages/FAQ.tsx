"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category:
    | "general"
    | "buying"
    | "selling"
    | "account"
    | "payment"
    | "shipping";
}

const allFaqData: FAQItem[] = [
  // General Questions
  {
    id: "1",
    category: "general",
    question: "What is Lagbe Kichu?",
    answer:
      "Lagbe Kichu is a comprehensive marketplace platform that connects buyers and sellers. Whether you're looking to purchase products or sell your items, our platform provides a secure, user-friendly environment for all your marketplace needs.",
  },
  {
    id: "2",
    category: "general",
    question: "How do I get started on Lagbe Kichu?",
    answer:
      "Getting started is easy! Simply create an account by clicking the 'Sign Up' button. You can then browse products as a buyer or start listing your items as a seller. Our onboarding process will guide you through setting up your profile.",
  },
  {
    id: "3",
    category: "general",
    question: "Is Lagbe Kichu free to use?",
    answer:
      "Yes, creating an account and browsing products is completely free. For sellers, we charge a small commission only when you successfully sell an item. There are no upfront fees or monthly charges.",
  },

  // Buying Questions
  {
    id: "4",
    category: "buying",
    question: "How do I search for products?",
    answer:
      "You can search for products using our search bar at the top of the page. Use filters to narrow down results by category, price range, location, and more. Our advanced search helps you find exactly what you're looking for.",
  },
  {
    id: "5",
    category: "buying",
    question: "How do I contact a seller?",
    answer:
      "Once you find a product you're interested in, click on the listing to view details. You'll find contact options to message the seller directly through our secure messaging system or view their contact information if provided.",
  },
  {
    id: "6",
    category: "buying",
    question: "What if I'm not satisfied with my purchase?",
    answer:
      "We encourage buyers and sellers to communicate clearly about product conditions and expectations. If issues arise, you can contact our support team who will help mediate and find a fair resolution.",
  },

  // Selling Questions
  {
    id: "7",
    category: "selling",
    question: "How do I list a product for sale?",
    answer:
      "Navigate to your dashboard and click 'Create Listing'. Fill in the product details, upload high-quality photos, set your price, and publish. Make sure to write detailed descriptions to attract more buyers.",
  },
  {
    id: "8",
    category: "selling",
    question: "What fees do sellers pay?",
    answer:
      "Sellers pay a small commission fee only when an item is sold. The exact percentage depends on the product category. There are no listing fees or monthly charges - you only pay when you earn.",
  },
  {
    id: "9",
    category: "selling",
    question: "How do I manage my listings?",
    answer:
      "Use your seller dashboard to view, edit, or delete your listings. You can update prices, modify descriptions, add more photos, or mark items as sold. The dashboard provides analytics on views and inquiries too.",
  },
  // Account Questions
  {
    id: "10",
    category: "account",
    question: "How do I update my profile information?",
    answer:
      "Go to your account settings from the user menu. Here you can update your personal information, contact details, profile picture, and preferences. Keep your information current for better user experience.",
  },
  {
    id: "11",
    category: "account",
    question: "Can I have both buyer and seller accounts?",
    answer:
      "Yes! A single account allows you to both buy and sell on our platform. You can switch between buyer and seller modes easily from your dashboard.",
  },
  {
    id: "12",
    category: "account",
    question: "How do I delete my account?",
    answer:
      "If you wish to delete your account, please contact our support team. We'll help you through the process and ensure all your data is handled according to our privacy policy.",
  },

  // Payment Questions
  {
    id: "13",
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We support various payment methods including credit/debit cards, digital wallets, and bank transfers. All payments are processed securely through our encrypted payment system.",
  },
  {
    id: "14",
    category: "payment",
    question: "When do sellers receive payment?",
    answer:
      "Sellers receive payment after successful transaction completion and any applicable waiting period for buyer protection. Payment processing typically takes 2-5 business days depending on the payment method.",
  },
  {
    id: "15",
    category: "payment",
    question: "Are my payment details secure?",
    answer:
      "Absolutely! We use industry-standard encryption and security measures to protect all payment information. We never store your complete payment details on our servers.",
  },

  // Shipping Questions
  {
    id: "16",
    category: "shipping",
    question: "How does shipping work?",
    answer:
      "Shipping arrangements are typically made between buyers and sellers. Some sellers offer delivery services, while others may require pickup. Check the listing details for specific shipping information.",
  },
  {
    id: "17",
    category: "shipping",
    question: "Can I track my order?",
    answer:
      "If the seller provides tracking information, you can monitor your order status through your dashboard. We encourage sellers to provide tracking details for better buyer experience.",
  },
  {
    id: "18",
    category: "shipping",
    question: "What if my item doesn't arrive?",
    answer:
      "If you haven't received your item within the expected timeframe, first contact the seller. If you can't resolve the issue, contact our support team for assistance with the transaction.",
  },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "general", label: "General", icon: HelpCircle },
    { id: "buying", label: "Buying", icon: Search },
    { id: "selling", label: "Selling", icon: MessageCircle },
    { id: "account", label: "Account", icon: HelpCircle },
    { id: "payment", label: "Payment", icon: HelpCircle },
    { id: "shipping", label: "Shipping", icon: HelpCircle },
  ];

  const filteredFAQs = allFaqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
      transition: { duration: 0.5 },
    },
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="py-16 lg:py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about using Lagbe Kichu. Can&apos;t
            find what you&apos;re looking for? Contact our support team for
            personalized assistance.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredFAQs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                    openItems.includes(faq.id) ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openItems.includes(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No questions found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse different categories.
            </p>
          </motion.div>
        )}
        {/* Contact Support */}
        <motion.div
          className="bg-card border border-border rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Still Need Help?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our support team
            is here to help you with any questions or concerns you may have.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-6 bg-background rounded-xl border border-border hover:shadow-md transition-all">
              <MessageCircle className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Get instant help from our support team
              </p>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Start Chat
              </button>
            </div>

            <div className="flex flex-col items-center p-6 bg-background rounded-xl border border-border hover:shadow-md transition-all">
              <Mail className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">
                Email Support
              </h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Send us an email and we&apos;ll respond within 24 hours
              </p>
              <a
                href="mailto:support@lagbekichu.com"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Send Email
              </a>
            </div>

            <div className="flex flex-col items-center p-6 bg-background rounded-xl border border-border hover:shadow-md transition-all sm:col-span-2 lg:col-span-1">
              <Phone className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">
                Phone Support
              </h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Call us during business hours for immediate assistance
              </p>
              <a
                href="tel:+15551234567"
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00
              PM (EST)
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
