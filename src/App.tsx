import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPageComponent from './pages/landing-page/landing-page';
import { Container } from 'react-bootstrap';
import EditPerson from './pages/edit-person/edit-person';
import ViewPerson from './pages/view-person/view-person';
import SearchQueryProvider from './contexts/search-query.provider';

function App() {
    return (
        <Container>
            <h1>Telus Agriculture Coding Challenge</h1>
            <Routes>
                <Route path="/people" element={
                    <SearchQueryProvider>
                        <LandingPageComponent />
                    </SearchQueryProvider>
                } />
                <Route path="/people/:id" element={
                    <SearchQueryProvider>
                        <ViewPerson />
                    </SearchQueryProvider>
                } />
                <Route path="/people/:id/edit" element={
                    <SearchQueryProvider>
                        <EditPerson />
                    </SearchQueryProvider>
                } />
                <Route
                    path="*"
                    element={<Navigate to="/people" replace />}
                />
            </Routes>
        </Container>
    );
}

export default App;
