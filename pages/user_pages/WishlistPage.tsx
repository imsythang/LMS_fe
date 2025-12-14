import { Filter, Heart, Trash2 } from 'lucide-react';
import { Badge, Button, StarRating } from '../../components/ui';

const WishlistItem = ({
  title,
  author,
  rating,
  image,
  status,
  category,
}: any) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow relative group">
    <div className="w-full sm:w-24 h-36 bg-gray-100 rounded flex-shrink-0">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover rounded"
      />
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex gap-2 mb-1">
            <Badge variant="secondary" className="text-[10px] py-0">
              {category}
            </Badge>
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-2">{author}</p>
          <StarRating rating={rating} size={14} />
        </div>
        <button className="text-gray-400 hover:text-red-500 p-1">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          {status === 'available' ? (
            <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">
              Có sẵn
            </span>
          ) : (
            <span className="text-orange-600 text-xs font-bold bg-orange-50 px-2 py-1 rounded">
              Đang mượn hết
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Xem chi tiết
          </Button>
          {status === 'available' && <Button size="sm">Đặt trước</Button>}
        </div>
      </div>
    </div>
  </div>
);

const WishlistPage = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Heart className="mr-2 text-red-500 fill-red-500" /> Wishlist của
            bạn
          </h1>
          <p className="text-gray-500 text-sm">
            Quản lý danh sách sách yêu thích
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter size={14} className="mr-1" /> Lọc
          </Button>
          <select className="border border-gray-300 rounded-md text-sm p-1.5 bg-white">
            <option>Mới nhất</option>
            <option>Có sẵn</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Badge
          variant="outline"
          className="bg-white px-3 py-1 cursor-pointer border-red-200 text-red-600 font-bold"
        >
          ♥ 8 sách
        </Badge>
        <Badge
          variant="outline"
          className="bg-white px-3 py-1 cursor-pointer hover:border-green-300"
        >
          ✔ 5 có sẵn
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WishlistItem
          title="Machine Learning cơ bản"
          author="Andrew Ng"
          rating={4.8}
          status="available"
          category="Trí tuệ nhân tạo"
          image="https://m.media-amazon.com/images/I/61f5XjIRWHL._AC_UF1000,1000_QL80_.jpg"
        />
        <WishlistItem
          title="Deep Learning for Computer Vision"
          author="Ian Goodfellow"
          rating={4.9}
          status="available"
          category="Deep Learning"
          image="https://m.media-amazon.com/images/I/61q3Kk+yRSL._AC_UF1000,1000_QL80_.jpg"
        />
        <WishlistItem
          title="Python for Data Analysis"
          author="Wes McKinney"
          rating={4.7}
          status="available"
          category="Data Science"
          image="https://m.media-amazon.com/images/I/71951W96oWL._AC_UF1000,1000_QL80_.jpg"
        />
        <WishlistItem
          title="Introduction to Algorithms"
          author="Thomas H. Cormen"
          rating={4.6}
          status="loaned"
          category="Algorithms"
          image="https://m.media-amazon.com/images/I/61MhLhF7LzL._AC_UF1000,1000_QL80_.jpg"
        />
        <WishlistItem
          title="Cloud Architecture Patterns"
          author="Bill Wilder"
          rating={4.5}
          status="available"
          category="Cloud Computing"
          image="https://m.media-amazon.com/images/I/71f743sOPoL._AC_UF1000,1000_QL80_.jpg"
        />
        <WishlistItem
          title="Clean Code: A Handbook"
          author="Robert C. Martin"
          rating={4.9}
          status="available"
          category="Software Engineering"
          image="https://m.media-amazon.com/images/I/61f5XjIRWHL._AC_UF1000,1000_QL80_.jpg"
        />
        <WishlistItem
          title="Database System Concepts"
          author="Abraham Silberschatz"
          rating={4.4}
          status="loaned"
          category="Database"
          image="https://m.media-amazon.com/images/I/81+N4+nK6gL._AC_UF1000,1000_QL80_.jpg"
        />
        <WishlistItem
          title="Network Security Essentials"
          author="William Stallings"
          rating={4.3}
          status="available"
          category="Cybersecurity"
          image="https://m.media-amazon.com/images/I/71J19-p3B6L._AC_UF1000,1000_QL80_.jpg"
        />
      </div>
    </div>
  );
};

export default WishlistPage;
