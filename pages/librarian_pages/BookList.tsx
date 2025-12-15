import { Edit2, Eye, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import publicationsService from '../../api/publicationsService';
import { Publication } from '../../api/publicationTypes';
import { Book } from '../../types';

const BookList = () => {
  // State cho data
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // State cho sorting
  const [sortBy, setSortBy] = useState<'title' | 'publicationYear' | 'createdAt'>('createdAt');
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('DESC');

  // State cho search & filters
  const [searchInput, setSearchInput] = useState(''); // Input tạm
  const [keyword, setKeyword] = useState(''); // Keyword thực tế gửi lên API
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [hasItems, setHasItems] = useState(false);
  const [noItems, setNoItems] = useState(false);

  // State cho pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch data từ API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await publicationsService.getAllPublications({
          keyword: keyword || undefined,
          sortBy,
          direction,
          page: currentPage,
          size: pageSize,
        });

        if (response.code === 200 && response.data) {
          // Map từ Publication sang Book
          const mappedBooks: Book[] = response.data.content.map((pub: Publication) => ({
            id: pub.id.toString(),
            title: pub.title,
            author: pub.authors.map(a => a.authorName).join(', ') || 'N/A',
            isbn: pub.isbn,
            year: pub.publicationYear,
            publisher: pub.publisher.publisherName,
            totalCopies: pub.totalItems,
            availableCopies: pub.availableItems,
            category: pub.categories.map(c => c.categoryName).join(', ') || 'N/A',
            thumbnail: pub.coverImageUrl || '',
          }));

          setBooks(mappedBooks);
          setTotalElements(response.data.totalElements);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [keyword, sortBy, direction, currentPage, pageSize]);

  // Handler để toggle sort khi click header
  const handleSort = (field: 'title' | 'publicationYear') => {
    if (sortBy === field) {
      // Toggle direction
      setDirection(direction === 'DESC' ? 'ASC' : 'DESC');
    } else {
      // Set new sort field với DESC
      setSortBy(field);
      setDirection('DESC');
    }
    setCurrentPage(0); // Reset về trang đầu
  };

  // Handler cho nút "Áp dụng"
  const handleApplyFilters = () => {
    setKeyword(searchInput);
    setCurrentPage(0); // Reset về trang đầu khi search
    // TODO: Apply category, year, hasItems, noItems filters khi API hỗ trợ
  };

  // Handler cho nút "Xóa bộ lọc"
  const handleClearFilters = () => {
    setSearchInput('');
    setKeyword('');
    setSelectedCategory('');
    setSelectedYear('');
    setHasItems(false);
    setNoItems(false);
    setSortBy('createdAt');
    setDirection('DESC');
    setCurrentPage(0);
  };

  // Handler cho pagination
  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  // Handler cho Enter key trong search box
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyFilters();
    }
  };

  // Hiển thị loading
  if (loading && books.length === 0) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4 text-slate-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
              Chủ đề
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
            >
              <option value="">Tất cả chủ đề</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
              Năm
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
            >
              <option value="">Tất cả năm</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center border-t border-slate-100 pt-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={hasItems}
                onChange={(e) => setHasItems(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Có Items
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={noItems}
                onChange={(e) => setNoItems(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Không có Items
            </label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleClearFilters}
              className="text-slate-500 text-sm font-medium hover:text-slate-700 px-3 py-2"
            >
              Xóa bộ lọc
            </button>
            <button
              onClick={handleApplyFilters}
              className="bg-secondary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
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
              <th
                className="px-6 py-4 font-semibold cursor-pointer hover:text-slate-700 select-none"
                onClick={() => handleSort('title')}
              >
                Tiêu Đề {sortBy === 'title' && (direction === 'DESC' ? '↓' : '↑')}
              </th>
              <th className="px-6 py-4 font-semibold">Tác Giả</th>
              <th
                className="px-6 py-4 font-semibold w-24 cursor-pointer hover:text-slate-700 select-none"
                onClick={() => handleSort('publicationYear')}
              >
                Năm {sortBy === 'publicationYear' && (direction === 'DESC' ? '↓' : '↑')}
              </th>
              <th className="px-6 py-4 font-semibold">Số lượng Item</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
                    <span className="ml-3 text-slate-600">Đang tải...</span>
                  </div>
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            ) : (
              books.map((book) => (
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
                          book.availableCopies && book.availableCopies > 0
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
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-white">
          <span className="text-sm text-slate-500">
            Hiển thị {totalElements === 0 ? 0 : currentPage * pageSize + 1}-
            {Math.min((currentPage + 1) * pageSize, totalElements)} trong tổng số{' '}
            {totalElements} đầu sách
          </span>
          <div className="flex items-center gap-1">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>

            {/* Page numbers */}
            {totalPages > 0 && (
              <>
                {/* First page */}
                {currentPage > 2 && (
                  <>
                    <button
                      onClick={() => handlePageChange(0)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 text-sm"
                    >
                      1
                    </button>
                    {currentPage > 3 && (
                      <span className="text-slate-400 px-1">...</span>
                    )}
                  </>
                )}

                {/* Pages around current page */}
                {Array.from({ length: totalPages }, (_, i) => i)
                  .filter(
                    (page) =>
                      page >= currentPage - 2 &&
                      page <= currentPage + 2 &&
                      page >= 0 &&
                      page < totalPages
                  )
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm ${
                        currentPage === page
                          ? 'bg-secondary text-white'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}

                {/* Last page */}
                {currentPage < totalPages - 3 && (
                  <>
                    {currentPage < totalPages - 4 && (
                      <span className="text-slate-400 px-1">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(totalPages - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 text-sm"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </>
            )}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;