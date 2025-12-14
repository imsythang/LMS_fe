import { Bell, HelpCircle, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
      {/* Breadcrumbs / Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        <span className="text-slate-300 mx-2">|</span>
        <span className="text-sm text-slate-500">Chào mừng trở lại, Thắng</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Tìm kiếm sách..."
            className="pl-9 pr-4 py-2 rounded-full bg-slate-100 border-none text-sm w-64 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
