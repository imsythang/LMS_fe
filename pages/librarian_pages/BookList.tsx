import { Edit2, Eye, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';

const BookList = () => {
  const books: Book[] = [
    {
      id: '1',
      title: 'Machine Learning: A Probabilistic Perspective',
      author: 'Kevin P. Murphy',
      isbn: '978-0262018029',
      year: 2012,
      publisher: 'MIT Press',
      totalCopies: 5,
      availableCopies: 3,
      category: 'Computer Science',
      thumbnail: 'https://picsum.photos/id/1/60/80', // Placeholder
    },
    {
      id: '2',
      title: 'Deep Learning',
      author: 'Ian Goodfellow, Yoshua Bengio',
      isbn: '978-0262035613',
      year: 2016,
      publisher: 'MIT Press',
      totalCopies: 8,
      availableCopies: 5,
      category: 'AI',
      thumbnail: 'https://picsum.photos/id/2/60/80',
    },
    {
      id: '3',
      title: 'Python for Data Analysis',
      author: 'Wes McKinney',
      isbn: '978-1491957660',
      year: 2017,
      publisher: "O'Reilly Media",
      totalCopies: 10,
      availableCopies: 0,
      category: 'Data Science',
      thumbnail: 'https://picsum.photos/id/3/60/80',
    },
    {
      id: '4',
      title: 'Artificial Intelligence: A Modern Approach',
      author: 'Stuart Russell, Peter Norvig',
      isbn: '978-0134610993',
      year: 2020,
      publisher: 'Pearson',
      totalCopies: 6,
      availableCopies: 0,
      category: 'AI',
      thumbnail: 'https://picsum.photos/id/4/60/80',
    },
    {
      id: '5',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen et al.',
      isbn: '978-0262033848',
      year: 2009,
      publisher: 'MIT Press',
      totalCopies: 10,
      availableCopies: 8,
      category: 'Computer Science',
      thumbnail: 'https://picsum.photos/id/5/60/80',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Publication List
          </h1>
          <p className="text-slate-500">
            Manage library publications and catalog
          </p>
        </div>
        <button className="bg-secondary hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-colors">
          <Plus size={20} /> Thêm đầu sách mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
              Tìm kiếm
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Tìm theo Title / Author / ISBN..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
              Chủ đề
            </label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white">
              <option>Tất cả chủ đề</option>
              <option>Computer Science</option>
              <option>Data Science</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
              Năm
            </label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white">
              <option>Tất cả năm</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center border-t border-slate-100 pt-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Có Items
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Không có Items
            </label>
          </div>
          <div className="flex gap-2">
            <button className="text-slate-500 text-sm font-medium hover:text-slate-700 px-3 py-2">
              Xóa bộ lọc
            </button>
            <button className="bg-secondary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700">
              Áp dụng
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 w-12">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-4 font-semibold">Tiêu Đề</th>
              <th className="px-6 py-4 font-semibold">Tác Giả</th>
              <th className="px-6 py-4 font-semibold w-24">Năm</th>
              <th className="px-6 py-4 font-semibold">Số lượng Item</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {books.map((book) => (
              <tr
                key={book.id}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-14 rounded shadow-sm flex-shrink-0 ${
                        [
                          'bg-blue-500',
                          'bg-green-500',
                          'bg-orange-500',
                          'bg-pink-500',
                          'bg-cyan-500',
                        ][parseInt(book.id) % 5]
                      }`}
                    ></div>
                    <div>
                      <Link
                        to={`/librarian/books/${book.id}`}
                        className="font-medium text-slate-900 hover:text-blue-600 line-clamp-2"
                      >
                        {book.title}
                      </Link>
                      <div className="text-xs text-slate-400 mt-1">
                        ISBN: {book.isbn}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {book.author}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {book.year}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium">
                    <span className="text-slate-900">{book.totalCopies}</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span
                      className={
                        book.availableCopies > 0
                          ? 'text-green-600'
                          : 'text-red-500'
                      }
                    >
                      {book.availableCopies} có sẵn
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/librarian/books/${book.id}`}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Eye size={18} />
                    </Link>
                    <button className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded">
                      <Plus size={18} />
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
            Hiển thị 1-5 trong tổng số 47 đầu sách
          </span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-500 text-sm">
              &lt;
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-secondary text-white text-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 text-sm">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 text-sm">
              3
            </button>
            <span className="text-slate-400 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 text-sm">
              7
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-500 text-sm">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
