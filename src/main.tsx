
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

// For development, we'll use a dummy key to bypass Clerk's authentication
const DUMMY_PUBLISHABLE_KEY = "pk_test_dummy-key-for-development-123456789";

// Create the root and render the app directly without any conditions
createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={DUMMY_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
