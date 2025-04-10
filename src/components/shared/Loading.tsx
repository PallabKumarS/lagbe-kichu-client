"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingData = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        className="flex flex-col items-center justify-center"
      >
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.5 },
          }}
          className="mt-4 text-lg font-semibold text-muted-foreground"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingData;
