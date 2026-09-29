/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: "#263F32",
          dark: "#1B2D24",
          light: "#335242",
          muted: "#2C4638",
        },
        walnut: {
          DEFAULT: "#5A402B",
          dark: "#443020",
          light: "#72533B",
        },
        cream: {
          DEFAULT: "#F4EBDD",
          light: "#FAF5ED",
          dark: "#E8DCB8",
        },
        terracotta: {
          DEFAULT: "#B96F4A",
          dark: "#9C5A39",
          light: "#CC825D",
        },
        espresso: {
          DEFAULT: "#211A15",
          dark: "#15100C",
          light: "#332A24",
        },
        sage: {
          DEFAULT: "#89947B",
          light: "#A4AE98",
          dark: "#6F7963",
        },
        offwhite: {
          DEFAULT: "#FBF8F2",
          warm: "#F7F2E9",
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'slow-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
