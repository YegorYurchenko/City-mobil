import React from 'react';
import Header from '../header';
import Main from '../main';
import Footer from '../footer';

const App = () => (
    <React.Fragment>
        <Header />
        <main role="main" className="app">
            <Main />
        </main>
        <Footer />
    </React.Fragment>
);

export default App;
