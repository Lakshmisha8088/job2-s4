import React from 'react';

export const DashboardHome = () => (
    <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Problems Solved" value="12" />
            <StatCard label="Assessments Taken" value="2" />
            <StatCard label="Streak" value="3 Days" />
        </div>
    </div>
);

export const Practice = () => (
    <div><h1 className="text-2xl font-bold text-slate-900">Practice Problems</h1><p className="mt-2 text-slate-600">Select a topic to start practicing.</p></div>
);

export const Assessments = () => (
    <div><h1 className="text-2xl font-bold text-slate-900">Assessments</h1><p className="mt-2 text-slate-600">No active assessments.</p></div>
);

export const Resources = () => (
    <div><h1 className="text-2xl font-bold text-slate-900">Learning Resources</h1><p className="mt-2 text-slate-600">Curated materials for your prep.</p></div>
);

export const Profile = () => (
    <div><h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1><p className="mt-2 text-slate-600">Manage your account.</p></div>
);

const StatCard = ({ label, value }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
    </div>
);
