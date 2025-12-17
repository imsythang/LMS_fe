import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Copy as CopyIcon,
  ExternalLink,
  FileText,
  History,
  PenTool,
  Printer,
  RotateCcw,
  Save,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

// Đảm bảo đường dẫn này đúng với project của bạn
import { Publication } from '@/api/publicationTypes';

export interface BookCopy {
  id: number;
  barcode: string;
  status: 'AVAILABLE' | 'ON_LOAN' | 'LOST' | 'WITHDRAWN' | string;
  itemType: string;
  location: string;
  price?: number;
  acquiredDate?: string;
  publication: Publication;
}

type CopyForm = {
  price: number | '';
  libraryLocation: string; // dropdown demo
  itemType: string;
  status: string;
  location: string; // vị trí kệ
  internalNote: string;
};

const CopyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [copyData, setCopyData] = useState<BookCopy | null>(null);

  const [form, setForm] = useState<CopyForm>({
    price: '',
    libraryLocation: 'Main Library - Campus A',
    itemType: 'PAPERBACK',
    status: 'AVAILABLE',
    location: '',
    internalNote: '',
  });

  // Shortcut
  const publication = copyData?.publication;

  // Generate barcode bars once (avoid Math.random each render)
  const barcodeBars = useMemo(() => {
    return Array.from({ length: 30 }).map(() => (Math.random() > 0.5 ? 2 : 4));
  }, [copyData?.barcode]); // đổi barcode thì regenerate

  useEffect(() => {
    const fetchItem = async () => {
      if (!id || id === 'new') {
        setCopyData(null);
        setError(null);
        setLoading(false);
        setForm({
          price: '',
          libraryLocation: 'Main Library - Campus A',
          itemType: 'PAPERBACK',
          status: 'AVAILABLE',
          location: '',
          internalNote: '',
        });
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await axiosInstance.get(`/items/${id}`);

        // Lấy data an toàn theo nhiều cấu trúc
        let actualData: BookCopy | null = null;

        if (res?.data?.data?.barcode) actualData = res.data.data;
        else if (res?.data?.barcode) actualData = res.data;
        else actualData = (res?.data?.data || res?.data || null) as BookCopy | null;

        if (!actualData?.barcode) {
          throw new Error('Invalid API response: missing barcode');
        }

        setCopyData(actualData);

        // init form từ data
        setForm({
          price: typeof actualData.price === 'number' ? actualData.price : '',
          libraryLocation: 'Main Library - Campus A',
          itemType: actualData.itemType || 'PAPERBACK',
          status: actualData.status || 'AVAILABLE',
          location: actualData.location || '',
          internalNote: '',
        });
      } catch (err) {
        console.error('Fetch item failed', err);
        setError('Không tải được thông tin bản sao.');
        setCopyData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'Có sẵn';
      case 'ON_LOAN':
        return 'Đang mượn';
      case 'LOST':
        return 'Mất';
      case 'WITHDRAWN':
        return 'Thu hồi';
      default:
        return status || 'N/A';
    }
  };

  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'LOST':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'ON_LOAN':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'WITHDRAWN':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const logDotClass = (color: string) => {
    // Tailwind MUST be static strings
    switch (color) {
      case 'green':
        return 'bg-green-500';
      case 'blue':
        return 'bg-blue-500';
      case 'slate':
        return 'bg-slate-500';
      case 'red':
        return 'bg-red-500';
      case 'purple':
        return 'bg-purple-500';
      default:
        return 'bg-slate-400';
    }
  };

  const onChange = <K extends keyof CopyForm>(key: K, value: CopyForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!copyData) return;

    try {
      setSaving(true);
      setError(null);

      const payload = {
        price: form.price === '' ? null : Number(form.price),
        itemType: form.itemType,
        status: form.status,
        location: form.location,
        // libraryLocation + internalNote: demo UI, chỉ gửi nếu backend có field tương ứng
        // libraryLocation: form.libraryLocation,
        // internalNote: form.internalNote,
      };

      await axiosInstance.put(`/items/${copyData.id}`, payload);

      // update local state (optimistic refresh)
      setCopyData((prev) =>
        prev
          ? ({
              ...prev,
              price: payload.price ?? undefined,
              itemType: payload.itemType,
              status: payload.status,
              location: payload.location,
            } as BookCopy)
          : prev
      );
    } catch (e) {
      console.error(e);
      setError('Lưu thất bại. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!copyData) return;
    const ok = window.confirm('Bạn chắc chắn muốn xóa bản sao này? Hành động không thể hoàn tác.');
    if (!ok) return;

    try {
      setDeleting(true);
      setError(null);

      await axiosInstance.delete(`/items/${copyData.id}`);
      navigate('/librarian/copies');
    } catch (e) {
      console.error(e);
      setError('Xóa thất bại. Vui lòng thử lại.');
    } finally {
      setDeleting(false);
    }
  };

  const handleClone = async () => {
    if (!copyData) return;

    try {
      // Tùy backend: bạn có thể có endpoint clone riêng.
      // Ở đây mình làm mẫu: POST /items (tạo item mới) từ item cũ
      const payload = {
        publicationId: publication?.id,
        // barcode bắt buộc unique -> backend tự sinh hoặc user nhập
        itemType: form.itemType,
        status: 'AVAILABLE',
        location: form.location,
        price: form.price === '' ? null : Number(form.price),
      };

      const res = await axiosInstance.post(`/items`, payload);
      const newId = res?.data?.data?.id ?? res?.data?.id;

      if (newId) navigate(`/librarian/copies/${newId}`);
      else alert('Nhân bản thành công nhưng không lấy được ID bản sao mới.');
    } catch (e) {
      console.error(e);
      setError('Nhân bản thất bại. Kiểm tra backend endpoint /items.');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 pb-20">
      {loading && <div className="text-center text-slate-500 py-10">Đang tải bản sao...</div>}

      {!loading && error && <div className="text-center text-red-600 py-10">{error}</div>}

      {!loading && !error && !copyData && (
        <div className="text-center text-slate-500 py-10">Bản sao mới: điền thông tin để thêm.</div>
      )}

      {!loading && copyData && publication && (
        <>
          {/* Breadcrumb & Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Link to="/librarian/dashboard" className="hover:text-blue-600">
                Trang chủ
              </Link>
              <span>&gt;</span>
              <Link to="/librarian/copies" className="hover:text-blue-600">
                Bản sao
              </Link>
              <span>&gt;</span>
              <span className="text-slate-800 font-medium">{copyData.barcode}</span>
            </div>

            <div className="flex justify-between items-end mt-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">Chi tiết bản sao</h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusBadgeClass(
                    form.status
                  )}`}
                >
                  {getStatusLabel(form.status)}
                </span>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2 shadow-sm">
                  <History size={18} /> Xem lịch sử
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm disabled:opacity-60"
                >
                  <Save size={18} /> {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </div>

            <p className="text-slate-500">Thông tin đầy đủ và các tùy chọn quản lý cho tài liệu thư viện này</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* 1. Copy Info Form */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <FileText size={20} />
                  </div>
                  <h2 className="font-bold text-lg text-slate-800">Thông tin bản sao</h2>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Barcode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={copyData.barcode}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-mono bg-slate-50"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Giá (VND)</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => onChange('price', e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Vị trí thư viện <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.libraryLocation}
                      onChange={(e) => onChange('libraryLocation', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option>Main Library - Campus A</option>
                      <option>Branch Library - Campus B</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Loại bản sao</label>
                    <select
                      value={form.itemType}
                      onChange={(e) => onChange('itemType', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="PAPERBACK">Sách bìa mềm</option>
                      <option value="HARDCOVER">Sách bìa cứng</option>
                      <option value="MAGAZINE">Tạp chí</option>
                      <option value="DVD">DVD/CD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Trạng thái <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) => onChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="AVAILABLE">Có sẵn</option>
                      <option value="ON_LOAN">Đang mượn</option>
                      <option value="LOST">Mất</option>
                      <option value="WITHDRAWN">Thu hồi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Vị trí kệ sách</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => onChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú nội bộ</label>
                  <textarea
                    value={form.internalNote}
                    onChange={(e) => onChange('internalNote', e.target.value)}
                    placeholder="Thêm ghi chú nội bộ cho bản sao này..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
                  />
                </div>
              </div>

              {/* 2. Publication Info Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <ExternalLink size={20} />
                    </div>
                    <h2 className="font-bold text-lg text-slate-800">Ấn phẩm</h2>
                  </div>

                  <Link
                    to={`/librarian/publications/${publication.id}`}
                    className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded flex items-center gap-2 hover:bg-blue-700"
                  >
                    <ExternalLink size={14} /> Xem ấn phẩm
                  </Link>
                </div>

                <div className="flex gap-6">
                  <div className="w-24 h-36 bg-slate-200 rounded-lg shrink-0 overflow-hidden shadow-sm">
                    {(publication as any)?.coverImageUrl ? (
                      <img
                        src={(publication as any).coverImageUrl}
                        alt={(publication as any).title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center p-2 text-center">
                        <span className="text-white font-bold text-xs uppercase tracking-widest opacity-80">
                          {(publication as any)?.title?.substring(0, 15) || 'NO COVER'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">
                        {(publication as any)?.title}
                      </h3>

                      {(publication as any)?.subtitle && (
                        <p className="text-slate-500 text-sm italic">{(publication as any).subtitle}</p>
                      )}

                      <div className="mt-1">
                        {Array.isArray((publication as any)?.authors) &&
                          (publication as any).authors.map((author: any, index: number) => (
                            <span key={author?.id ?? index} className="text-slate-600 font-medium">
                              {author?.authorName ?? author?.name ?? 'Unknown'}
                              {index < (publication as any).authors.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                      </div>

                      <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                        <span className="flex items-center gap-1 font-semibold">
                          <ExternalLink size={12} />{' '}
                          {(publication as any)?.publisher?.publisherName ??
                            (publication as any)?.publisherName ??
                            'N/A'}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>{(publication as any)?.publicationYear ?? 'N/A'}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>{(publication as any)?.language ?? 'N/A'}</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">ISBN</p>
                        <p className="text-sm font-semibold text-slate-800">{(publication as any)?.isbn ?? 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Tái bản</p>
                        <p className="text-sm font-semibold text-slate-800">
                          {(publication as any)?.edition ?? 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Số trang</p>
                        <p className="text-sm font-semibold text-slate-800">
                          {(publication as any)?.numberOfPages ?? 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Tổng bản sao</p>
                        <p className="text-sm font-semibold text-slate-800">
                          {(publication as any)?.totalItems ?? 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {Array.isArray((publication as any)?.tags) &&
                        (publication as any).tags.map((tag: any, idx: number) => (
                          <span
                            key={tag?.id ?? idx}
                            className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium"
                          >
                            {tag?.tagName ?? tag?.name ?? 'Tag'}
                          </span>
                        ))}

                      {Array.isArray((publication as any)?.categories) &&
                        (publication as any).categories.map((cat: any, idx: number) => (
                          <span
                            key={cat?.id ?? idx}
                            className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100 font-medium"
                          >
                            {cat?.categoryName ?? cat?.name ?? 'Category'}
                          </span>
                        ))}
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed text-justify line-clamp-3">
                      {(publication as any)?.description || 'Chưa có mô tả cho ấn phẩm này.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Borrowing History (MOCK) */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <History className="text-purple-600" size={20} />
                    <h2 className="font-bold text-lg text-slate-800">Lịch sử mượn</h2>
                  </div>
                  <div className="flex gap-2">
                    <select className="text-sm border border-slate-200 rounded px-2 py-1 bg-white outline-none">
                      <option>Tất cả thời gian</option>
                    </select>
                    <button className="px-3 py-1 border border-slate-200 rounded text-sm hover:bg-slate-50 flex items-center gap-1">
                      <Printer size={14} /> Export
                    </button>
                  </div>
                </div>

                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-4 py-3 font-semibold">Loan ID</th>
                      <th className="px-4 py-3 font-semibold">Người mượn</th>
                      <th className="px-4 py-3 font-semibold">Ngày mượn</th>
                      <th className="px-4 py-3 font-semibold">Hạn trả</th>
                      <th className="px-4 py-3 font-semibold">Ngày trả</th>
                      <th className="px-4 py-3 font-semibold">Trạng thái</th>
                      <th className="px-4 py-3 font-semibold">Phí</th>
                      <th className="px-4 py-3 font-semibold text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {
                        id: 'LN-2024-0892',
                        user: 'Phạm Minh Tuấn',
                        mssv: 'SV2021-1523',
                        borrow: 'Nov 15, 2024',
                        due: 'Dec 15, 2024',
                        return: 'Dec 5, 2024',
                        status: 'đã trả',
                        fee: 0,
                        overdue: false,
                      },
                      {
                        id: 'LN-2024-0756',
                        user: 'Lê Thị Hương',
                        mssv: 'SV2021-0892',
                        borrow: 'Oct 20, 2024',
                        due: 'Nov 20, 2024',
                        return: 'Nov 25, 2024',
                        status: 'quá thời hạn',
                        fee: 25000,
                        overdue: true,
                      },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-slate-600 text-xs">{row.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                              {row.user.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">{row.user}</div>
                              <div className="text-[10px] text-slate-500">{row.mssv}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{row.borrow}</td>
                        <td className="px-4 py-3 text-slate-600">{row.due}</td>
                        <td className="px-4 py-3 text-slate-600">{row.return}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              row.overdue ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {row.fee > 0 ? `${row.fee.toLocaleString()} VND` : '0 VND'}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-blue-600 hover:text-blue-800">
                            <ExternalLink size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-slate-50">
                  <span className="text-xs text-slate-500">Hiển thị 2 trong tổng số 47 lượt mượn</span>
                  <div className="flex gap-1">
                    <button className="w-6 h-6 flex items-center justify-center border rounded bg-white text-slate-600 text-xs hover:bg-slate-100">
                      1
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center border rounded bg-white text-slate-600 text-xs hover:bg-slate-100">
                      2
                    </button>
                    <span className="text-xs text-slate-400 px-1">...</span>
                    <button className="w-6 h-6 flex items-center justify-center border rounded bg-white text-slate-600 text-xs hover:bg-slate-100">
                      10
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Analytics (MOCK) */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                  <TrendingUp className="text-blue-600" size={20} />
                  <h2 className="font-bold text-lg text-slate-800">Circulation Analytics</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-4">Số lượt mượn theo tháng (2024)</h4>
                    <div className="h-40 flex items-end justify-between gap-1">
                      {[2, 3, 4, 3, 5, 6, 4, 3, 5, 2, 1, 3].map((h, i) => (
                        <div
                          key={i}
                          className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors relative group"
                          style={{ height: `${h * 15}%` }}
                        >
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-600 opacity-0 group-hover:opacity-100">
                            {h}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-slate-500 uppercase font-medium">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-4">Phân bố người mượn</h4>
                    <div className="flex items-center gap-6">
                      <div
                        className="w-32 h-32 rounded-full relative flex-shrink-0"
                        style={{
                          background:
                            'conic-gradient(#3b82f6 0% 31.9%, #10b981 31.9% 57.4%, #f59e0b 57.4% 74.4%, #ef4444 74.4% 89.3%, #6366f1 89.3% 100%)',
                        }}
                      >
                        <div className="absolute inset-0 m-8 bg-white rounded-full"></div>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span> Computer Science (31.9%)
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span> Engineering (25.5%)
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span> Business (17.0%)
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span> Medicine (14.9%)
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Other (10.6%)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Maintenance & Log (MOCK) */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                  <AlertTriangle className="text-blue-600" size={20} />
                  <h2 className="font-bold text-lg text-slate-800">Tình trạng & bảo trì bản sao</h2>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 relative">
                    <div className="absolute top-4 right-4 text-emerald-600">
                      <CheckCircle size={20} className="fill-emerald-200" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">Tình trạng tổng quan</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">Tốt</h3>
                    <p className="text-[10px] text-slate-500 mt-2">Lần kiểm tra gần nhất: 01/12/2024</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 relative">
                    <div className="absolute top-4 right-4 text-blue-600">
                      <PenTool size={20} className="fill-blue-200" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">Hạn bảo trì</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">Không</h3>
                    <p className="text-[10px] text-slate-500 mt-2">Lần kiểm tra tiếp theo: 01/03/2025</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 relative">
                    <div className="absolute top-4 right-4 text-purple-600">
                      <span className="font-bold text-lg">$</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">Giá trị ước tính</p>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">405,000 VND</h3>
                    <p className="text-[10px] text-slate-500 mt-2">90% của tổng giá gốc</p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg text-slate-800">Nhật ký hoạt động</h4>
                    <button className="text-sm text-blue-600 hover:underline">Xem tất cả</button>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        title: 'Bản sao được mượn bởi Phạm Minh Tuấn',
                        sub: 'Loan ID: LN-2024-0892 - Returned on time, no fines',
                        date: 'Dec 5, 2024 14:23',
                        color: 'green',
                      },
                      {
                        title: 'Việc kiểm tra tình trạng đã hoàn tất',
                        sub: 'Kiểm tra định kỳ bởi Nguyễn Văn A - Tình trạng: Xuất sắc',
                        date: 'Dec 1, 2024 09:15',
                        color: 'blue',
                      },
                      {
                        title: 'Sản phẩm đã được kiểm tra cho Phạm Minh Tuấn',
                        sub: 'Loan ID: LN-2024-0892 - Due date: Dec 15, 2024',
                        date: 'Nov 15, 2024 10:45',
                        color: 'slate',
                      },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${logDotClass(log.color)}`} />
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{log.title}</p>
                          <p className="text-xs text-slate-500">{log.sub}</p>
                        </div>
                        <span className="text-xs text-slate-400 tabular-nums shrink-0">{log.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Danger Zone */}
              <div className="bg-red-50 rounded-xl border border-red-100 p-6">
                <div className="flex items-center gap-2 mb-2 text-red-700">
                  <AlertTriangle size={20} />
                  <h3 className="font-bold">Vùng nguy hiểm</h3>
                </div>
                <p className="text-sm text-red-600 mb-4">
                  Những hành động không thể hoàn tác, đòi hỏi sự cân nhắc kỹ lưỡng.
                </p>
                <div className="bg-white p-4 rounded-lg border border-red-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Xóa bản sao</h4>
                    <p className="text-xs text-slate-500">
                      Xóa vĩnh viễn bản sao này khỏi hệ thống. Hành động này không thể hoàn tác.
                    </p>
                  </div>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-60"
                  >
                    <Trash2 size={16} /> {deleting ? 'Đang xóa...' : 'Xóa bản sao'}
                  </button>
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Quay lại trang danh sách bản sao
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleClone}
                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2"
                  >
                    <CopyIcon size={16} /> Nhân bản bản sao
                  </button>
                  <button
                    onClick={() => navigate('/librarian/copies')}
                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50"
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 disabled:opacity-60"
                  >
                    <Save size={16} /> {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Thống kê nhanh</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                      <RotateCcw size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Tổng số lượt mượn</p>
                      <p className="text-xl font-bold text-slate-900">47</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Trạng thái hiện tại</p>
                      <p className="text-xl font-bold text-slate-900">{getStatusLabel(form.status)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Ngày trả gần nhất</p>
                      <p className="text-lg font-bold text-slate-900">Dec 5, 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barcode Preview */}
              <div className="bg-blue-600 rounded-xl shadow-lg p-6 text-center text-white">
                <h3 className="font-bold mb-4">Item Barcode</h3>

                <div className="bg-white p-4 rounded-lg mb-4 inline-block">
                  <div className="h-12 w-48 flex items-end justify-center gap-[2px]">
                    {barcodeBars.map((w, i) => (
                      <div key={i} className="bg-black" style={{ width: `${w}px`, height: '100%' }} />
                    ))}
                  </div>
                  <p className="text-black font-mono text-sm mt-1 font-bold">{copyData.barcode}</p>
                </div>

                <button className="w-full bg-white text-blue-600 font-bold py-2.5 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                  <Printer size={18} /> Print Barcode Label
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CopyDetails;
