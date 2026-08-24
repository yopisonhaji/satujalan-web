"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MenuItem3DProps {
  href: string;
  name: string;
  icon: React.ElementType;
  isActive: boolean;
}

export default function MenuItem3D({ href, name, icon: Icon, isActive }: MenuItem3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for the mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Map mouse position to rotation (-15 to 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Glow position state
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate relative mouse position (0 to 1)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    
    setGlowPos({ x: (mouseX / width) * 100, y: (mouseY / height) * 100 });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1000px" }} className="w-full">
      <Link href={href} className="block w-full">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className={cn(
            "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 overflow-hidden w-full group",
            isActive
              ? "bg-[#111] border border-blue-500/30 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
          )}
        >
          {/* Dynamic Hover Glow */}
          <div
            className={cn(
              "absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none",
              isHovering || isActive ? "opacity-100" : "opacity-0"
            )}
            style={{
              background: `radial-gradient(100px circle at ${glowPos.x}% ${glowPos.y}%, rgba(59, 130, 246, ${isActive ? '0.2' : '0.15'}), transparent 100%)`
            }}
          />

          {/* Active indicator line */}
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-blue-500 rounded-r-md z-0 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          )}

          {/* Content with 3D Z-translation */}
          <div 
            className="relative z-10 flex items-center gap-3 w-full"
            style={{ 
              transform: isHovering ? "translateZ(30px)" : "translateZ(0px)", 
              transition: "transform 0.2s ease-out" 
            }}
          >
            <div className={cn(
              "p-1.5 rounded-lg transition-all duration-300",
              isActive 
                ? "bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110" 
                : "group-hover:bg-white/10 group-hover:text-blue-300"
            )}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="font-medium text-[13px] tracking-wide">{name}</span>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
