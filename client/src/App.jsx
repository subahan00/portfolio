// client/src/App.jsx

import React from 'react';
import Hero from './components/Hero/Hero'; 
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
function App() {
  return (
    // This 'main' tag is a good semantic choice
    <main>
      <Hero /> 
       <About />
       
        <Projects />
        <Contact />
    </main>
  );
}

export default App;