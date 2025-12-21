import './index.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { AppProviders } from "@/providers/app.providers";
import { HomePage } from "@/services/pages/home.page";

const root = document.getElementById("root");

createRoot(root!).render(
  <BrowserRouter>
    <AppProviders>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </AppProviders>
  </BrowserRouter>,
);
