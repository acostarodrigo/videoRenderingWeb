import { light, dark } from "./paletteMain";

const palette = (themeMode = "light") => {
  return themeMode === "dark" ? dark : light;
};

export default palette;
