import { createTheme } from "@mantine/core";

const theme = createTheme({
  colors: {
    // Use pre 7.3.0 dark colors. See https://github.com/mantinedev/mantine/releases/tag/7.3.0
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
  primaryColor: "cyan",
  primaryShade: { light: 6, dark: 9 },
});

export default theme;
