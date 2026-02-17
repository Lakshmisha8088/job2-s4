import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code, FileCheck, BookOpen, User } from 'lucide-react';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 fixed h-full hidden lg:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <span className="font-bold text-lg text-primary">Placement Prep</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" end />
                    <NavItem to="/dashboard/practice" icon={<Code size={20} />} label="Practice" />
                    <NavItem to="/dashboard/assessments" icon={<FileCheck size={20} />} label="Assessments" />
                    <NavItem to="/dashboard/resources" icon={<BookOpen size={20} />} label="Resources" />
                    <NavItem to="/dashboard/profile" icon={<User size={20} />} label="Profile" />
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900">Guest User</p>
                            <p className="text-xs text-slate-500">Free Plan</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-10 lg:hidden">
                    <span className="font-bold text-lg text-primary">Placement Prep</span>
                    {/* Mobile menu trigger could go here */}
                </header>

                <main className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, label, end }) => {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
            }
        >
            {icon}
            {label}
        </NavLink>
    );
};

export default DashboardLayout;
