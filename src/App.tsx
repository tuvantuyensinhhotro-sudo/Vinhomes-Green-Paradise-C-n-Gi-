import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Waves, 
  Trees, 
  Building2, 
  ChevronRight, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Star,
  Maximize2,
  Compass
} from 'lucide-react';

// --- Constants & Data ---

const PROJECT_INFO = {
  name: "Vinhomes Green Paradise",
  location: "Cần Giờ, TP. Hồ Chí Minh",
  developer: "Vinhomes (Vingroup)",
  scale: "2.870 ha",
  investment: "Hơn 10 tỷ USD",
  highlights: [
    "Đại đô thị lấn biển quy mô nhất Việt Nam",
    "Hệ sinh thái tiện ích chuẩn quốc tế",
    "Vị trí chiến lược cửa ngõ biển Đông",
    "Không gian sống xanh, nghỉ dưỡng thượng lưu"
  ]
};

const NAV_LINKS = [
  { name: "Tổng quan", href: "#overview" },
  { name: "Vị trí", href: "#location" },
  { name: "Tiện ích", href: "#amenities" },
  { name: "Sản phẩm", href: "#products" },
  { name: "Đăng ký", href: "#contact" }
];

const AMENITIES = [
  {
    title: "Biển hồ nhân tạo",
    desc: "Quy mô hàng chục hecta với làn nước trong xanh và bãi cát trắng mịn.",
    icon: Waves,
    image: "https://picsum.photos/seed/ocean/800/600"
  },
  {
    title: "Công viên rừng ngập mặn",
    desc: "Bảo tồn hệ sinh thái tự nhiên, mang lại lá phổi xanh cho toàn đô thị.",
    icon: Trees,
    image: "https://picsum.photos/seed/forest/800/600"
  },
  {
    title: "Bến du thuyền 5 sao",
    desc: "Nơi neo đậu của những du thuyền sang trọng, khẳng định đẳng cấp chủ nhân.",
    icon: Compass,
    image: "https://picsum.photos/seed/yacht/800/600"
  },
  {
    title: "Trung tâm thương mại",
    desc: "Hội tụ các thương hiệu xa xỉ hàng đầu thế giới.",
    icon: Building2,
    image: "https://picsum.photos/seed/mall/800/600"
  }
];

const PRODUCTS = [
  {
    type: "Biệt thự đơn lập",
    size: "300m² - 1000m²",
    features: "View biển trực diện, hồ bơi riêng",
    image: "https://picsum.photos/seed/villa1/800/1000"
  },
  {
    type: "Shophouse biển",
    size: "120m² - 250m²",
    features: "Vị trí kinh doanh đắc địa, sầm uất",
    image: "https://picsum.photos/seed/shop/800/1000"
  },
  {
    type: "Căn hộ cao cấp",
    size: "45m² - 150m²",
    features: "Thiết kế hiện đại, tối ưu tầm nhìn",
    image: "https://picsum.photos/seed/apt/800/1000"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-dark flex items-center justify-center rounded-full">
            <span className="text-brand-gold font-serif text-xl font-bold">V</span>
          </div>
          <span className={`font-serif text-2xl tracking-widest uppercase ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>
            Green Paradise
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm uppercase tracking-widest transition-colors hover:text-brand-gold ${isScrolled ? 'text-brand-dark' : 'text-white/80'}`}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-brand-gold text-white px-6 py-2 rounded-full text-sm uppercase tracking-widest hover:bg-brand-gold/90 transition-all">
            Nhận báo giá
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className={isScrolled ? 'text-brand-dark' : 'text-white'} /> : <Menu className={isScrolled ? 'text-brand-dark' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-cream border-t border-brand-dark/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-brand-dark text-lg font-serif"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/can-gio-paradise/1920/1080" 
          alt="Vinhomes Green Paradise" 
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 luxury-gradient" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-brand-gold uppercase tracking-[0.3em] text-sm mb-6 block font-medium">
            Kiệt tác lấn biển tầm vóc quốc tế
          </span>
          <h1 className="text-white text-6xl md:text-8xl font-light leading-tight mb-8">
            Vinhomes <br />
            <span className="italic font-serif">Green Paradise</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Nơi giao thoa giữa thiên nhiên thuần khiết và đẳng cấp sống thượng lưu tại Cần Giờ - Lá phổi xanh của Sài Gòn.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-brand-gold text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-brand-gold/90 transition-all flex items-center justify-center gap-2 group">
              Khám phá ngay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/30 text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              Xem Brochure
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] uppercase tracking-widest">Cuộn để khám phá</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </div>
    </section>
  );
};

const Overview = () => {
  return (
    <section id="overview" className="py-24 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold uppercase tracking-widest text-xs mb-4 block">Tổng quan dự án</span>
            <h2 className="text-4xl md:text-5xl text-brand-dark mb-8 leading-tight">
              Tầm vóc của một <br /> <span className="italic">Siêu đô thị biển</span>
            </h2>
            <p className="text-brand-dark/70 leading-relaxed mb-8">
              Vinhomes Green Paradise Cần Giờ là dự án lấn biển quy mô lớn nhất Việt Nam, được định hướng trở thành trung tâm du lịch, nghỉ dưỡng và đô thị thông minh đẳng cấp thế giới. Với tổng diện tích lên đến 2.870 ha, dự án không chỉ thay đổi diện mạo Cần Giờ mà còn là biểu tượng mới của sự thịnh vượng.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block text-3xl font-serif text-brand-gold mb-1">2.870 ha</span>
                <span className="text-xs uppercase tracking-widest text-brand-dark/50">Quy mô diện tích</span>
              </div>
              <div>
                <span className="block text-3xl font-serif text-brand-gold mb-1">10 Tỷ USD</span>
                <span className="text-xs uppercase tracking-widest text-brand-dark/50">Vốn đầu tư</span>
              </div>
              <div>
                <span className="block text-3xl font-serif text-brand-gold mb-1">5 Phân khu</span>
                <span className="text-xs uppercase tracking-widest text-brand-dark/50">Chủ đề đa dạng</span>
              </div>
              <div>
                <span className="block text-3xl font-serif text-brand-gold mb-1">2025</span>
                <span className="text-xs uppercase tracking-widest text-brand-dark/50">Khởi công dự kiến</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/5] rounded-t-full overflow-hidden border-[12px] border-white shadow-2xl">
              <img 
                src="https://picsum.photos/seed/luxury-resort/800/1000" 
                alt="Luxury Lifestyle" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-brand-dark text-white p-8 rounded-2xl shadow-xl hidden md:block max-w-xs">
              <ShieldCheck className="text-brand-gold mb-4 w-8 h-8" />
              <p className="text-sm font-light italic">"Cam kết chất lượng và tiến độ từ tập đoàn Vingroup - Nhà phát triển bất động sản số 1 Việt Nam."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Amenities = () => {
  return (
    <section id="amenities" className="py-24 bg-brand-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-brand-gold uppercase tracking-widest text-xs mb-4 block">Đặc quyền thượng lưu</span>
          <h2 className="text-4xl md:text-5xl mb-6">Hệ sinh thái tiện ích <span className="italic">All-in-one</span></h2>
          <div className="w-24 h-px bg-brand-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AMENITIES.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-6 left-6 right-6">
                  <item.icon className="text-brand-gold mb-4 w-6 h-6" />
                  <h3 className="text-xl mb-2">{item.title}</h3>
                </div>
              </div>
              <p className="text-sm text-white/60 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  return (
    <section id="products" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-brand-gold uppercase tracking-widest text-xs mb-4 block">Sản phẩm tiêu biểu</span>
            <h2 className="text-4xl md:text-5xl text-brand-dark">Không gian sống <br /> <span className="italic">Độc bản</span></h2>
          </div>
          <button className="text-brand-dark border-b border-brand-dark pb-1 text-sm uppercase tracking-widest hover:text-brand-gold hover:border-brand-gold transition-all">
            Xem tất cả mặt bằng
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {PRODUCTS.map((product, idx) => (
            <motion.div 
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
              whileHover={{ y: -10 }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.type} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl text-brand-dark mb-2">{product.type}</h3>
                <div className="flex items-center gap-4 text-sm text-brand-dark/50 mb-4">
                  <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {product.size}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4" /> Cao cấp</span>
                </div>
                <p className="text-brand-dark/70 text-sm mb-6 font-light italic">
                  {product.features}
                </p>
                <button className="w-full py-3 border border-brand-dark/10 rounded-full text-xs uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all">
                  Chi tiết sản phẩm
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: 'Biệt thự đơn lập'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showQR, setShowQR] = useState(false);
  const [transactionCode, setTransactionCode] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'UNPAID' | 'PAID' | 'MANUAL'>('UNPAID');
  const [timer, setTimer] = useState(0);
  const [showManualButton, setShowManualButton] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timerInterval: NodeJS.Timeout;

    if (showQR && paymentStatus === 'UNPAID') {
      // Start 1 minute timer
      timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev >= 60) {
            setShowManualButton(true);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      // Poll every 5 seconds
      interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/check-status/${transactionCode}`);
          const data = await response.json();
          if (data.status === 'PAID') {
            setPaymentStatus('PAID');
            clearInterval(interval);
            clearInterval(timerInterval);
          }
        } catch (error) {
          console.error('Error checking status:', error);
        }
      }, 5000);
    }

    return () => {
      clearInterval(interval);
      clearInterval(timerInterval);
    };
  }, [showQR, transactionCode, paymentStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimer(0);
    setShowManualButton(false);
    setPaymentStatus('UNPAID');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setTransactionCode(result.data.paymentCode);
        setStatus('success');
        setShowQR(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Lỗi gửi form:', error);
      setStatus('error');
    }
  };

  const handleManualConfirm = () => {
    setPaymentStatus('MANUAL');
  };

  const qrUrl = `https://qr.sepay.vn/img?bank=Sacombank&acc=060069105575&template=compact&amount=10000&des=${transactionCode}`;
  const zaloGroupUrl = "https://zalo.me/g/qnucsm452";

  return (
    <section id="contact" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 -skew-x-12 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-6xl mb-8">Bắt đầu hành trình <br /> <span className="italic text-brand-gold">Thịnh vượng</span></h2>
            <p className="text-white/60 mb-12 font-light leading-relaxed max-w-md">
              Để lại thông tin để nhận bảng giá chi tiết, chính sách bán hàng mới nhất và lời mời tham quan dự án trực tiếp.
              <br /><br />
              <span className="text-brand-gold font-medium italic">
                * Sau khi đăng ký, bạn sẽ được mời vào nhóm Zalo riêng tư để được hỗ trợ 1:1 nhanh nhất. 
                Hệ thống sẽ gửi email và tin nhắn Zalo xác thực ngay lập tức.
              </span>
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/40">Hotline 24/7</span>
                  <a href="tel:0356156688" className="text-xl hover:text-brand-gold transition-colors">0356.156.688</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/40">Email tư vấn</span>
                  <a href="mailto:hungnpv@gmail.com" className="text-xl hover:text-brand-gold transition-colors">hungnpv@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/40">Văn phòng</span>
                  <span className="text-xl">Cần Giờ, TP. Hồ Chí Minh</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-2xl relative">
            <h3 className="text-2xl text-brand-dark mb-8 text-center">Đăng ký tư vấn</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-dark/40 mb-2">Họ và tên</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-brand-cream/50 border-none rounded-xl px-6 py-4 text-brand-dark focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-dark/40 mb-2">Số điện thoại</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="090x xxx xxx"
                  className="w-full bg-brand-cream/50 border-none rounded-xl px-6 py-4 text-brand-dark focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-dark/40 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@gmail.com"
                  className="w-full bg-brand-cream/50 border-none rounded-xl px-6 py-4 text-brand-dark focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-dark/40 mb-2">Sản phẩm quan tâm</label>
                <select 
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full bg-brand-cream/50 border-none rounded-xl px-6 py-4 text-brand-dark focus:ring-2 focus:ring-brand-gold outline-none transition-all appearance-none"
                >
                  <option>Biệt thự đơn lập</option>
                  <option>Shophouse</option>
                  <option>Căn hộ cao cấp</option>
                </select>
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-dark text-white py-5 rounded-xl uppercase tracking-widest text-sm font-medium hover:bg-brand-gold transition-all shadow-lg shadow-brand-dark/20 disabled:opacity-50"
              >
                {status === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu ngay'}
              </button>
              
              {status === 'error' && (
                <p className="text-red-500 text-center text-sm font-medium">
                  Có lỗi xảy ra. Vui lòng thử lại sau hoặc gọi hotline.
                </p>
              )}

              <p className="text-[10px] text-center text-brand-dark/30 italic">
                * Phí đăng ký tư vấn chuyên sâu: 10.000đ
              </p>
            </form>

            {/* QR Code Modal Overlay */}
            <AnimatePresence>
              {showQR && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-3xl z-20 flex flex-col items-center justify-center p-8 text-brand-dark"
                >
                  <button 
                    onClick={() => {
                      setShowQR(false);
                      setStatus('idle');
                      setFormData({ name: '', phone: '', email: '', product: 'Biệt thự đơn lập' });
                    }}
                    className="absolute top-6 right-6 p-2 hover:bg-brand-cream rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {paymentStatus === 'UNPAID' ? (
                    <>
                      <div className="text-center mb-6">
                        <h4 className="text-xl font-semibold mb-2">Thanh toán đăng ký</h4>
                        <p className="text-sm text-brand-dark/60">Vui lòng quét mã QR để hoàn tất</p>
                      </div>

                      <div className="bg-brand-cream p-4 rounded-2xl mb-6 shadow-inner relative">
                        <img 
                          src={qrUrl} 
                          alt="Payment QR Code" 
                          className="w-64 h-64 object-contain rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-[8px] px-3 py-1 rounded-full animate-pulse">
                          Đang chờ thanh toán...
                        </div>
                      </div>

                      <div className="w-full space-y-3 text-sm mb-6">
                        <div className="flex justify-between border-b border-brand-dark/10 pb-2">
                          <span className="text-brand-dark/60">Số tiền:</span>
                          <span className="font-bold text-brand-gold text-lg">10.000đ</span>
                        </div>
                        <div className="flex justify-between border-b border-brand-dark/10 pb-2">
                          <span className="text-brand-dark/60">Nội dung:</span>
                          <span className="font-mono font-bold">{transactionCode}</span>
                        </div>
                      </div>

                      {showManualButton && (
                        <button 
                          onClick={handleManualConfirm}
                          className="w-full py-3 border-2 border-brand-gold text-brand-gold rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-brand-gold hover:text-white transition-all mb-4"
                        >
                          Xác nhận đã thanh toán
                        </button>
                      )}

                      <p className="text-[10px] text-center text-brand-dark/40 italic">
                        Hệ thống sẽ tự động xác nhận sau khi nhận được thanh toán.
                      </p>
                    </>
                  ) : paymentStatus === 'PAID' ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-10 h-10" />
                      </div>
                      <h4 className="text-2xl font-serif mb-4">Chúc mừng bạn!</h4>
                      <p className="text-brand-dark/70 mb-8 leading-relaxed">
                        Thanh toán của bạn đã được xác nhận thành công. <br />
                        Chào mừng bạn đến với cộng đồng cư dân tinh hoa.
                      </p>
                      <a 
                        href={zaloGroupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-xl uppercase tracking-widest text-sm font-medium hover:bg-brand-gold transition-all shadow-lg"
                      >
                        Tham gia nhóm Zalo ngay <ArrowRight className="w-4 h-4" />
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                        <Compass className="w-10 h-10" />
                      </div>
                      <h4 className="text-xl font-serif mb-4">Đã ghi nhận yêu cầu</h4>
                      <p className="text-brand-dark/70 mb-8 leading-relaxed text-sm">
                        Chúng tôi sẽ kiểm tra giao dịch của bạn thủ công và duyệt bạn vào nhóm sớm nhất có thể.
                        <br /><br />
                        Bạn vẫn có thể nhấn vào nút bên dưới để gửi yêu cầu tham gia nhóm trước.
                      </p>
                      <a 
                        href={zaloGroupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark px-8 py-4 rounded-xl uppercase tracking-widest text-sm font-medium hover:bg-brand-dark hover:text-white transition-all"
                      >
                        Vào nhóm Zalo <ArrowRight className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-cream py-12 border-t border-brand-dark/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-dark flex items-center justify-center rounded-full">
            <span className="text-brand-gold font-serif text-sm font-bold">V</span>
          </div>
          <span className="font-serif text-lg tracking-widest uppercase text-brand-dark">
            Green Paradise
          </span>
        </div>
        
        <div className="text-[10px] uppercase tracking-widest text-brand-dark/40">
          © {new Date().getFullYear()} Vinhomes Green Paradise. All Rights Reserved.
        </div>

        <div className="flex gap-6">
          {['Facebook', 'Youtube', 'Zalo'].map(social => (
            <a key={social} href="#" className="text-[10px] uppercase tracking-widest text-brand-dark/60 hover:text-brand-gold transition-colors">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="selection:bg-brand-gold selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <Amenities />
        <Products />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
