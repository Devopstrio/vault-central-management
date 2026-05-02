import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import VaultDashboard from './pages/VaultDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-zinc-400 max-w-md mx-auto">The vault engine is currently synchronizing global secrets, policy namespaces, and rotation workflows. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<VaultDashboard />} />
          <Route path="/secrets" element={<Placeholder name="Secret Explorer & Lifecycle Hub" />} />
          <Route path="/policies" element={<Placeholder name="Access Control & Policy Governance" />} />
          <Route path="/rotation" element={<Placeholder name="Automated Secret Rotation Engine" />} />
          <Route path="/identity" element={<Placeholder name="Identity-Based Access Management" />} />
          <Route path="/leases" element={<Placeholder name="Secret Lease & TTL Tracking" />} />
          <Route path="/audit" element={<Placeholder name="Immutable Audit & Usage Logs" />} />
          <Route path="/metrics" element={<Placeholder name="Vault Performance & Security Metrics" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
