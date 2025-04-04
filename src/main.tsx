
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simple wrapper component to render the app without clerk
const AppWrapper = () => {
  return <App />
}

// Create the root and render the app directly without Clerk
createRoot(document.getElementById("root")!).render(
  <AppWrapper />
);
