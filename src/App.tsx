import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import { 
  ChevronRight, 
  Globe, 
  Users, 
  TrendingUp, 
  MapPin, 
  Building2, 
  Brain,
  Home,
  ArrowRight,
  Star,
  Award,
  Target,
  Zap,
  Camera,
  Mountain,
  Compass,
  Sparkles,
  Play,
  Calendar,
  Heart,
  Shield,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Quote,
  ChevronDown
} from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const heroImages = [
    'https://images.pexels.com/photos/46253/mt-fuji-sea-of-clouds-sunrise-46253.jpeg',
    'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg',
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg'
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: 'インバウンドツアー企画・造成',
      subtitle: '都市部から郊外へと人の流れを生み出すツアーを企画・造成',
      description: '富裕層を対象としたハイエンド向けのカスタムインバウンドツアー。質の高い体験と地域経済の活性化を同時に実現します。',
      icon: <MapPin className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
      features: ['富裕層向けカスタムツアー', '地域経済活性化', '質の高い体験提供']
    },
    {
      title: '地方自治体向けコンサルティング',
      subtitle: 'インバウンドを起点とした観光需要の創出・拡大を支援',
      description: '観光資源の棚卸しからプロモーション戦略の策定、受け入れ体制の整備に至るまで一貫したコンサルティングを提供します。',
      icon: <Building2 className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg',
      features: ['観光資源棚卸し', 'プロモーション戦略', '受け入れ体制整備']
    },
    {
      title: '観光事業者向けDXソリューション',
      subtitle: '最新のデジタルツールやAI技術を活用した業務改善',
      description: '業務効率化、顧客体験の最適化、収益性の向上を実現。実行フェーズまで伴走する支援を提供します。',
      icon: <Brain className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      features: ['AI技術活用', '業務効率化', '収益性向上']
    },
    {
      title: 'カスタム手配旅行',
      subtitle: '訪日外国人および日本人旅行者を対象',
      description: '観光、視察、文化体験など幅広い目的に対応。個人旅行からグループ・企業向けのプライベートツアーまで、地域資源を活かした唯一無二の旅程を企画・造成します。',
      icon: <Users className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
      features: ['個人・グループ対応', '文化体験重視', '唯一無二の旅程']
    },
    {
      title: '空き家活用民泊運営',
      subtitle: '地方に点在する空き家を有効活用',
      description: '民泊としての新たな価値を創出する運営事業。空き家問題の解消と観光振興の両立を実現します。',
      icon: <Home className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      features: ['空き家有効活用', '地域問題解決', '観光振興両立']
    }
  ];

  const executives = [
    {
      name: '希代 翔',
      position: 'CEO',
      image: '/Sho.png',
      background: '旅行代理店勤務した後、Booking.comやMetaをはじめ外資系IT企業にて長年勤務。インバウンド新規事業の戦略立案、自治体へのコンサルティングを得意とし、個人でのコンサルティング実績多数。',
      expertise: ['戦略立案', 'インバウンド事業', '自治体コンサルティング']
    },
    {
      name: '藤本 芳浩',
      position: 'COO, CTO',
      image: '/Yoshi.png',
      background: '大手製造業、大手コンサルティングファームやMicrosoft等での経験を経て参画。顧客管理ツールの販売や、ITソリューションの提案など、IT技術を駆使した業務効率化提案が可能。',
      expertise: ['ITソリューション', '業務効率化', 'システム開発']
    },
    {
      name: '青木 孝嗣',
      position: 'CMO',
      image: '/Taka.png',
      background: 'フィリピン・セブ在住。NGOでの国際協力やBPO業務の管理統括、飲食店経営や社会起業創設など、多岐に渡る経験から、既存概念に囚われない課題解決が可能。',
      expertise: ['国際協力', 'BPO管理', '社会起業']
    },
    {
      name: '岡部 純子',
      position: '役員',
      image: '/Junko.png',
      background: '30年以上に亘りJTBで勤め、フィリピンを始めとする、東南アジア地域やオーストラリアのツアー造成に深い経験を持つ。',
      expertise: ['ツアー造成', '東南アジア', 'オーストラリア']
    },
    {
      name: '藤本 綾乃',
      position: '役員',
      image: '/image.png',
      background: '18歳で単身アメリカNYへ。学位取得、旅行代理店勤務の後、帰国。Booking.comやGoogleなどを経て、2024年Microsoftへ転職。旅行業界とデジタルマーケティング分野を専門とし、幅広い業界の顧客との実績多数。',
      expertise: ['デジタルマーケティング', '旅行業界', '国際経験']
    }
  ];

  const achievements = [
    { 
      number: '500+', 
      label: 'プロジェクト実績', 
      description: '全国各地での成功事例'
    },
    { 
      number: '98%', 
      label: '顧客満足度', 
      description: '継続率業界トップクラス'
    },
    { 
      number: '50+', 
      label: 'パートナー自治体', 
      description: '信頼のネットワーク'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-body">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Mountain className="w-8 h-8 text-rose-600" />
              <span className="text-xl font-light text-gray-900">
                Discovery Hidden Japan
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="#philosophy" 
                className="font-light transition-colors duration-300 hover:text-rose-600 text-gray-700"
              >
                Philosophy
              </a>
              <a 
                href="#services-header" 
                className="font-light transition-colors duration-300 hover:text-rose-600 text-gray-700"
               onClick={(e) => {
                 e.preventDefault();
                 setIsMobileMenuOpen(false);
                 setIsMobileMenuOpen(false);
                 setIsMobileMenuOpen(false);
                 setIsMobileMenuOpen(false);
                 const element = document.getElementById('services-header');
                 if (element) {
                   const offsetTop = element.offsetTop - 120;
                   window.scrollTo({
                     top: offsetTop,
                     behavior: 'smooth'
                   });
                 }
               }}
              >
                Services
              </a>
              <div 
                className="relative"
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
              >
                <button 
                  className="font-light transition-colors duration-300 hover:text-rose-600 flex items-center gap-1 text-gray-700"
                >
                  About
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 transition-all duration-300 ${
                  isAboutDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <a 
                    href="#strengths" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-rose-600 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('strengths');
                      if (element) {
                        const offsetTop = element.offsetTop - 120;
                        window.scrollTo({
                          top: offsetTop,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    Strength
                  </a>
                  <a 
                    href="#executives-header" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-rose-600 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('executives-header');
                      if (element) {
                        const offsetTop = element.offsetTop - 120;
                        window.scrollTo({
                          top: offsetTop,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    Executives
                  </a>
                  <a 
                    href="#company-info" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-rose-600 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('company-info');
                      if (element) {
                        const offsetTop = element.offsetTop - 120;
                        window.scrollTo({
                          top: offsetTop,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    Profile
                  </a>
                  <a 
                    href="#contact" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-rose-600 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('contact');
                      if (element) {
                        const offsetTop = element.offsetTop - 120;
                        window.scrollTo({
                          top: offsetTop,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    Contact
                  </a>
                </div>
              </div>
              <button 
                onClick={() => setIsContactFormOpen(true)}
                className="px-6 py-2 border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300 font-light"
              >
                お問い合わせ
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 transition-colors duration-300 text-gray-900"
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1">
                <div className={`h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`} />
                <div className={`h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`} />
                <div className={`h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}>
            <nav className="flex flex-col gap-4 pt-4 border-t border-gray-200">
              <a 
                href="#philosophy" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-light transition-colors duration-300 hover:text-rose-600 text-gray-700"
              >
                Philosophy
              </a>
              <a 
                href="#services-header" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-light transition-colors duration-300 hover:text-rose-600 text-gray-700"
              >
                Services
              </a>
              <a 
                href="#strengths" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-light transition-colors duration-300 hover:text-rose-600 text-gray-700"
              >
                Strength
              </a>
              <a 
                href="#executives-header" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-light transition-colors duration-300 hover:text-rose-600 text-gray-700"
              >
                Executives
              </a>
              <a 
                href="#company-info" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-light transition-colors duration-300 hover:text-rose-600 text-gray-700"
              >
                Profile
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-light transition-colors duration-300 hover:text-rose-600 text-gray-700"
              >
                Contact
              </a>
              <button 
                onClick={() => {
                  setIsContactFormOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-6 py-2 border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300 font-light"
              >
                お問い合わせ
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Dynamic Background */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Dynamic Background Images */}
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 grayscale"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `scale(1.15) translateY(${scrollY * 0.2}px)`
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/90"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto py-4">
          <div className="mb-12">
            <div className="w-24 h-px bg-rose-600 mx-auto mb-8"></div>
            <p className="text-gray-300 text-sm tracking-[0.4em] uppercase font-light mb-8">
              Discovery Hidden Japan
            </p>
          </div>
          
          <h1 className="hero-title text-8xl md:text-9xl lg:text-[8rem] font-light text-white mb-12 leading-[0.8] tracking-tight">
            <span className="hero-title font-['Klee_One'] font-semibold text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[8rem] leading-[1.1] sm:leading-[1.2] md:leading-[1.5]">本物の日本と<br />
            世界をつなぎ、<br />
            <span className="text-rose-600">
              心に残る旅を創る
            </span>
            </span>
          </h1>
          
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto leading-[1.4] font-bold">
            <span className="font-extrabold">地域の物語を紡ぎ、観光の未来に<br className="hidden md:block" />
            新たな価値を提案します</span>
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-8 justify-center items-center px-4">
            <button className="hero-button group relative bg-rose-600 hover:bg-rose-700 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 transition-all duration-500 flex items-center gap-2 sm:gap-4 hover:gap-6 transform hover:-translate-y-1">
              <span className="text-xs sm:text-sm md:text-lg font-light leading-tight">サービス詳細</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => setIsContactFormOpen(true)}
              className="hero-button group relative border-2 border-white/40 hover:border-white text-white hover:bg-white/10 px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 transition-all duration-500 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-lg font-light leading-tight">
                <Mail className="w-5 h-5" />
                お問い合わせ
              </span>
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center mb-2">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
            <p className="text-white/60 text-xs tracking-widest">SCROLL</p>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section 
        id="philosophy"
        data-animate
        className={`py-32 bg-white relative transition-all duration-1000 ${
          visibleSections.has('philosophy') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-16">
            <p className="text-gray-400 text-sm tracking-[0.3em] uppercase font-light mb-8">
              Our Philosophy
            </p>
            <div className="w-24 h-px bg-rose-600 mx-auto mb-12"></div>
            <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-16 tracking-tight">
              <span className="font-['Klee_One'] font-normal">心と土地を結び、<br />
              <span className="text-rose-600">時を紡ぐ</span>
              </span>
            </h2>
          </div>
          
          <div className="space-y-12 text-left max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed font-normal">
              私たちDiscovery Hidden Japanは、旅人と地域をつなぎ、日本に息づく隠れた美しさと物語を世界に届けます。
            </p>
            
            <div className="w-16 h-px bg-gray-300 my-8"></div>
            
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              観光地化されすぎた風景の陰にある、本物の暮らし、文化、風土との出会いを大切にし、旅の価値を再定義します。
            </p>
            
            <div className="w-16 h-px bg-gray-300 my-8"></div>
            
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              地方と旅人を結ぶ架け橋となり、オーバーツーリズムの緩和や地域創生を軸に社会課題の解決に取り組むことで、単なる観光事業ではない、人と心、地域と世界が織りなす、<span className="text-rose-600 font-normal">新しい時代のツーリズムを提唱</span>します。
            </p>
          </div>
        </div>
      </section>

      {/* Business Overview */}
      <section 
        id="overview"
        data-animate
        className={`py-24 bg-gray-50 transition-all duration-1000 delay-200 ${
          visibleSections.has('overview') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-8 tracking-tight">
            事業概要
          </h2>
          <div className="w-24 h-px bg-rose-600 mx-auto mb-12"></div>
          <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-normal">
            <span className="text-rose-600 font-normal">オーバーツーリズムの緩和</span>および<span className="text-rose-600 font-normal">地方創生の実現</span>を軸に、<br className="hidden md:block" />
            持続可能な観光の未来を創造します
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 mt-20">
            {achievements.map((item, index) => (
              <div 
                key={index} 
                className={`group text-center transition-all duration-700 delay-${index * 100} ${
                  visibleSections.has('overview') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="mb-8">
                  <h3 className="text-6xl md:text-7xl font-normal text-gray-900 mb-4 group-hover:text-rose-600 transition-colors duration-500">
                    {item.number}
                  </h3>
                  <p className="text-xl font-medium text-gray-800 mb-3">{item.label}</p>
                  <p className="text-gray-600 leading-relaxed font-medium">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div 
            id="services-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections.has('services-header') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-8 tracking-tight">
              主要サービス
            </h2>
            <div className="w-24 h-px bg-rose-600 mx-auto mb-12"></div>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              5つの専門領域で、日本の観光業界に革新をもたらします
            </p>
          </div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={index}
                data-animate
                className={`transition-all duration-1000 delay-${index * 100} ${
                  visibleSections.has('services-header')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-20'
                }`}
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                  <div className="lg:w-1/2">
                    <div className="relative h-96 overflow-hidden rounded-lg shadow-2xl group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-rose-600 text-white rounded-lg">
                        {service.icon}
                      </div>
                      <div className="h-px flex-1 bg-gray-200"></div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-normal text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-lg text-rose-600 font-medium mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-xl text-gray-700 leading-relaxed font-medium mb-6">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                          <CheckCircle className="w-4 h-4 text-rose-600" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section
        id="strengths"
        data-animate
        className={`py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-1000 ${
          visibleSections.has('strengths')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-normal mb-8 tracking-tight">
              私たちの強み
            </h2>
            <div className="w-24 h-px bg-rose-600 mx-auto mb-12"></div>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              多様な専門性と実績が生み出す、確かな価値
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="p-6 bg-rose-600 rounded-full group-hover:scale-110 transition-transform duration-500">
                  <Globe className="w-12 h-12" />
                </div>
              </div>
              <h3 className="text-2xl font-medium mb-4">グローバルな視点</h3>
              <p className="text-gray-300 leading-relaxed font-medium">
                外資系IT企業での豊富な経験を活かし、世界基準のサービスを提供
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="p-6 bg-rose-600 rounded-full group-hover:scale-110 transition-transform duration-500">
                  <Brain className="w-12 h-12" />
                </div>
              </div>
              <h3 className="text-2xl font-medium mb-4">最先端技術</h3>
              <p className="text-gray-300 leading-relaxed font-medium">
                AI・DXを活用した業務効率化とデジタルマーケティング戦略
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="p-6 bg-rose-600 rounded-full group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-12 h-12" />
                </div>
              </div>
              <h3 className="text-2xl font-medium mb-4">実践的支援</h3>
              <p className="text-gray-300 leading-relaxed font-medium">
                戦略立案から実行まで、現場に寄り添った伴走型コンサルティング
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Executives Section */}
      <section
        id="executives"
        className="py-32 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            id="executives-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections.has('executives-header')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-8 tracking-tight">
              経営陣紹介
            </h2>
            <div className="w-24 h-px bg-rose-600 mx-auto mb-12"></div>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              多様なバックグラウンドと専門性を持つプロフェッショナル
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((executive, index) => (
              <div
                key={index}
                data-animate
                className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-xl transition-all duration-1000 delay-${index * 100} hover:transform hover:-translate-y-2 ${
                  visibleSections.has('executives-header')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-20'
                }`}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={executive.image}
                    alt={executive.name}
                    className="w-full h-full object-cover"
                    style={
                      executive.name === '希代 翔'
                        ? { objectPosition: 'center 35%' }
                        : executive.name === '藤本 芳浩'
                        ? { objectPosition: 'center 40%' }
                        : {}
                    }
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-light text-white mb-2">{executive.name}</h3>
                  <p className="text-rose-600 font-medium text-lg mb-4">{executive.position}</p>

                  <p className="text-gray-300 leading-relaxed font-normal mb-6">
                    {executive.background}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {executive.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full font-normal">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Information Section */}
      <section 
        id="company-info"
        data-animate
        className={`py-32 bg-gray-50 transition-all duration-1000 ${
          visibleSections.has('company-info') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-8 tracking-tight">
              会社概要
            </h2>
            <div className="w-24 h-px bg-rose-600 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-8 py-6 bg-gray-50 font-medium text-gray-900 w-1/3">
                      会社名
                    </td>
                    <td className="px-8 py-6 text-gray-700 font-medium">
                      Discovery Hidden Japan株式会社
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-8 py-6 bg-gray-50 font-semibold text-gray-900">
                      所在地
                    </td>
                    <td className="px-8 py-6 text-gray-700 font-medium">
                      東京都港区高輪2丁目11番9号
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-8 py-6 bg-gray-50 font-semibold text-gray-900">
                      資本金
                    </td>
                    <td className="px-8 py-6 text-gray-700 font-medium">
                      920万円
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-8 py-6 bg-gray-50 font-semibold text-gray-900">
                      設立
                    </td>
                    <td className="px-8 py-6 text-gray-700 font-medium">
                      2025年7月17日
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-8 py-6 bg-gray-50 font-semibold text-gray-900">
                      代表
                    </td>
                    <td className="px-8 py-6 text-gray-700 font-medium">
                      希代　翔
                    </td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 bg-gray-50 font-semibold text-gray-900">
                      登録資格
                    </td>
                    <td className="px-8 py-6 text-gray-700 font-medium">
                      ＜更新中＞
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact"
        data-animate
        className={`py-32 bg-white transition-all duration-1000 ${
          visibleSections.has('contact') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-8 tracking-tight">
            お問い合わせ
          </h2>
          <div className="w-24 h-px bg-rose-600 mx-auto mb-12"></div>
          <p className="text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
            革新的なソリューションで、日本の観光業界の未来を共に創造します
          </p>
          
          <div className="flex justify-center">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <button 
                onClick={() => setIsContactFormOpen(true)}
                className="group bg-rose-600 hover:bg-rose-700 text-white px-12 py-6 transition-all duration-500 flex items-center gap-4 hover:gap-6 transform hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                お問い合わせフォーム
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <div className="text-center">
                <p className="text-gray-600 mb-2 font-medium">または直接メールでお問い合わせ</p>
                <a 
                  href="mailto:info@discoveryhiddenjapan.com?subject=お問い合わせ&body=お名前:%0D%0A会社名・団体名:%0D%0A電話番号:%0D%0A%0D%0Aお問い合わせ内容:%0D%0A"
                  className="text-rose-600 hover:text-rose-700 font-semibold underline"
                >
                  info@discoveryhiddenjapan.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Mountain className="w-8 h-8 text-rose-600" />
              <h3 className="text-2xl font-normal">Discovery Hidden Japan</h3>
            </div>
            
            <div className="w-24 h-px bg-rose-600 mx-auto mb-8"></div>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              心と土地を結び、時を紡ぐ
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p className="font-medium">&copy; 2024 Discovery Hidden Japan. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </div>
  );
}

export default App;