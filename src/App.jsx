import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import { CategoryProvider } from './Context/CategoryContext';
import ArticlePage from './Pages/ArticlePage';

function App() {
    return (
        // Provider component to wrap around the parts of the app that need access to the context
        <CategoryProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/article/:id" element={<ArticlePage />} />
                </Routes>
            </BrowserRouter>
        </CategoryProvider>
    );
}

export default App;
