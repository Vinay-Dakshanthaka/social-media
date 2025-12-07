import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';

// if (localStorage.getItem("theme") === "light") {
//   document.documentElement.classList.remove("light");
// } else {
//   document.documentElement.classList.add("light");
// }

let savedTheme = localStorage.getItem("theme");

// If user has no saved preference → detect OS theme
if (!savedTheme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  savedTheme = prefersDark ? "dark" : "light";
  localStorage.setItem("theme", savedTheme);
}

// Apply theme
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </AuthProvider>
  </StrictMode>,
)
