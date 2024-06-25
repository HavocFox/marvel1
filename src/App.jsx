import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CharacterList from './components/CharacterList';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Define a route for the root path */}
                <Route path="/" element={<Navigate to="/character/1009368" replace />} />
                <Route path="/character/:id" element={<CharacterList />} />
            </Routes>
        </Router>
    );
};

export default App;
