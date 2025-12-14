import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Plus,
  Printer,
  Search,
  XCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Copy } from '../../types';

const CopyList = () => {
  const copies: Copy[] = [
    {
      barcode: 'ITM-2024-001523',
      bookId: '1',
      title: 'Machine Learning: A Comprehensive Guide',
      location: 'Floor 3 - Section C - Shelf 12',
      status: 'Available',
      format: 'Print',
      callNumber: '006.3',
    },
    {
      barcode: 'ITM001235',
      bookId: '2',
      title: 'Deep Learning with Python',
      location: 'Shelf A1-05',
      status: 'On Loan',
      format: 'Print',
      callNumber: '006.3',
    },
    {
      barcode: 'ITM001236',
      bookId: '3',
      title: 'Introduction to Algorithms',
      location: 'Shelf B2-01',
      status: 'Available',
      format: 'Print',
      callNumber: '005.1',
    },
    {
      barcode: 'ITM001237',
      bookId: '4',
      title: 'Data Science Handbook',
      location: 'Shelf A2-12',
      status: 'Lost',
      format: 'Print',
      callNumber: '005.7',
    },
    {
      barcode: 'EBOOK-2024-001',
      bookId: '5',
      title: 'Python for Data Analysis',
      location: 'Online Access',
      status: 'Available',
      format: 'E-book',
      callNumber: '005.13',
    },
    {
      barcode: 'ITM001238',
      bookId: '4',
      title: 'Artificial Intelligence: A Modern Approach',
      location: 'Shelf C1-08',
      status: 'Withdrawn',
      format: 'Print',
      callNumber: '006.3',
    },
    {
      barcode: 'ITM001239',
      bookId: '2',
      title: 'Neural Networks and Deep Learning',
      location: 'Shelf A1-07',
      status: 'On Loan',
      format: 'Print',
      callNumber: '006.3',
    },
    {
      barcode: 'ITM001240',
      bookId: '1',
      title: 'Computer Vision: Algorithms and Applications',
      location: 'Shelf B3-04',
      status: 'Available',
      format: 'Print',
      callNumber: '006.37',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý bản sao</h1>
          <p className="text-slate-500">
            Quản lý các tài liệu thư viện vật lý và kỹ thuật số
          </p>
        </div>
        <button className="bg-secondary hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-colors">
          <Plus size={20} /> Thêm Bản Sao Mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2 relative">
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
              Tìm Kiếm
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Barcode or ID của bản sao..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
              Thư viện
            </label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white">
              <option>Tất cả thư viện</option>
              <option>Central Library</option>
              <option>Branch A</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
              Kệ sách
            </label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white">
              <option>Tất cả kệ sách</option>
              <option>Shelf A</option>
              <option>Shelf B</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                Trạng thái
              </label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white">
                <option>Tất cả trạng thái</option>
                <option>Available</option>
                <option>On Loan</option>
              </select>
            </div>
            <button className="bg-secondary text-white h-[42px] px-3 rounded-lg flex items-center justify-center hover:bg-indigo-700">
              <Filter size={18} />{' '}
              <span className="ml-1 hidden xl:inline">Bộ lọc</span>
            </button>
            <button className="bg-white border border-slate-200 text-slate-600 h-[42px] px-3 rounded-lg flex items-center justify-center hover:bg-slate-50">
              <Printer size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-700">
            Danh sách bản sao{' '}
            <span className="text-slate-400 font-normal text-sm ml-2">
              Tổng cộng 1,247 bản sao
            </span>
          </h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 shadow-sm flex items-center gap-2">
              <Printer size={14} /> Export
            </button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
              <th className="px-6 py-4 w-12">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-4 font-semibold">Barcode</th>
              <th className="px-6 py-4 font-semibold">Tiêu đề</th>
              <th className="px-6 py-4 font-semibold">Vị trí</th>
              <th className="px-6 py-4 font-semibold">Trạng thái</th>
              <th className="px-6 py-4 font-semibold">Hình thức</th>
              <th className="px-6 py-4 font-semibold text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {copies.map((copy) => (
              <tr
                key={copy.barcode}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-mono text-slate-600">
                    <span className="text-slate-300">||||</span>
                    <Link
                      to={`/librarian/copies/${copy.barcode}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {copy.barcode}
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-900">
                    {copy.title}
                  </div>
                  <div className="text-xs text-slate-400">by Author Name</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">
                    {copy.location.includes('Central Library')
                      ? 'Central Library'
                      : copy.location.includes('Branch')
                      ? copy.location.split('Shelf')[0]
                      : copy.location}
                  </div>
                  <div className="text-xs text-slate-500">
                    {copy.location.includes('Shelf')
                      ? copy.location.split('Library')[1] || copy.location
                      : ''}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      copy.status === 'Available'
                        ? 'bg-green-100 text-green-700'
                        : copy.status === 'On Loan'
                        ? 'bg-blue-100 text-blue-700'
                        : copy.status === 'Lost'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {copy.status === 'Available' && (
                      <CheckCircle size={12} className="fill-current" />
                    )}
                    {copy.status === 'On Loan' && (
                      <Clock size={12} className="fill-current" />
                    )}
                    {copy.status === 'Lost' && (
                      <XCircle size={12} className="fill-current" />
                    )}
                    {copy.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {copy.format === 'E-book' ? (
                    <span className="flex items-center gap-1 text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 text-xs">
                      <Printer size={12} /> Ebook
                    </span>
                  ) : (
                    'Print'
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/librarian/copies/${copy.barcode}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </Link>
                    <button className="text-orange-500 hover:text-orange-700">
                      <AlertTriangle size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Printer size={18} className="rotate-45" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-white">
          <span className="text-sm text-slate-500">
            Hiển thị 1 đến 8 trong tổng số 1.247 mục
          </span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 text-slate-500 text-sm">
              &lt;
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-secondary text-white text-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm">
              3
            </button>
            <span className="text-slate-400">...</span>
            <button className="w-10 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm">
              156
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 text-slate-500 text-sm">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyList;
