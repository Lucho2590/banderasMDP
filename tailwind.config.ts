import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        // Brand colors - Sistema de diseño BanderasMDP (Mejorado)
        brand: {
          bg: {
            primary: "#FFFFFF",
            secondary: "#F9FAFB",
            tertiary: "#F3F4F6",
          },
          text: {
            primary: "#111827",
            secondary: "#6B7280",
            tertiary: "#9CA3AF",
          },
          accent: {
            50: "#E6F2FF",
            100: "#CCE5FF",
            200: "#99CCFF",
            300: "#66B3FF",
            400: "#3399FF",
            500: "#0066CC", // Color principal
            600: "#0052A3",
            700: "#003D7A",
            800: "#002952",
            900: "#001429",
            DEFAULT: "#0066CC",
            hover: "#0052A3",
          },
          border: {
            DEFAULT: "#E5E7EB",
            light: "#F3F4F6",
            dark: "#D1D5DB",
          },
          // Acentos complementarios para CTAs y promociones
          orange: {
            DEFAULT: "#FF6B35",
            hover: "#E55A2B",
          },
          yellow: {
            DEFAULT: "#FFB800",
            hover: "#E6A600",
          },
        },
        // shadCN UI colors - Sincronizados con brand
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        card: {
          DEFAULT: "var(--bg-primary)",
          foreground: "var(--text-primary)",
        },
        popover: {
          DEFAULT: "var(--bg-primary)",
          foreground: "var(--text-primary)",
        },
        primary: {
          DEFAULT: "var(--accent-primary)",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "var(--bg-secondary)",
          foreground: "var(--text-primary)",
        },
        muted: {
          DEFAULT: "var(--bg-secondary)",
          foreground: "var(--text-secondary)",
        },
        accent: {
          DEFAULT: "var(--accent-primary)",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        border: "var(--border-color)",
        input: "var(--border-color)",
        ring: "var(--accent-primary)",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'glow': '0 0 20px rgb(0 102 204 / 0.3)',
        'glow-lg': '0 0 30px rgb(0 102 204 / 0.4)',
        'none': 'none',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'bounce-subtle': 'bounce-subtle 2s infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

