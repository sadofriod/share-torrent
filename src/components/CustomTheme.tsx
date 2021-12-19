import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

//Use MUI default theme
const theme = createTheme({
	components: {
		MuiTabs: {
			styleOverrides: {
				root: {
					// backgroundColor: indigo[500],
				},
			},
		},
	},
	palette: {
		primary: {
			main: "#3f51b5",
		},
		secondary: {
			main: "#f50057",
		},
	},
});

const CustomTheme: React.FC = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomTheme;
