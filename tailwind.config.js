/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        iblack: "Inter-Black",
        ibold: "Inter-Bold",
        iextrabold: "Inter-ExtraBold",
        iextralight: "Inter-ExtraLight",
        ilight: "Inter-Light",
        imedium: "Inter-Medium",
        iregular: "Inter-Regular",
        isemibold: "Inter-SemiBold",
        ithin: "Inter-Thin",
      },
    },
  },
  plugins: [],
}

