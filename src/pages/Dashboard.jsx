import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Play } from 'lucide-react';

// Mock Data for Radar Chart
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
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#e2e8f0"
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
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
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Welcome back, User!</h1>
                <p className="text-slate-600">Here's your preparation overview for today.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* 1. Overall Readiness */}
                <Card className="flex flex-col items-center justify-center py-8">
                    <CircularProgress value={72} />
                    <p className="mt-4 font-medium text-slate-700">Overall Readiness</p>
                </Card>

                {/* 2. Skill Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
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

                {/* 3. Continue Practice */}
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

                {/* 4. Weekly Goals */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <p className="text-3xl font-bold text-slate-900">12<span className="text-lg text-slate-400 font-normal">/20</span></p>
                                    <p className="text-sm text-slate-500">Problems Solved</p>
                                </div>
                            </div>
                            <Progress value={60} className="h-3" />
                        </div>

                        <div className="flex justify-between mt-6">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${[0, 1, 2, 4].includes(i) ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        {day}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Upcoming Assessments */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Upcoming Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", type: "Technical" },
                                { title: "System Design Review", time: "Wed, 2:00 PM", type: "Design" },
                                { title: "HR Interview Prep", time: "Friday, 11:00 AM", type: "Behavioral" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-200">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-12 rounded-full ${i === 0 ? 'bg-indigo-500' : i === 1 ? 'bg-emerald-500' : 'bg-amber-500'
                                            }`}></div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{item.title}</p>
                                            <p className="text-sm text-slate-500">{item.time}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600">
                                        {item.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export const Practice = () => (<div>...</div>);
export const Assessments = () => (<div>...</div>);
export const Resources = () => (<div>...</div>);
export const Profile = () => (<div>...</div>);
