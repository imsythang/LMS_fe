import React from 'react';
import Sidebar from './Sidebar';

export const LibrarianLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <main className="ml-64 flex-1">{children}</main>
    </div>
  );
};
