import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';

import ProductDetail from '../pages/ProductDetail';
import AuthPage from '../pages/AuthPage';

function RouterConfig() {
    return (
        <Routes>
            <Route path="/" element={< AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product-detail/:productId" element={<ProductDetail />} />
        </Routes>
    )
}

export default RouterConfig