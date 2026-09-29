import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1240px",
        "2xl": "1240px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        // Brand colors - Sistema de diseño BanderasMDP
        // Paleta: azul #064B87 / celeste #2D9FEA / celeste claro #EAF5FC / texto #123B61
        brand: {
          bg: {
            primary: "#FFFFFF",
            secondary: "#F5FAFD",
            tertiary: "#EAF5FC", // light_blue de marca
          },
          text: {
            primary: "#123B61",
            secondary: "#54708B",
            tertiary: "#7A93AC",
          },
          border: {
            DEFAULT: "#DBE8F2",
            light: "#EDF2F6",
            dark: "#B9D5E7",
          },
        },
        // Azul de marca (Color Principal) - mantiene el nombre de token por compatibilidad
        "sky-reflection": {
          50: "#EAF5FC",
          100: "#D3EBF8",
          200: "#A9D7F3",
          300: "#6FBEEE",
          400: "#2D9FEA", // celeste de marca
          500: "#1179C4",
          600: "#064B87", // azul de marca (primario)
          700: "#053E6F",
          800: "#043055",
          900: "#032440",
          950: "#021A2E",
          DEFAULT: "#064B87",
          hover: "#053E6F",
        },
        // Azul profundo - Para secciones oscuras y contraste (footer, bloques full-bleed)
        "baltic-blue": {
          50: "#EAF5FC",
          100: "#D3EBF8",
          200: "#A9D7F3",
          300: "#6FBEEE",
          400: "#2D9FEA",
          500: "#0A5C9E",
          600: "#063A69", // azul del footer
          700: "#043055",
          800: "#032440",
          900: "#021A2E",
          950: "#01121F",
          DEFAULT: "#064B87",
          hover: "#043055",
        },
        // Neutrales azulados - Para textos y fondos fríos
        "charcoal-blue": {
          50: "#F5FAFD",
          100: "#EDF2F6",
          200: "#DBE8F2",
          300: "#B9D5E7",
          400: "#8BA3B9",
          500: "#54708B",
          600: "#3E5A74",
          700: "#2A455E",
          800: "#1A3450",
          900: "#0E2D4B",
          950: "#071C31",
          DEFAULT: "#123B61",
        },
        // Acento (ex-dorado) - repointado al azul de marca; los CTAs usan azul primario
        sol: {
          50: "#EAF5FC",
          100: "#D3EBF8",
          200: "#A9D7F3",
          300: "#6FBEEE",
          400: "#2D9FEA",
          500: "#1179C4",
          600: "#064B87",
          700: "#053E6F",
          800: "#043055",
          900: "#032440",
          DEFAULT: "#064B87",
          hover: "#053E6F",
        },
        // Amarillo de marca - SOLO para la marca del logo. No usar como fondo de texto blanco.
        sun: {
          400: "#F7D470",
          500: "#F4C542",
          600: "#DCAE2A",
          DEFAULT: "#F4C542",
        },
        // Verde WhatsApp de marca
        whatsapp: {
          DEFAULT: "#18B866",
          hover: "#149B57",
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
          50: "#EAF5FC",
          100: "#D3EBF8",
          200: "#A9D7F3",
          300: "#6FBEEE",
          400: "#2D9FEA",
          500: "#1179C4",
          600: "#064B87",
          700: "#053E6F",
          800: "#043055",
          900: "#032440",
          DEFAULT: "#064B87",
          hover: "#053E6F",
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
      backgroundImage: {
        // Registrados como utilidades `bg-gradient-*` para poder usarlos desde JSX.
        // Deben quedar sincronizados con los gradientes de app/globals.css.
        "gradient-baltic":
          "linear-gradient(135deg, #064B87 0%, #043055 50%, #021A2E 100%)",
        "gradient-hero-light":
          "linear-gradient(110deg, #EEF8FD 0%, #DCEFFB 48%, #C6E7F8 100%)",
        "gradient-whatsapp-band": "linear-gradient(110deg, #DFF3FF 0%, #C6E7F8 100%)",
        "gradient-card-overlay":
          "linear-gradient(to top, rgba(6,75,135,0.92) 0%, rgba(6,75,135,0) 58%)",
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
        'glow': '0 0 20px rgb(6 75 135 / 0.25)',
        'glow-lg': '0 0 30px rgb(6 75 135 / 0.35)',
        'card-soft': '0 8px 24px rgb(11 55 90 / 0.08)',
        'hero-panel': '0 24px 50px rgb(6 75 135 / 0.14)',
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
