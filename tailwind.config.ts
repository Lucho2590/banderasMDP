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
        display: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        // Brand colors - Sistema de diseño BanderasMDP (Paleta Bandera Argentina 🇦🇷)
        brand: {
          bg: {
            primary: "#FFFFFF",
            secondary: "#ecf4f9", // sky-reflection-50
            tertiary: "#d8e9f3", // sky-reflection-100
          },
          text: {
            primary: "#243742", // charcoal-blue-800
            secondary: "#5988a6", // charcoal-blue-500
            tertiary: "#7aa0b8", // charcoal-blue-400
          },
          border: {
            DEFAULT: "#b2d4e6", // sky-reflection-200
            light: "#d8e9f3", // sky-reflection-100
            dark: "#8bbeda", // sky-reflection-300
          },
        },
        // Celeste Argentino - Reflejo del Cielo (Color Principal)
        "sky-reflection": {
          50: "#ecf4f9",
          100: "#d8e9f3",
          200: "#b2d4e6",
          300: "#8bbeda",
          400: "#65a9cd",
          500: "#3e93c1", // Color principal celeste argentino
          600: "#32769a",
          700: "#255874",
          800: "#193b4d",
          900: "#0c1d27",
          950: "#09151b",
          DEFAULT: "#3e93c1",
          hover: "#32769a",
        },
        // Azul Báltico - Para contraste y elementos importantes
        "baltic-blue": {
          50: "#ecf2f9",
          100: "#d9e6f2",
          200: "#b3cce6",
          300: "#8cb2d9",
          400: "#6699cc",
          500: "#407fbf",
          600: "#336699",
          700: "#264c73",
          800: "#19334d",
          900: "#0d1926",
          950: "#09121b",
          DEFAULT: "#336699",
          hover: "#264c73",
        },
        // Carbón Azulado - Para textos y neutrales
        "charcoal-blue": {
          50: "#eef3f6",
          100: "#dee7ed",
          200: "#bdd0db",
          300: "#9cb8c9",
          400: "#7aa0b8",
          500: "#5988a6",
          600: "#476d85",
          700: "#365263",
          800: "#243742",
          900: "#121b21",
          950: "#0c1317",
          DEFAULT: "#243742",
        },
        // Sol Argentino - Acento dorado para CTAs
        sol: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24", // Dorado sol argentino
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          DEFAULT: "#FBBF24",
          hover: "#F59E0B",
        },
        // Alias para compatibilidad
        accent: {
          50: "#ecf4f9",
          100: "#d8e9f3",
          200: "#b2d4e6",
          300: "#8bbeda",
          400: "#65a9cd",
          500: "#3e93c1",
          600: "#32769a",
          700: "#255874",
          800: "#193b4d",
          900: "#0c1d27",
          DEFAULT: "#3e93c1",
          hover: "#32769a",
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

