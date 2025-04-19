"use client";

import { useState } from "react";
import Gear from "@/components/Gear";
import GearControls from "@/components/GearControls";

export default function GearCanvas() {
  const [gearProps, setGearProps] = useState({
    color: "#F97316", // Orange color
    size: 240,
    teethCount: 12,
    rotationSpeed: 10,
    clockwise: true,
  });

  const updateGearProps = (newProps: Partial<typeof gearProps>) => {
    setGearProps((prev) => ({ ...prev, ...newProps }));
  };

  type GearControlsProps = {
    gearProps: {
      color: string;
      size: number;
      teethCount: number;
      rotationSpeed: number;
      clockwise: boolean;
    };
    updateGearProps: (newProps: Partial<GearControlsProps["gearProps"]>) => void;
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex-1 flex justify-center items-center p-8 bg-slate-800/80 rounded-xl shadow-lg border border-slate-700 min-h-[400px]">
          <Gear {...gearProps} />
        </div>
        
        <div className="flex-1 w-full">
          <GearControls gearProps={gearProps} updateGearProps={updateGearProps} />
        </div>
      </div>
      
      <div className="mt-8 text-center text-white/70 text-sm">
        <p>Built with Next.js and pure CSS - no SVGs or images used!</p>
      </div>
    </div>
  );
}