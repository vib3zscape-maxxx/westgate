import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { MarketingLayout } from './components/marketing/MarketingLayout';
import { HomePage } from './pages/marketing/HomePage';
import { BusinessPage } from './pages/marketing/BusinessPage';
import { ResourcesPage } from './pages/marketing/ResourcesPage';
import { AboutPage } from './pages/marketing/AboutPage';
import { ContactPage } from './pages/marketing/ContactPage';
import { LegalPage } from './pages/marketing/LegalPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { TwoFactorPage } from './pages/auth/TwoFactorPage';
import { AppLayout } from './layouts/AppLayout';
import { OverviewPage } from './pages/app/OverviewPage';
import { TransactionsPage } from './pages/app/TransactionsPage';
import { TransfersPage } from './pages/app/TransfersPage';
import { CardsPage } from './pages/app/CardsPage';
import { StatementsPage } from './pages/app/StatementsPage';
import { NotificationsPage } from './pages/app/NotificationsPage';
import { DomesticWirePage } from './pages/app/transfers/DomesticWirePage';
import { InternationalWirePage } from './pages/app/transfers/InternationalWirePage';
import { PayrollPage } from './pages/app/transfers/PayrollPage';
import { SecurityPage } from './pages/app/settings/SecurityPage';
import { ProfilePage } from './pages/app/settings/ProfilePage';
import { PreferencesPage } from './pages/app/settings/PreferencesPage';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminOverviewPage } from './pages/admin/OverviewPage';
import { RequireAuth } from './components/auth/RequireAuth';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element (#root) not found in HTML');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/loans" element={<HomePage />} />
          <Route path="/treasury" element={<ResourcesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal/:page" element={<LegalPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/2fa" element={<TwoFactorPage />} />
        </Route>

        <Route element={<RequireAuth role="company_user"><AppLayout /></RequireAuth>}>
          <Route path="/app/overview" element={<OverviewPage />} />
          <Route path="/app/transactions" element={<TransactionsPage />} />
          <Route path="/app/transfers" element={<TransfersPage />} />
          <Route path="/app/transfers/domestic" element={<DomesticWirePage />} />
          <Route path="/app/transfers/international" element={<InternationalWirePage />} />
          <Route path="/app/transfers/payroll" element={<PayrollPage />} />
          <Route path="/app/cards" element={<CardsPage />} />
          <Route path="/app/statements" element={<StatementsPage />} />
          <Route path="/app/notifications" element={<NotificationsPage />} />
          <Route path="/app/settings/security" element={<SecurityPage />} />
          <Route path="/app/settings/profile" element={<ProfilePage />} />
          <Route path="/app/settings/preferences" element={<PreferencesPage />} />
        </Route>

        <Route element={<RequireAuth role="admin"><AdminLayout /></RequireAuth>}>
          <Route path="/admin/overview" element={<AdminOverviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
