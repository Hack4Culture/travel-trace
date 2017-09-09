import React from "react";
import { NavigationBar } from "./NavigationBar/NavigationBar.jsx";
import { Home } from "./Home/Home.jsx";
import Footer from "./Footer/Footer.jsx";

const App = () => {
  const styles = {
    padding: '10px 40px'
  };
    return(
      <div style={styles}>
        <NavigationBar />
        <Home />
        <Footer />
      </div>
    );
};

export default App;
