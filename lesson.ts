/*
-------------------------------------------------------------------------------------------------------------------------
React Context & Hooks Tutorial #2 - What is the Context API?
-------------------------------------------------------------------------------------------------------------------------
What is a context API:
Allow us to share states within a component tree, to replace props hehe.
We create a place where ALL components can use that shared state wihtout using crazy amounts of props.

It is called a context provider

What is a context provider: 
    - it is a react tag that wraps components that need access to the states (data)

-------------------------------------------------------------------------------------------------------------------------
React Context & Hooks Tutorial #3 - Adding a Context & Provider
-------------------------------------------------------------------------------------------------------------------------
import React, { createContext } from "react"

createContext allows us to create functions for us 

For example, 
export const ThemeContext = createContext();

Inside sfc:
const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        isLightTheme: true,
        light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
        dark: { syntax: '#ddd', ui: '#333', bg: '#555'}
    });
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

The states are now global for the components


In app.js/ app.tsx:
remember add <ThemeContextProvider></ThemeContextProvider> 
to wrap the components up to make this work

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Navbar />
        <BookList /> 
      </ThemeContextProvider>
    </div>
  );
}
















*/