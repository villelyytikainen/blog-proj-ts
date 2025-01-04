import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";

function App() {
    return (
        <div id='App'>
            <Nav />
            <Blogs />
            <Footer/>
        </div>
    );
}

export default App;
