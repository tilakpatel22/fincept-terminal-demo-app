import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { SignUpScreen } from "./components/SignUpScreen";
import { HelpScreen } from "./components/HelpScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "signup" | "help">("login");

  const handleNavigateToHelp = () => {
    setCurrentScreen("help");
  };

  const handleBackFromHelp = () => {
    setCurrentScreen("login"); // or you could track the previous screen
  };

  return (
    <>
      {currentScreen === "login" && (
        <LoginScreen 
          onSwitchToSignUp={() => setCurrentScreen("signup")}
          onNavigateToHelp={handleNavigateToHelp}
        />
      )}
      
      {currentScreen === "signup" && (
        <SignUpScreen 
          onSwitchToSignIn={() => setCurrentScreen("login")}
          onNavigateToHelp={handleNavigateToHelp} // Add this if SignUpScreen also needs help navigation
        />
      )}
      
      {currentScreen === "help" && (
        <HelpScreen 
          onBack={handleBackFromHelp}
        />
      )}
    </>
  );
}

export default App