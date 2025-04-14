module.exports = {
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 0.5s ease-in-out",
        jump: "jump 0.5s ease-in-out",
        fade: "fade 0.7s ease-in-out",
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-10deg)" },
          "75%": { transform: "rotate(10deg)" },
        },
        jump: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fade: {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
          "100%": { opacity: "1" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
    },
  },
};
