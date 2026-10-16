import React from 'react';
import { BookOpen, Sparkles, Plus, History, HelpCircle, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  activeTab: 'beranda' | 'buat' | 'pratinjau' | 'riwayat' | 'panduan';
  setActiveTab: (tab: 'beranda' | 'buat' | 'pratinjau' | 'riwayat' | 'panduan') => void;
  hasActiveModule: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, hasActiveModule }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#A7D8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-6">
          
          {/* Zone 1: Clean Brand Wordmark */}
          <button 
            type="button"
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-2.5 cursor-pointer text-left shrink-0 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-[#4169E1] border-1.5 border-[#24345B] shadow-[2px_2px_0px_#24345B] flex items-center justify-center text-white shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-retro font-bold text-lg text-[#24345B] tracking-tight hover:text-[#4169E1] transition-colors whitespace-nowrap">
              MODUL KOKURIKULER SMA
            </span>
          </button>

          {/* Zone 2: Navigation Links (single line, no wrapping) */}
          <nav className="hidden lg:flex items-center gap-2 font-medium text-sm">
            <button
              onClick={() => setActiveTab('beranda')}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'beranda'
                  ? 'bg-[#4169E1] text-white font-semibold shadow-[2px_2px_0px_#24345B] border border-[#24345B]'
                  : 'text-[#24345B] hover:bg-[#F4F6FA] hover:text-[#4169E1]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Beranda
            </button>

            <button
              onClick={() => setActiveTab('buat')}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'buat'
                  ? 'bg-[#4169E1] text-white font-semibold shadow-[2px_2px_0px_#24345B] border border-[#24345B]'
                  : 'text-[#24345B] hover:bg-[#F4F6FA] hover:text-[#4169E1]'
              }`}
            >
              <Plus className="w-4 h-4" />
              Buat Modul
            </button>

            {hasActiveModule && (
              <button
                onClick={() => setActiveTab('pratinjau')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'pratinjau'
                    ? 'bg-[#4169E1] text-white font-semibold shadow-[2px_2px_0px_#24345B] border border-[#24345B]'
                    : 'text-[#24345B] hover:bg-[#F4F6FA] hover:text-[#4169E1]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Pratinjau Modul
              </button>
            )}

            <button
              onClick={() => setActiveTab('riwayat')}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'riwayat'
                  ? 'bg-[#4169E1] text-white font-semibold shadow-[2px_2px_0px_#24345B] border border-[#24345B]'
                  : 'text-[#24345B] hover:bg-[#F4F6FA] hover:text-[#4169E1]'
              }`}
            >
              <History className="w-4 h-4" />
              Riwayat Modul
            </button>

            <button
              onClick={() => setActiveTab('panduan')}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'panduan'
                  ? 'bg-[#4169E1] text-white font-semibold shadow-[2px_2px_0px_#24345B] border border-[#24345B]'
                  : 'text-[#24345B] hover:bg-[#F4F6FA] hover:text-[#4169E1]'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Panduan 2025
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('buat')}
              className="retro-button-primary px-3.5 py-2 rounded-lg font-semibold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Buat Modul Baru</span>
            </button>
          </div>

        </div>

        {/* Mobile secondary navigation strip */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-[#A7D8F0]/60 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('beranda')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'beranda' ? 'text-[#4169E1] font-bold' : 'text-[#24345B]'}`}
          >
            Beranda
          </button>
          <button 
            onClick={() => setActiveTab('buat')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'buat' ? 'text-[#4169E1] font-bold' : 'text-[#24345B]'}`}
          >
            Buat Modul
          </button>
          {hasActiveModule && (
            <button 
              onClick={() => setActiveTab('pratinjau')}
              className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'pratinjau' ? 'text-[#4169E1] font-bold' : 'text-[#24345B]'}`}
            >
              Pratinjau
            </button>
          )}
          <button 
            onClick={() => setActiveTab('riwayat')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'riwayat' ? 'text-[#4169E1] font-bold' : 'text-[#24345B]'}`}
          >
            Riwayat
          </button>
          <button 
            onClick={() => setActiveTab('panduan')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'panduan' ? 'text-[#4169E1] font-bold' : 'text-[#24345B]'}`}
          >
            Panduan
          </button>
        </div>

      </div>
    </header>
  );
};
