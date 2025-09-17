import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { SignUpScreen } from "./components/SignUpScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "signup">("login");

  return (
    <>
      {currentScreen === "login" ? (
        <LoginScreen onSwitchToSignUp={() => setCurrentScreen("signup")} />
      ) : (
        <SignUpScreen onSwitchToSignIn={() => setCurrentScreen("login")} />
      )}
    </>
  );
}

export default App;