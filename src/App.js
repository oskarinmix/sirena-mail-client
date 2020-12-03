import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Routes from "./routes/Routes";
import useAuth from "./hooks/useAuth";
function App() {
  const [auth, setAuth] = useState(false);
  const { isAuth } = useAuth();
  const readSession = async () => {
    const result = await isAuth();
    if (result.data.auth) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  React.useEffect(() => {
    readSession();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
