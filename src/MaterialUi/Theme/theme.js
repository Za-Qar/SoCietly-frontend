import { createMuiTheme } from "@material-ui/core/styles";

export default function materialTheme() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#31986a", // greenish color
      },
      secondary: {
        main: "#32a4dd",
      },
    },
  });

  return theme;
}
