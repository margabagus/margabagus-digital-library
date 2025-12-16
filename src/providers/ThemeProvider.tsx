import * as React from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("darkMode") === "true";
  }
  return false;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(getInitialTheme);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = React.useCallback(() => {
    setIsDarkMode((prev) => {
      const newDarkMode = !prev;
      document.documentElement.classList.toggle("dark", newDarkMode);
      localStorage.setItem("darkMode", newDarkMode.toString());
      return newDarkMode;
    });
  }, []);

  const value = React.useMemo(() => ({ isDarkMode, toggleDarkMode }), [isDarkMode, toggleDarkMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
