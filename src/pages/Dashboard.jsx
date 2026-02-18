
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Play, FileText, CheckCircle, Search, Clock, ArrowLeft, ChevronRight, BarChart2 } from 'lucide-react';
import { analyzeJD } from '../utils/analysisLogic';
import { saveAnalysisResult, getAnalysisHistory } from '../utils/storage';

// Mock Data for Radar Chart (Keep existing visualization for "Overall" context)
const skillData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'Sys Design', A: 60, fullMark: 100 },
    { subject: 'Comm', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const CircularProgress = ({ value, size = 180, strokeWidth = 12 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg width={size} height={size} className="rotate-[-90deg]">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="#e2e8f0" strokeWidth={strokeWidth} />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="hsl(245, 58%, 51%)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-4xl font-bold text-slate-900">{value}</span>
                <span className="text-xs text-slate-500 block uppercase tracking-wider mt-1">Score</span>
            </div>
        </div>
    );
};

export const DashboardHome = () => {
    const [view, setView] = useState('HOME'); // HOME, ANALYZE, RESULTS, HISTORY
    const [history, setHistory] = useState([]);
    const [currentResult, setCurrentResult] = useState(null);
    const [formData, setFormData] = useState({ jdText: '', company: '', role: '' });

    useEffect(() => {
        setHistory(getAnalysisHistory());
    }, [view]);

    const handleAnalyze = () => {
        if (!formData.jdText.trim()) return;
        const result = analyzeJD(formData.jdText, formData.company, formData.role);
        saveAnalysisResult(result);
        setCurrentResult(result);
        setView('RESULTS');
        setFormData({ jdText: '', company: '', role: '' });
    };

    const handleViewHistoryItem = (item) => {
        setCurrentResult(item);
        setView('RESULTS');
    };

    // --- Views ---

    const renderAnalyzeView = () => (
        <div className="max-w-3xl mx-auto space-y-6">
            <button onClick={() => setView('HOME')} className="flex items-center text-slate-500 hover:text-primary transition-colors mb-4">
                <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
            </button>
            <Card>
                <CardHeader>
                    <CardTitle>Analyze New Job Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                placeholder="e.g. Google"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Role Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                placeholder="e.g. Frontend Engineer"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Job Description <span className="text-red-500">*</span></label>
                        <textarea
                            className="w-full p-3 border border-slate-200 rounded-lg h-48 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                            placeholder="Paste the JD here..."
                            value={formData.jdText}
                            onChange={(e) => setFormData({ ...formData, jdText: e.target.value })}
                        ></textarea>
                        <p className="text-xs text-slate-500 mt-1">Paste at least 500 characters for better analysis.</p>
                    </div>
                    <button
                        className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleAnalyze}
                        disabled={!formData.jdText.trim()}
                    >
                        Analyze & Generate Plan
                    </button>
                </CardContent>
            </Card>
        </div>
    );

    const renderResultsView = () => {
        if (!currentResult) return <div>No result found.</div>;

        return (
            <div className="space-y-6">
                <button onClick={() => setView('HOME')} className="flex items-center text-slate-500 hover:text-primary transition-colors mb-4">
                    <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Score Card */}
                    <Card className="lg:col-span-1 flex flex-col items-center justify-center py-8">
                        <CircularProgress value={currentResult.readinessScore} size={200} />
                        <div className="text-center mt-6">
                            <h3 className="text-xl font-bold text-slate-900">{currentResult.company || "Target Company"}</h3>
                            <p className="text-slate-500">{currentResult.role || "Target Role"}</p>
                        </div>
                    </Card>

                    {/* Detected Skills */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Skills Detected</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {Object.entries(currentResult.extractedSkills).length === 0 ? (
                                <p className="text-slate-500 italic">No specific tech stack detected. Showing general plan.</p>
                            ) : (
                                <div className="space-y-4">
                                    {Object.entries(currentResult.extractedSkills).map(([category, skills]) => (
                                        <div key={category}>
                                            <h4 className="text-sm font-semibold text-slate-700 mb-2">{category}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map(skill => (
                                                    <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-100 uppercase">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 7 Day Plan */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Clock size={20} /> 7-Day Strategy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {currentResult.plan.map((day, i) => (
                                    <div key={i} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-indigo-600 text-sm">{day.day}</span>
                                            <span className="text-xs font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-600">{day.focus}</span>
                                        </div>
                                        <ul className="list-disc list-inside text-sm text-slate-600 pl-1">
                                            {day.items.map((item, idx) => <li key={idx}>{item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Round Checklist */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><CheckCircle size={20} /> Preparation Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                {Object.entries(currentResult.checklist).map(([round, items], i) => (
                                    <div key={i}>
                                        <h4 className="font-semibold text-slate-800 text-sm mb-2">{round}</h4>
                                        <div className="space-y-1.5">
                                            {items.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Interview Questions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileText size={20} /> Likely Interview Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentResult.questions.map((q, i) => (
                                <div key={i} className="p-3 bg-slate-50 rounded border border-slate-100 text-sm text-slate-700 font-medium">
                                    Q{i + 1}: {q}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    const renderHistoryView = () => (
        <div className="space-y-6">
            <button onClick={() => setView('HOME')} className="flex items-center text-slate-500 hover:text-primary transition-colors mb-4">
                <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
            </button>
            <Card>
                <CardHeader>
                    <CardTitle>Analysis History</CardTitle>
                </CardHeader>
                <CardContent>
                    {history.length === 0 ? (
                        <div className="text-center py-10 text-slate-500">No analysis history found. Start a new analysis!</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {history.map(item => (
                                <div key={item.id} className="py-4 flex items-center justify-between hover:bg-slate-50 p-2 rounded transition-colors cursor-pointer" onClick={() => handleViewHistoryItem(item)}>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.company || "Unknown Company"} <span className="text-slate-400 font-normal">| {item.role || "Unknown Role"}</span></h4>
                                        <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${item.readinessScore > 75 ? 'bg-emerald-100 text-emerald-700' :
                                                item.readinessScore > 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {item.readinessScore}% Ready
                                        </div>
                                        <ChevronRight size={16} className="text-slate-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );

    const renderHomeView = () => (
        <div className="space-y-6">
            <div className="mb-0">
                <h1 className="text-2xl font-bold text-slate-900">Welcome back, User!</h1>
                <p className="text-slate-600">Here's your preparation overview for today.</p>
            </div>

            {/* NEW: Call to Action for Analysis */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-xl font-bold mb-2">Targeting a specific Job?</h2>
                    <p className="text-indigo-100 max-w-lg">Paste the Job Description to get a personalized preparation plan, skill gap analysis, and likely interview questions instantly.</p>
                </div>
                <button
                    onClick={() => setView('ANALYZE')}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold shadow-md hover:bg-indigo-50 transition-colors whitespace-nowrap flex items-center gap-2"
                >
                    <Search size={18} /> Analyze JD
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Overall Readiness (Static for now, could be dynamic based on last analysis) */}
                <Card className="flex flex-col items-center justify-center py-8">
                    {history.length > 0 ? (
                        <>
                            <CircularProgress value={history[0].readinessScore} />
                            <p className="mt-4 font-medium text-slate-700">Last Analysis Score</p>
                            <p className="text-xs text-slate-400 mt-1">{history[0].company}</p>
                        </>
                    ) : (
                        <>
                            <CircularProgress value={0} />
                            <p className="mt-4 font-medium text-slate-700">No Analysis Yet</p>
                        </>
                    )}
                </Card>

                {/* 2. Recent History (Mini) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Analyses</CardTitle>
                        {history.length > 0 && (
                            <button onClick={() => setView('HISTORY')} className="text-sm text-primary font-medium hover:underline">View All</button>
                        )}
                    </CardHeader>
                    <CardContent>
                        {history.length === 0 ? (
                            <div className="h-[200px] flex flex-col items-center justify-center text-slate-400">
                                <FileText size={40} className="mb-3 opacity-20" />
                                <p>No history yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {history.slice(0, 3).map((item) => (
                                    <div key={item.id} onClick={() => handleViewHistoryItem(item)} className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer flex justify-between items-center transition-colors">
                                        <div>
                                            <p className="font-semibold text-slate-900 text-sm">{item.company || "Unknown Company"}</p>
                                            <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${item.readinessScore > 75 ? 'bg-emerald-100 text-emerald-700' :
                                                item.readinessScore > 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {item.readinessScore}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Original content preserved below for "General Practice" context */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Breakdown (General)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Skills"
                                    dataKey="A"
                                    stroke="hsl(245, 58%, 51%)"
                                    fill="hsl(245, 58%, 51%)"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Continue Practice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="font-medium text-slate-900">Dynamic Programming</p>
                                <p className="text-sm text-slate-500">Last practiced 2 hours ago</p>
                            </div>
                            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-primary">
                                <Play size={20} fill="currentColor" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-600">Progress</span>
                                <span className="font-medium text-slate-900">3/10</span>
                            </div>
                            <Progress value={30} />
                        </div>
                        <button className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
                            Continue Session
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    return (
        <div>
            {view === 'HOME' && renderHomeView()}
            {view === 'ANALYZE' && renderAnalyzeView()}
            {view === 'RESULTS' && renderResultsView()}
            {view === 'HISTORY' && renderHistoryView()}
        </div>
    );
};

export const Practice = () => (<div>Practice Module Placeholder</div>);
export const Assessments = () => (<div>Assessments Module Placeholder</div>);
export const Resources = () => (<div>Resources Module Placeholder</div>);
export const Profile = () => (<div>Profile Module Placeholder</div>);
