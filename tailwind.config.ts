import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "glow-blue": {
          "0%": { textShadow: "0 0 7px rgba(41, 121, 255, 0.7), 0 0 10px rgba(41, 121, 255, 0.5)" },
          "100%": { textShadow: "0 0 10px rgba(41, 121, 255, 1), 0 0 20px rgba(41, 121, 255, 0.8), 0 0 30px rgba(41, 121, 255, 0.6)" }
        },
        "glow-pink": {
          "0%": { textShadow: "0 0 7px rgba(255, 0, 170, 0.7), 0 0 10px rgba(255, 0, 170, 0.5)" },
          "100%": { textShadow: "0 0 10px rgba(255, 0, 170, 1), 0 0 20px rgba(255, 0, 170, 0.8), 0 0 30px rgba(255, 0, 170, 0.6)" }
        },
        "glow-purple": {
          "0%": { textShadow: "0 0 7px rgba(161, 0, 255, 0.7), 0 0 10px rgba(161, 0, 255, 0.5)" },
          "100%": { textShadow: "0 0 10px rgba(161, 0, 255, 1), 0 0 20px rgba(161, 0, 255, 0.8), 0 0 30px rgba(161, 0, 255, 0.6)" }
        },
        "glow-gold": {
          "0%": { textShadow: "0 0 7px rgba(255, 215, 0, 0.7), 0 0 10px rgba(255, 215, 0, 0.5)" },
          "100%": { textShadow: "0 0 10px rgba(255, 215, 0, 1), 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6)" }
        },
        "bounce-up": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" }
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-blue": "glow-blue 1.5s ease-in-out infinite alternate",
        "glow-pink": "glow-pink 1.5s ease-in-out infinite alternate",
        "glow-purple": "glow-purple 1.5s ease-in-out infinite alternate",
        "glow-gold": "glow-gold 1.5s ease-in-out infinite alternate",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-up": "bounce-up 1s ease-in-out",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-in-out",
        "fade-down": "fade-down 0.5s ease-in-out",
        "fade-in": "fade-in 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
