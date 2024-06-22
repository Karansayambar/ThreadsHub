import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import { CategoryProvider } from './Context/CategoryContext';
import ArticlePage from './Pages/ArticlePage';

function App() {
    return (
        // CategoryProvider is added at top of the code it accessible for all below components
        <CategoryProvider> 
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* <Route path="/article" element={<ArticlePage />} /> */}
                </Routes>
            </BrowserRouter>
        </CategoryProvider>
    );
}

export default App;
