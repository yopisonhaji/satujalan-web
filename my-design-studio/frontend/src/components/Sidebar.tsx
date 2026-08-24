"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import MenuItem3D from "@/components/MenuItem3D";
import { 
  Sparkles, 
  LayoutGrid, 
  Image as ImageIcon, 
  PlaySquare, 
  Utensils, 
  Shirt, 
  Megaphone,
  Layers, 
  Settings,
  User,
  Zap,
  Film,
  CircleDollarSign,
  MonitorSmartphone,
  Globe
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

type MenuItem = {
  name: string;
  icon: React.ElementType;
  mode?: string;
  path?: string;
};

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentMode = searchParams.get("mode") || "storyboard";
  const { t: globalT, language, setLanguageSheetOpen } = useLanguage();
  const t = globalT.sidebar;

  const menuItems: MenuItem[] = [
    { name: t.storyboard, icon: Film, mode: "storyboard" },
    { name: t.logo, icon: ImageIcon, mode: "logo" },
    { name: t.grid9, icon: LayoutGrid, mode: "9-feed" },
    { name: t.ads, icon: Megaphone, mode: "ads" },
    { name: t.youtube, icon: PlaySquare, mode: "youtube" },
    { name: t.review, icon: CircleDollarSign, mode: "review" },
    { name: t.tryon, icon: Shirt, mode: "tryon" },
    { name: t.carousel, icon: Layers, mode: "carousel" },
    { name: t.designFeeds, icon: MonitorSmartphone, mode: "design-feeds" },
    { name: t.fnb, icon: Utensils, mode: "fnb" },
    { name: t.settings, icon: Settings, mode: "settings" },
  ];

  return (
    <motion.aside 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full md:w-64 glass-panel border-r border-white/5 flex flex-col h-full shrink-0 z-10"
    >
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.webp" 
            alt="SJ Design Logo" 
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white bg-clip-text">SJ Design</span>
            <span className="text-[10px] text-gray-400 font-medium">Powered by satujalan.id</span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar" data-lenis-prevent>
        <motion.ul 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          className="space-y-1 px-3 text-sm font-medium"
        >
          {menuItems.map((item, index) => {
            const isActive = item.path 
              ? pathname === item.path 
              : pathname === "/editor" && currentMode === item.mode;
              
            const targetPath = item.path || `/editor?mode=${item.mode}`;
            const Icon = item.icon;
            
            return (
              <motion.li 
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <MenuItem3D 
                  href={targetPath}
                  name={item.name}
                  icon={Icon}
                  isActive={isActive}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>
      
      {/* Desktop Language Indicator (Bottom) */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <MagneticButton 
          onClick={() => setLanguageSheetOpen(true)}
          className="group w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
          title="Change Application Language"
          magneticIntensity={10}
        >
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-blue-400 group-hover:animate-pulse" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ar' ? 'العربية' : language === 'en' ? 'English' : 'Indonesia'}
            </span>
          </div>
        </MagneticButton>
      </div>

    </motion.aside>
  );
}
