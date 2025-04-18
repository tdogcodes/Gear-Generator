"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface GearProps {
  color: string;
  size: number;
  teethCount: number;
  rotationSpeed: number;
  clockwise: boolean;
}

export default function Gear({ color, size, teethCount, rotationSpeed, clockwise }: GearProps) {
  // Generate CSS for gear teeth
  const gearTeethStyles = useMemo(() => {
    const teethStyles = [];
    const angleIncrement = 360 / teethCount;
    const toothWidth = Math.min(360 / teethCount * 0.4, 20);
    const toothHeight = size * 0.12;
    
    for (let i = 0; i < teethCount; i++) {
      const angle = i * angleIncrement;
      teethStyles.push(`
        .gear-tooth-${i} {
          position: absolute;
          width: ${toothWidth}px;
          height: ${toothHeight}px;
          background-color: ${color};
          top: 50%;
          left: 50%;
          transform-origin: 50% ${size / 1.61}px;
          transform: translate(-50%, -${size / 1.61}px) rotate(${angle}deg);
          clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
          z-index: 1;
        }
      `);
    }
    
    return teethStyles.join("\n");
  }, [color, size, teethCount]);

  // Animation duration based on rotationSpeed
  const duration = 60 / rotationSpeed;
  
  return (
    <div className="gear-container relative inline-block">
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(${clockwise ? 360 : -360}deg);
          }
        }
        
        .gear {
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);
          animation: spin ${duration}s linear infinite;
        }
        
        .gear::before {
          content: '';
          position: absolute;
          width: ${size * 0.2}px;
          height: ${size * 0.2}px;
          background: radial-gradient(
            circle at center,
            #1e293b,
            ${color}
          );
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          z-index: 3;
        }
        
        .gear::after {
          content: '';
          position: absolute;
          width: ${size * 0.5}px;
          height: ${size * 0.5}px;
          background: 
            radial-gradient(
              circle at center,
              rgba(255, 255, 255, 0.15),
              transparent 70%
            ),
            ${color};
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
          z-index: 2;
        }
        
        .gear-center {
          position: absolute;
          width: ${size * 0.15}px;
          height: ${size * 0.15}px;
          background: #e2e8f0;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
          z-index: 4;
        }
        
        .gear-center::after {
          content: '';
          position: absolute;
          width: ${size * 0.08}px;
          height: ${size * 0.08}px;
          background: #334155;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
        }
        
        ${gearTeethStyles}
      `}</style>
      
      <div className={cn("gear", "relative")}>
        {Array.from({ length: teethCount }).map((_, i) => (
          <div key={i} className={`gear-tooth-${i}`} />
        ))}
        <div className="gear-center" />
      </div>
    </div>
  );
}