import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Hero Section */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-slate-900">Placement Prep</span>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                    >
                        Log In
                    </button>
                </div>
            </header>

            <main className="flex-1">
                <section className="bg-white py-20 lg:py-32 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                            Ace Your Placement
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                            Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                        </p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                        >
                            Get Started
                        </button>
                    </div>
                </section>

                <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Code className="w-6 h-6 text-primary" />}
                            title="Practice Problems"
                            description="Master DSA and coding challenges with our curated problem sets."
                        />
                        <FeatureCard
                            icon={<Video className="w-6 h-6 text-primary" />}
                            title="Mock Interviews"
                            description="Simulate real interview scenarios with AI-driven mock sessions."
                        />
                        <FeatureCard
                            icon={<BarChart className="w-6 h-6 text-primary" />}
                            title="Track Progress"
                            description="Visualize your growth and identify areas for improvement."
                        />
                    </div>
                </section>
            </main>

            <footer className="bg-white border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
                    <p>© 2026 Placement Readiness Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;
