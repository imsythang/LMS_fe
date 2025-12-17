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
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react';
import { Copy } from '../../types';
import axiosInstance from '../../api/axiosInstance';

type ItemApi = {
  id: number;
  publicationId: number;
  publicationTitle: string;
  barcode: string;
  status: 'AVAILABLE' | 'ON_LOAN' | 'LOST' | 'WITHDRAWN' | string;
  itemType: 'PAPERBACK' | 'HARDCOVER' | 'EBOOK' | string;
  location: string;
  acquiredDate?: string;
};

const CopyList = () => {
  const [copies, setCopies] = useState<Copy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosInstance.get('/items');
        const list: ItemApi[] = res?.data ?? res ?? [];
        const mapped: Copy[] = list.map((item) => ({
          barcode: item.barcode,
          bookId: String(item.publicationId),
          title: item.publicationTitle,
          location: item.location,
          status:
            item.status === 'AVAILABLE'
              ? 'Available'
              : item.status === 'ON_LOAN'
              ? 'On Loan'
              : item.status === 'LOST'
              ? 'Lost'
              : item.status === 'WITHDRAWN'
              ? 'Withdrawn'
              : item.status,
          format: item.itemType === 'EBOOK' ? 'E-book' : 'Print',
          callNumber: '',
          // @ts-expect-error extend shape locally
          copyId: String(item.id),
        }));
        setCopies(mapped);
      } catch (err) {
        console.error('Fetch items failed', err);
        setError('Không tải được danh sách bản sao.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const totalLabel = useMemo(
    () => `Hiển thị ${copies.length} mục`,
    [copies.length]
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý bản sao</h1>
          <p className="text-slate-500">
            Quản lý các tài liệu thư viện vật lý và kỹ thuật số
          </p>
        </div>
        <Link
          to="/librarian/copies/new"
          className="bg-secondary hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-colors"
        >
          <Plus size={20} /> Thêm Bản Sao Mới
        </Link>
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
              {loading ? 'Đang tải...' : `Tổng cộng ${copies.length} bản sao`}
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
            {loading && (
              <tr>
                <td colSpan={7} className="px-6 py-6 text-center text-slate-500">
                  Đang tải danh sách bản sao...
                </td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan={7} className="px-6 py-6 text-center text-red-600">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && copies.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-6 text-center text-slate-500">
                  Chưa có bản sao nào.
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              copies.map((copy: any) => (
                <tr
                  key={copy.copyId || copy.barcode}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-mono text-slate-600">
                      <span className="text-slate-300">||||</span>
                      <Link
                        to={`/librarian/copies/${copy.copyId || copy.barcode}`}
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
                    <div className="text-xs text-slate-400">ID đầu sách: {copy.bookId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {copy.location}
                    </div>
                    {copy.callNumber && (
                      <div className="text-xs text-slate-500">{copy.callNumber}</div>
                    )}
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
                        to={`/librarian/copies/${copy.copyId || copy.barcode}`}
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
