import React from 'react';
import { Server, Wrench } from 'lucide-react';

const MaintenancePage: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="mb-5">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-amber-100/50 rounded-full animate-pulse"></div>
              <div className="relative bg-amber-500/10 p-6 rounded-full">
                <Wrench
                  className="w-16 h-16 md:w-18 md:h-18 text-amber-500"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Website Under Maintenance
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          {/* Description */}
          <div className="mb-10 space-y-4">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto">
              We are currently performing scheduled maintenance to improve your experience.
            </p>
            <p className="text-base md:text-lg text-slate-500 max-w-md mx-auto">
              The site will be back online very soon. Thank you for your patience.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Server className="w-4 h-4 text-blue-600" />
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                  Status
                </p>
              </div>
              <p className="text-sm font-bold text-blue-900">Coming Soon</p>
            </div>

            <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Wrench className="w-4 h-4 text-amber-600" />
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                  Progress
                </p>
              </div>
              <p className="text-sm font-bold text-amber-900">In Progress</p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-200/50">
            <p className="text-slate-500 text-sm md:text-base">
              We appreciate your understanding.
            </p>
            <p className="text-slate-400 text-xs md:text-sm mt-2">
              Please check back in a few minutes
            </p>
          </div>
        </div>

        {/* Subtle animation dots */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-bounce"></div>
        <div
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>
    </div>
  );
};

export default MaintenancePage;