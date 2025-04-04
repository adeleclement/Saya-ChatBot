
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

// Get the publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if running in development mode and provide a fallback for local development
const isLocalDev = import.meta.env.DEV && (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === "pk_test_DEMO_KEY");

// Create a component to show when no valid key is provided
const NoClerkKeyMessage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-lumi-purple/5 p-4 text-center">
    <div className="max-w-md bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-lumi-purple mb-4">Missing Clerk API Key</h1>
      <p className="mb-6 text-gray-600">
        To use authentication features, you need to provide a Clerk publishable key.
      </p>
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
        <p className="text-amber-800 text-sm">
          Get your key by signing up at <a href="https://clerk.com" className="underline" target="_blank" rel="noopener noreferrer">clerk.com</a> and 
          create a new application.
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-sm font-medium mb-2">Once you have your key:</p>
        <ol className="text-sm text-gray-700 list-decimal pl-5 space-y-2">
          <li>Create a <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code> file in your project root</li>
          <li>Add <code className="bg-gray-100 px-1 py-0.5 rounded">VITE_CLERK_PUBLISHABLE_KEY=your_key_here</code></li>
          <li>Restart your development server</li>
        </ol>
      </div>
    </div>
  </div>
);

// Conditionally render the app based on whether a valid key is available
if (isLocalDev) {
  createRoot(document.getElementById("root")!).render(<NoClerkKeyMessage />);
} else {
  createRoot(document.getElementById("root")!).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY!}>
      <App />
    </ClerkProvider>
  );
}
