import React, { useState } from 'react';
import { X, BookOpen, Layers, Server, Database, CheckCircle2, Cpu, HardDrive, Monitor, Terminal, Code2, Globe } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';
import { PROJECT_EPICS } from '../data/mockData';

export const ProjectArchitectureModal: React.FC = () => {
  const { modalView, setModalView } = useCinema();
  const [activeTab, setActiveTab] = useState<'epics' | 'architecture' | 'system_reqs' | 'api_docs'>('epics');
  const [expandedEpicId, setExpandedEpicId] = useState<string>('epic-1');

  if (modalView !== 'project_docs') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Project Documentation & Architecture
                </span>
                <span className="text-xs text-slate-400">IMovies Platform Specification</span>
              </div>
              <h2 className="text-lg font-black text-white font-display">
                System Overview • 6 Epics & 19 Tasks
              </h2>
            </div>
          </div>

          <button
            onClick={() => setModalView('none')}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('epics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'epics'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Epics & Tasks (6 Epics • 19 Tasks)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Client-Server Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('system_reqs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'system_reqs'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>System Requirements</span>
          </button>

          <button
            onClick={() => setActiveTab('api_docs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'api_docs'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>REST API Spec & Schemas</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* TAB 1: 6 Epics & 19 Tasks */}
          {activeTab === 'epics' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                <div>
                  <h3 className="text-sm font-bold text-emerald-300">
                    Project Roadmap: 6 Epics & 19 Core Tasks
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Structured development lifecycle covering authentication, catalog, scheduling, real-time seating, payments, and admin portal.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black border border-emerald-500/40 shrink-0">
                  100% IMPLEMENTED
                </span>
              </div>

              <div className="space-y-3">
                {PROJECT_EPICS.map((epic) => {
                  const isExpanded = expandedEpicId === epic.id;
                  return (
                    <div
                      key={epic.id}
                      className="rounded-2xl bg-slate-950/70 border border-slate-800 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedEpicId(isExpanded ? '' : epic.id)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-slate-800 text-rose-400 flex items-center justify-center text-xs font-black shrink-0">
                            E{epic.number}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              {epic.title}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-1">{epic.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] font-semibold text-slate-400">
                            {epic.tasks.length} Tasks
                          </span>
                          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                            {epic.status}
                          </span>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3">
                          <p className="text-xs text-slate-300 leading-relaxed pt-2">
                            {epic.description}
                          </p>

                          <div className="space-y-2">
                            {epic.tasks.map((task) => (
                              <div
                                key={task.id}
                                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    <span className="text-xs font-bold text-white">{task.title}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 mt-1 pl-5">
                                    {task.description}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-1 sm:justify-end shrink-0 pl-5 sm:pl-0">
                                  {task.skills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Architecture Diagram */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  MERN Stack Multi-Tier Architecture
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  IMovies leverages a robust client-server architecture separating presentation, business logic, and document storage. Real-time availability tracking manages seat concurrency and ephemeral locks.
                </p>

                {/* Visual Architecture Flow */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  
                  {/* Layer 1: Client Tier */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-rose-400">Frontend Tier</span>
                      <Globe className="w-4 h-4 text-rose-500" />
                    </div>
                    <h4 className="text-sm font-bold text-white">React.js + Tailwind CSS</h4>
                    <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                      <li>Interactive Seat Map Engine</li>
                      <li>Curved IMAX Projection View</li>
                      <li>Live 8-Min Reservation Timer</li>
                      <li>Responsive Cinema Catalog</li>
                      <li>Digital Ticket / QR Pass</li>
                      <li>JWT Session & State Hooks</li>
                    </ul>
                  </div>

                  {/* Layer 2: API Tier */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-indigo-400">Backend Tier</span>
                      <Server className="w-4 h-4 text-indigo-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Node.js + Express.js</h4>
                    <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                      <li>RESTful API Endpoints</li>
                      <li>JWT Verification Middleware</li>
                      <li>Seat Concurrency Lock Engine</li>
                      <li>Promo & Pricing Calculations</li>
                      <li>Booking Reference Generator</li>
                      <li>Admin Metrics Aggregations</li>
                    </ul>
                  </div>

                  {/* Layer 3: Database Tier */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-emerald-400">Database Tier</span>
                      <Database className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white">MongoDB NoSQL Database</h4>
                    <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                      <li>Users & Auth Credentials</li>
                      <li>Movies & Media Collections</li>
                      <li>Showtimes & Seat Maps</li>
                      <li>Bookings & Payment History</li>
                      <li>Concessions Menu Catalog</li>
                      <li>Real-time Occupancy Indexes</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 3: System Requirements (From User Brief) */}
          {activeTab === 'system_reqs' && (
            <div className="space-y-6">
              
              {/* Software Requirements */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-rose-500" />
                  1. Software Prerequisites & Tooling
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Operating System</span>
                    <span className="text-slate-400">Windows 10/11, macOS, or Linux — Cross-platform support</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Node.js Runtime</span>
                    <span className="text-slate-400">v16.0.0 or above (v18/v20 recommended)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Package Manager (npm)</span>
                    <span className="text-slate-400">npm v8.0.0 or higher for dependency resolution</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Frontend Framework</span>
                    <span className="text-slate-400">React.js v18/v19 with modern hook-driven state</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Backend Server</span>
                    <span className="text-slate-400">Express.js for REST routing and middleware</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Database</span>
                    <span className="text-slate-400">MongoDB (NoSQL Document Store)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">API Testing</span>
                    <span className="text-slate-400">Postman / Insomnia for endpoint validation</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Code Editor</span>
                    <span className="text-slate-400">Visual Studio Code with ESLint & Prettier</span>
                  </div>
                </div>
              </div>

              {/* Hardware Requirements */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  2. Hardware Specifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Cpu className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-white">Processor</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Intel Core i5 (8th Gen+) or AMD Ryzen 5 or Apple Silicon M-series
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Server className="w-4 h-4 text-indigo-400" />
                      <span className="font-bold text-white">RAM</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Minimum 8 GB (16 GB recommended for concurrent dev servers)
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <HardDrive className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-white">Storage</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      At least 1 GB free space for packages, build artifacts, & DB
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Monitor className="w-4 h-4 text-sky-400" />
                      <span className="font-bold text-white">Display</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      1366 x 768 or higher (FHD 1080p recommended)
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: API Docs */}
          {activeTab === 'api_docs' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white">RESTful Endpoints Specification</h3>
                
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">GET</span>
                      <span className="text-slate-200">/api/movies</span>
                    </div>
                    <span className="text-slate-400 font-sans text-[11px]">Retrieve active movie catalog & genres</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">GET</span>
                      <span className="text-slate-200">/api/showtimes/:movieId</span>
                    </div>
                    <span className="text-slate-400 font-sans text-[11px]">Fetch hall schedules & seat maps</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">POST</span>
                      <span className="text-slate-200">/api/bookings</span>
                    </div>
                    <span className="text-slate-400 font-sans text-[11px]">Confirm reservation & issue digital ticket</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">DELETE</span>
                      <span className="text-slate-200">/api/bookings/:id</span>
                    </div>
                    <span className="text-slate-400 font-sans text-[11px]">Cancel booking and release auditorium seats</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">POST</span>
                      <span className="text-slate-200">/api/auth/login</span>
                    </div>
                    <span className="text-slate-400 font-sans text-[11px]">Authenticate user and generate JWT token</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
