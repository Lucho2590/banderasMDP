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
        // Brand colors - Sistema de diseño BanderasMDP (B2B corporativo / industrial premium)
        brand: {
          bg: {
            primary: "#FFFFFF",
            secondary: "#F8FAFC", // slate-50
            tertiary: "#EFF6FF", // blue-50
          },
          text: {
            primary: "#0F172A", // slate-900
            secondary: "#475569", // slate-600
            tertiary: "#64748B", // slate-500
          },
          border: {
            DEFAULT: "#E2E8F0", // slate-200
            light: "#F1F5F9", // slate-100
            dark: "#CBD5E1", // slate-300
          },
        },
        // Azul Corporativo (Color Principal) - mantiene el nombre de token por compatibilidad
        "sky-reflection": {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#1D4ED8", // Azul corporativo principal
          600: "#1E40AF",
          700: "#1E3A8A", // Azul corporativo oscuro
          800: "#172554",
          900: "#131C3E",
          950: "#0B1120",
          DEFAULT: "#1D4ED8",
          hover: "#1E40AF",
        },
        // Azul profundo - Para secciones oscuras y contraste
        "baltic-blue": {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#93C5FD",
          400: "#3B82F6",
          500: "#2563EB",
          600: "#1E3A8A",
          700: "#172554",
          800: "#131C3E",
          900: "#0B1120",
          950: "#070B16",
          DEFAULT: "#1E3A8A",
          hover: "#172554",
        },
        // Slate - Para textos y neutrales fríos modernos
        "charcoal-blue": {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
          DEFAULT: "#0F172A",
        },
        // Acento (ex-dorado) - repointado a azul corporativo; los CTAs usan azul primario
        sol: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#1D4ED8",
          600: "#1E40AF",
          700: "#1E3A8A",
          800: "#172554",
          900: "#131C3E",
          DEFAULT: "#1D4ED8",
          hover: "#1E40AF",
        },
        // Verde de éxito / confirmaciones
        success: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          DEFAULT: "#22C55E",
          hover: "#16A34A",
        },
        // Alias para compatibilidad
        accent: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#1D4ED8",
          600: "#1E40AF",
          700: "#1E3A8A",
          800: "#172554",
          900: "#131C3E",
          DEFAULT: "#1D4ED8",
          hover: "#1E40AF",
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
        'glow': '0 0 20px rgb(29 78 216 / 0.25)',
        'glow-lg': '0 0 30px rgb(29 78 216 / 0.35)',
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

