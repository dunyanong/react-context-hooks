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
    const [themeContext, setThemeContext] = useState({
        isLightTheme: true,
        light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
        dark: { syntax: '#ddd', ui: '#333', bg: '#555'}
    });
    
    return (
        <ThemeContext.Provider value={{ themeContext, setThemeContext }}>
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

Beware!
ThemeContext is the object that holds the theme data
ThemeContextProvider is the component that provides that data to the rest of the application.

-------------------------------------------------------------------------------------------------------------------------
React Context & Hooks Tutorial #4 - Accessing Context (part 1)
-------------------------------------------------------------------------------------------------------------------------
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
    const { themeContext, setThemeContext } = useContext(ThemeContext);    
    console.log(theme);
    return (                
        <nav>
            <h1>Context App</h1>            
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
    );
}

The useContext hook takes in the context object that you imported from the ThemeContext file.
It returns an object containing the current context value, in this case, theme and setTheme.
You can then use this value to update the layout/styling of the component or log it to the console.

-------------------------------------------------------------------------------------------------------------------------
React Context & Hooks Tutorial #4 - Accessing Context (part 2)
-------------------------------------------------------------------------------------------------------------------------
const Navbar = () => {
    <ThemeContext.Consumer>
        {({ themeContext, setThemeContext }) => {
            const { isLightTheme, light, dark } = theme;
            const themeObject = isLightTheme ? light : dark;
            
            return (                
                <nav style={{backgroundColor: themeObject.ui, color: themeObject.syntax }}>
                    <h1>Context App</h1>            
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
      );
        }}
    </ThemeContext.Consumer>
}

This replaces the useContext hooks! 
With this trick, you need the use another return() for the 2nd, 3rd so on.

This is because each component that needs to access the context needs to be wrapped with the ThemeContext.Consumer component, which returns the JSX for that component.

-------------------------------------------------------------------------------------------------------------------------
React Context & Hooks Tutorial #6 - Updating Context Data
-------------------------------------------------------------------------------------------------------------------------
To change the data of state, like this one:
const [themeContext, setThemeContext] = useState({
    isLightTheme: true,
    light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
    dark: { syntax: '#ddd', ui: '#333', bg: '#555'}
});

const toggleTheme = () => {
    setThemeContext(prevState => ({
        ...prevState,
        isLightTheme: !prevState.isLightTheme
    }));
}
-------------------------------------------------------------------------------------------------------------------------
React Context & Hooks Tutorial #7 - Creating Multiple Contexts
-------------------------------------------------------------------------------------------------------------------------
Similar tricks, create another file in the contexts directory:

//
import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAutheticated] = useState({
        isAuthenticated: false
    });
    const toggleAuth = () => {
        setIsAutheticated( prevState => ({
            ...prevState,
            isAuthenticated: !prevState.isAuthenticated
        }));
    }
    return (
        <div>
        <AuthContext.Provider value={{ isAuthenticated, setIsAutheticated, toggleAuth }}>
            {children}
        </AuthContext.Provider>
        </div>
    );
}
 
export default AuthContextProvider;
//

Next, remember to update the app.js:
<ThemeContextProvider>
    <AuthContextProvider>
        <Navbar />
        <BookList />
        <ThemeToggle/>
    </AuthContextProvider> 
</ThemeContextProvider> 



-------------------------------------------------------------------------------------------------------------------------
React Context & Hooks Tutorial #8 - Consuming Multiple Contexts
-------------------------------------------------------------------------------------------------------------------------
<AuthContext.Consumer>
{(authContext) => (
<ThemeContext.Consumer>
    {({ themeContext }) => {
    const { isAuthenticated, toggleAuth } = authContext;
    const { isLightTheme, light, dark } = themeContext;
    const themeObject = isLightTheme ? light : dark;        
    return (                
        <nav style={{backgroundColor: themeObject.ui, color: themeObject.syntax }}>
            <h1>Context App</h1>    
            <div onClick={toggleAuth}>
            { isAuthenticated ? 'Logged in' : 'Logged out'}  
            </div>        
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
    );
    }}
</ThemeContext.Consumer>
)}
</AuthContext.Consumer>

-------------------------------------------------------------------------------------------------------------------------
React Context & Hooks Tutorial #9 - Intro to Hooks
-------------------------------------------------------------------------------------------------------------------------































*/