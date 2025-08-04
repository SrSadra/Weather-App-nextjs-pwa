import { createTheme } from "@mui/material";

// export const themeSettings = () => {
//   return {
//     typography: {
//       fontFamily: ["Ubuntu", "Noto Sans Arabic", "sans-serif"].join(","),
//       fontSize: 12,
//     },
//     breakpoints: {
//       values: {
//         laptop: 1336,
//         tablet: 640,
//         mobile: 0,
//         desktop: 1550,
//       },
//     },
//   };
// };

// export const theme = createTheme(themeSettings());


export const useMode = () => {
    const theme = createTheme(themeSettings);

  if (theme.components) {
    theme.components.MuiButton = {
      styleOverrides: {
        root: {
          color: "gray",
        },
      },
    };
    theme.components.MuiOutlinedInput = {
      styleOverrides: {
        root: {
          fontSize: "25px",
          [theme.breakpoints.down("sm")]: {
            fontSize: "15px",
          },
        },
      },
    };
  }

  return [theme, colorMode];
};