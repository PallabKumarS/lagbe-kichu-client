"use client";

import { useState } from "react";
import { toast } from "sonner";

const NeswLetter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual newsletter subscription logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Stay Updated with{" "}
              <span className="text-primary">Lagbe Kichu</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get the latest updates on new listings, exclusive deals, and
              market insights delivered straight to your inbox.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      Subscribing...
                    </div>
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </div>
            </form>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Weekly Market Updates</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Exclusive Deals</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>New Listings First</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Join over{" "}
                <span className="font-semibold text-foreground">10,000+</span>{" "}
                subscribers. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                📧 What You&apos;ll Get
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Latest property listings in your area</li>
                <li>• Market trends and price insights</li>
                <li>• Tips for buyers and sellers</li>
                <li>• Exclusive promotional offers</li>
              </ul>
            </div>

            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">
                🔒 Your Privacy Matters
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We never share your email</li>
                <li>• Unsubscribe with one click</li>
                <li>• GDPR compliant</li>
                <li>• Secure data handling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeswLetter;
