import React, { useEffect, useRef, useState } from 'react';
import {
  Snowflake,
  Sun,
  Flame,
  Wind,
  ShieldCheck,
  Wrench,
  ShoppingCart,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  ArrowRight,
  Trash2,
  Phone,
  Zap,
} from 'lucide-react';

type Service = {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  priceText: string;
  priceNum: number;
  popular: boolean;
};

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const GlobalStyles = () => (
  <style>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }

    @keyframes float-delayed {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }

    @keyframes pulse-glow-dual {
      0% {
        box-shadow:
          0 0 0 0 rgba(6, 182, 212, 0.4),
          0 0 0 0 rgba(249, 115, 22, 0.4);
      }

      70% {
        box-shadow:
          0 0 0 15px rgba(6, 182, 212, 0),
          0 0 0 15px rgba(249, 115, 22, 0);
      }

      100% {
        box-shadow:
          0 0 0 0 rgba(6, 182, 212, 0),
          0 0 0 0 rgba(249, 115, 22, 0);
      }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-float-delayed {
      animation: float-delayed 7s ease-in-out 3s infinite;
    }

    .pulse-btn {
      animation: pulse-glow-dual 2.5s infinite;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: #0a0f16;
      color: #f8fafc;
      overflow-x: hidden;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }

    .text-gradient-dual {
      background: linear-gradient(to right, #22d3ee, #fb923c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .bg-gradient-dual {
      background: linear-gradient(135deg, #06b6d4, #f97316);
    }

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #0a0f16;
    }

    ::-webkit-scrollbar-thumb {
      background: #1e293b;
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #f97316;
    }
  `}</style>
);

const ScrollReveal = ({
  children,
  delay = 0,
  className = '',
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formState, setFormState] = useState<
    'idle' | 'submitting' | 'success'
  >('idle');

  const [cart, setCart] = useState<Service[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBookSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormState('submitting');

    setTimeout(() => {
      setFormState('success');
      setCart([]);

      setTimeout(() => {
        setFormState('idle');
      }, 4000);
    }, 1500);
  };

  const addToCart = (service: Service) => {
    if (!cart.find((item) => item.id === service.id)) {
      setCart((currentCart) => [...currentCart, service]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.priceNum,
    0
  );

  const servicesData: Service[] = [
    {
      id: 'single',
      icon: <Wind className="w-8 h-8 text-cyan-400" />,
      title: 'Single-Split Installatie',
      desc: 'Koelt & verwarmt 1 ruimte optimaal. Ideaal voor de woonkamer of slaapkamer.',
      priceText: 'Vanaf €1.499',
      priceNum: 1499,
      popular: false,
    },
    {
      id: 'multi',
      icon: <Zap className="w-8 h-8 text-orange-400" />,
      title: 'Multi-Split Installatie',
      desc: 'Koelt & verwarmt meerdere ruimtes met slechts één efficiënte buitenunit.',
      priceText: 'Vanaf €2.499',
      priceNum: 2499,
      popular: true,
    },
    {
      id: 'maint',
      icon: <Wrench className="w-8 h-8 text-slate-300" />,
      title: 'Jaarlijks Onderhoud',
      desc: 'Houdt uw systeem in topconditie voor maximaal rendement in zomer én winter.',
      priceText: '€120 / jaar',
      priceNum: 120,
      popular: false,
    },
    {
      id: 'winter',
      icon: <Flame className="w-8 h-8 text-red-400" />,
      title: 'Winterklaar Check',
      desc: 'Maak uw airco klaar voor het stookseizoen. Inclusief filterreiniging & rendementsmeting.',
      priceText: '€75',
      priceNum: 75,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen relative font-sans selection:bg-orange-500/30">
      <GlobalStyles />

      {/* Achtergrond */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[50%] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-orange-600/10 blur-[160px]" />
      </div>

      {/* Navigatie */}
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0f16]/80 backdrop-blur-lg border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-[#1e293b] overflow-hidden flex items-center justify-center border border-white/10 group-hover:rotate-180 transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-dual opacity-80" />
              <Wind className="w-5 h-5 text-white relative z-10" />
            </div>

            <span className="text-2xl font-bold tracking-tight text-white">
              KTS
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#voordelen"
              className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors"
            >
              Waarom Airco?
            </a>

            <a
              href="#diensten"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Diensten
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors"
            >
              Contact
            </a>

            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />

                <span className="hidden lg:inline text-sm">
                  Boeking
                </span>

                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 lg:right-auto lg:left-3 w-5 h-5 bg-orange-500 text-[10px] font-bold flex items-center justify-center rounded-full text-white shadow-lg">
                    {cart.length}
                  </span>
                )}
              </button>

              <a
                href="#contact"
                className="pulse-btn px-6 py-2.5 rounded-full bg-gradient-dual text-white text-sm font-bold transition-all hover:scale-105"
              >
                Vraag Offerte Aan
              </a>
            </div>
          </div>

          {/* Mobiel menu knop */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            aria-label="Menu openen"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobiel menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#0a0f16]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen
              ? 'max-h-96 py-6'
              : 'max-h-0 py-0'
          }`}
        >
          <div className="px-6 flex flex-col gap-4">
            <a
              href="#voordelen"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300"
            >
              Waarom Airco?
            </a>

            <a
              href="#diensten"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300"
            >
              Diensten
            </a>

            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300"
            >
              Contact
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="text-lg font-medium text-orange-400 text-left flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Winkelwagen ({cart.length})
            </button>

            <div className="h-px bg-white/10 my-2 w-full" />

            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-gradient-dual text-white font-bold"
            >
              Offerte Aanvragen
            </a>
          </div>
        </div>
      </nav>

      {/* Winkelwagen overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Winkelwagen */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0d131f] border-l border-white/10 z-[60] transform transition-transform duration-300 ease-in-out shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col ${
          isCartOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0f16]">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-orange-400" />
            Uw Boeking
          </h2>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Winkelwagen sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 opacity-50">
              <ShoppingCart className="w-16 h-16" />
              <p>Uw winkelwagen is leeg.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="glass-panel p-4 rounded-xl flex items-start justify-between gap-4 border border-white/5 bg-white/[0.02]"
              >
                <div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    {item.title}
                  </h4>

                  <p className="text-orange-400 text-sm font-bold mt-1">
                    €{item.priceNum}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  aria-label={`${item.title} verwijderen`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0a0f16]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-300">
                Totaal (indicatie):
              </span>

              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400">
                €{cartTotal}
              </span>
            </div>

            <a
              href="#contact"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-4 rounded-xl bg-gradient-dual text-white font-bold transition-all flex items-center justify-center gap-2 hover:opacity-90 shadow-lg hover:shadow-orange-500/20"
            >
              Ga naar Afrekenen
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-screen flex items-center z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="text-left z-20">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-white/10">
                <div className="flex items-center gap-1.5">
                  <Snowflake className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-400 text-xs">
                    /
                  </span>
                  <Sun className="w-4 h-4 text-orange-400" />
                </div>

                <span className="text-sm font-medium text-slate-200 tracking-wide">
                  Koelen én Gasloos Verwarmen
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Het perfecte klimaat, <br />
                <span className="text-gradient-dual pb-2 block">
                  het hele jaar door.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-lg">
                Moderne airconditioning is méér dan alleen
                verkoeling in de zomer. Het is een extreem
                zuinige lucht-lucht warmtepomp waarmee u in de
                winter flink bespaart op uw dure gasrekening.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#diensten"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Bekijk Diensten
                  <ArrowRight className="w-5 h-5" />
                </a>

                <a
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-white/10 text-white font-semibold transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5 text-orange-400" />
                  Advies op maat
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Hero visuals */}
          <div className="relative hidden lg:block h-[500px] z-10">
            <ScrollReveal
              delay={400}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-full h-full animate-float">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-dual rounded-full blur-[80px] opacity-40" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-t border-r border-cyan-500/40 rounded-full animate-[spin_12s_linear_infinite]" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-b border-l border-orange-500/40 rounded-full animate-[spin_18s_linear_infinite_reverse]" />

                <div className="absolute top-1/4 right-10 glass-panel p-4 rounded-2xl flex items-center gap-4 animate-float-delayed border-orange-500/20">
                  <div className="bg-orange-500/20 p-3 rounded-xl">
                    <Flame className="text-orange-400 w-6 h-6" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Verwarmen
                    </p>
                    <p className="text-lg font-bold text-white">
                      Gasbesparing
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-1/4 left-10 glass-panel p-4 rounded-2xl flex items-center gap-4 animate-float border-cyan-500/20">
                  <div className="bg-cyan-500/20 p-3 rounded-xl">
                    <Snowflake className="text-cyan-400 w-6 h-6" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Koelen
                    </p>
                    <p className="text-lg font-bold text-white">
                      Razendsnel
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Voordelen */}
      <section
        id="voordelen"
        className="py-24 relative z-10 border-t border-white/5 bg-[#0d131f]/50"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Waarom een moderne Airco?
              </h2>

              <p className="text-slate-400 text-lg">
                De technologie is veranderd. Een
                airconditioner is nu het ultieme,
                energiezuinige klimaatsysteem voor elk seizoen.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal
              delay={100}
              className="glass-panel p-8 rounded-3xl hover:bg-white/[0.05] transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sun className="w-8 h-8 text-orange-400" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                Gasloos Verwarmen
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Een airco is een efficiënte lucht-lucht
                warmtepomp. Hij haalt warmte uit de
                buitenlucht, zelfs als het vriest. Veel
                goedkoper dan stoken op gas!
              </p>
            </ScrollReveal>

            <ScrollReveal
              delay={200}
              className="glass-panel p-8 rounded-3xl hover:bg-white/[0.05] transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Snowflake className="w-8 h-8 text-cyan-400" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                Razendsnel Koelen
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Tijdens hete zomers brengt u de temperatuur
                binnen enkele minuten omlaag. Ontvochtigt direct
                de lucht voor een comfortabel binnenklimaat.
              </p>
            </ScrollReveal>

            <ScrollReveal
              delay={300}
              className="glass-panel p-8 rounded-3xl hover:bg-white/[0.05] transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                F-Gassen Gecertificeerd
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Veiligheid en kwaliteit voorop. Onze monteurs
                zijn volledig gecertificeerd voor het veilig en
                vakkundig installeren van koeltechniek.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Diensten */}
      <section
        id="diensten"
        className="py-24 relative z-10 border-t border-white/5 bg-[#0a0f16]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Kies uw{' '}
                <span className="text-gradient-dual">
                  Oplossing
                </span>
              </h2>

              <p className="text-slate-400 text-lg">
                Heldere tarieven voor installatie en onderhoud.
                Selecteer uw gewenste dienst en voeg deze toe
                aan uw boeking voor een vrijblijvende offerte.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, idx) => (
              <ScrollReveal
                key={service.id}
                delay={idx * 100}
                className="relative group h-full"
              >
                <div
                  className={`h-full flex flex-col glass-panel rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.04] ${
                    service.popular
                      ? 'border-orange-500/40 shadow-[0_0_30px_rgba(249,115,22,0.1)]'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-dual text-white text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap uppercase tracking-wider">
                      Meest Gekozen
                    </div>
                  )}

                  <div className="w-16 h-16 rounded-2xl bg-[#0a0f16] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {service.desc}
                  </p>

                  <div className="pt-6 border-t border-white/10 mt-auto">
                    <p className="text-2xl font-bold text-white mb-4">
                      {service.priceText}
                    </p>

                    <button
                      onClick={() => addToCart(service)}
                      className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        cart.find(
                          (item) => item.id === service.id
                        )
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 cursor-default'
                          : 'bg-white/10 text-white hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {cart.find(
                        (item) => item.id === service.id
                      ) ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Geselecteerd
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Voeg toe aan boeking
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WKO Service & Onderhoud */}
      <section
        id="wko"
        className="py-24 relative z-10 border-t border-white/5 bg-[#0d131f]/40"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-white/10 text-sm font-medium text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  WKO Service &amp; Onderhoud
                </span>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                  Betrouwbaar beheer van uw
                  <span className="text-gradient-dual"> WKO-installatie</span>
                </h2>

                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                  Een WKO-installatie is een belangrijk onderdeel van een duurzaam
                  klimaatsysteem. Regelmatig service en onderhoud helpt om de installatie
                  betrouwbaar te laten functioneren en technische problemen tijdig te signaleren.
                </p>

                <p className="text-slate-400 leading-relaxed">
                  KTS Klimaattechnisch Beheer &amp; Service verzorgt inspectie, periodiek
                  onderhoud, storingsanalyse en technisch advies voor klimaattechnische
                  installaties rondom warmte- en koudeopslag.
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-gradient-dual text-white font-bold hover:opacity-90 transition-all"
                >
                  Plan WKO Service
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="glass-panel p-8 md:p-10 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-6">
                  Onze WKO service
                </h3>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                      <Wrench className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Periodiek onderhoud</h4>
                      <p className="text-sm text-slate-400 mt-1">
                        Controle en onderhoud van relevante onderdelen en systemen.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Storingsanalyse</h4>
                      <p className="text-sm text-slate-400 mt-1">
                        Problemen opsporen en gericht adviseren over herstel en vervolgonderhoud.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Betrouwbare werking</h4>
                      <p className="text-sm text-slate-400 mt-1">
                        Preventief beheer om de continuïteit en technische betrouwbaarheid te ondersteunen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-24 relative border-t border-white/5 bg-[#0d131f]/30"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                Rond uw aanvraag af
              </h2>

              <p className="text-slate-400">
                Vul uw gegevens in en wij nemen zo snel mogelijk
                contact op om de planning te bespreken.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl border-white/10 bg-[#0a0f16]/80">
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/10 rounded-full blur-[60px]" />

              <form
                onSubmit={handleBookSubmit}
                className="space-y-6 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Naam
                    </label>

                    <input
                      type="text"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      placeholder="Jan Jansen"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Telefoonnummer
                    </label>

                    <input
                      type="tel"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      placeholder="06 1234 5678"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Uw Boeking ({cart.length} items)
                    </label>

                    <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-slate-300 flex justify-between items-center cursor-not-allowed">
                      <span>
                        {cart.length > 0
                          ? `${cart.length} diensten geselecteerd`
                          : 'Geen diensten in winkelwagen'}
                      </span>

                      <span className="font-bold text-orange-400">
                        {cartTotal > 0 ? `€${cartTotal}` : ''}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Postcode & Huisnummer
                    </label>

                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      placeholder="1234 AB, 12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Aanvullende informatie
                  </label>

                  <textarea
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none"
                    placeholder="Wilt u vooral koelen, verwarmen, of beide? Heeft u een specifieke ruimte in gedachten?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState !== 'idle'}
                  className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    formState === 'idle'
                      ? 'bg-gradient-dual text-white hover:opacity-90 shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5'
                      : formState === 'submitting'
                        ? 'bg-white/10 text-slate-400 cursor-not-allowed border border-white/10'
                        : 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  }`}
                >
                  {formState === 'idle' && (
                    <>
                      Offerte Aanvragen
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}

                  {formState === 'submitting' && (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}

                  {formState === 'success' && (
                    <>
                      Aanvraag Ontvangen! Wij bellen u snel.
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#05080c] pt-16 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-dual flex items-center justify-center">
                  <Wind className="w-4 h-4 text-white" />
                </div>

                <span className="text-xl font-bold tracking-tight text-white">
                  KTS B.V.
                </span>
                <p className="text-slate-500 text-sm mt-2">
                  Handelsnaam: KTS Klimaattechnisch Beheer &amp; Service
                </p>
              </div>

              <p className="text-slate-500 text-sm max-w-sm mb-6 leading-relaxed">
                Het onderhouden en beheren van klimaattechnische installaties,
                waaronder airconditioning, ventilatiesystemen en warmtepompen.
                Activiteit: installatie van verwarmings- en luchtbehandelingsapparatuur.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                Diensten
              </h4>

              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#diensten"
                    className="text-slate-500 hover:text-orange-400 transition-colors"
                  >
                    Airco als Verwarming
                  </a>
                </li>

                <li>
                  <a
                    href="#diensten"
                    className="text-slate-500 hover:text-orange-400 transition-colors"
                  >
                    Installatie (Split/Multi)
                  </a>
                </li>

                <li>
                  <a
                    href="#diensten"
                    className="text-slate-500 hover:text-orange-400 transition-colors"
                  >
                    Onderhoudscontracten
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                Contact
              </h4>

              <ul className="space-y-3 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  06 33433601
                / 06 45577933
                </li>

                <li>info@klimaattech.nl</li>
                <li>Mr. Arend van der Woudenslaan 36</li>
                <li>3076 PP, Rotterdam</li>

                <li className="pt-2 flex flex-col gap-1">
                  <span className="text-orange-500/70">
                    KVK: 42171844
                  </span>

                  <span className="text-emerald-500/70 text-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    BRL100 F-Gassen
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <p>
              &copy; {new Date().getFullYear()} KTS B.V.
              Alle rechten voorbehouden.
            </p>

            <div className="flex gap-6">
              <a
                href="/Climacare/privacy.html"
                className="hover:text-white transition-colors"
              >
                Privacybeleid
              </a>

              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Algemene Voorwaarden
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}