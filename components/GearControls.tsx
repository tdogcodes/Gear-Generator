"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface GearControlsProps {
  gearProps: {
    color: string;
    size: number;
    teethCount: number;
    rotationSpeed: number;
    clockwise: boolean;
  };
  updateGearProps: (props: Partial<typeof gearProps>) => void;
}

const predefinedColors = [
  "#F97316", // Orange
  "#2563EB", // Blue
  "#10B981", // Green
  "#EC4899", // Pink
  "#8B5CF6", // Purple
  "#D1D5DB", // Silver
  "#FDE047", // Yellow
  "#F43F5E", // Red
];

export default function GearControls({ gearProps, updateGearProps }: GearControlsProps) {
  const handleTeethChange = (value: number[]) => {
    updateGearProps({ teethCount: value[0] });
  };

  const handleSizeChange = (value: number[]) => {
    updateGearProps({ size: value[0] });
  };

  const handleSpeedChange = (value: number[]) => {
    updateGearProps({ rotationSpeed: value[0] });
  };

  const handleColorChange = (color: string) => {
    updateGearProps({ color });
  };

  const handleDirectionChange = (value: boolean) => {
    updateGearProps({ clockwise: value });
  };

  return (
    <div className="bg-slate-800/80 p-6 rounded-xl shadow-lg border border-slate-700 text-white">
      <h2 className="text-2xl font-bold mb-6">Gear Controls</h2>
      
      <div className="space-y-6">
        {/* Color Control */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="color" className="text-lg">Color</Label>
            <Input 
              id="color" 
              type="color" 
              value={gearProps.color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-16 h-8 rounded cursor-pointer bg-transparent border-slate-600"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={cn(
                  "w-8 h-8 rounded-full transition-all",
                  gearProps.color === color ? "ring-2 ring-white ring-offset-2 ring-offset-slate-800" : "hover:scale-110"
                )}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>
        
        {/* Size Control */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="size" className="text-lg">Size</Label>
            <span className="text-sm text-slate-300">{gearProps.size}px</span>
          </div>
          <Slider
            id="size"
            value={[gearProps.size]}
            min={120}
            max={360}
            step={10}
            onValueChange={handleSizeChange}
            className="w-full"
          />
        </div>
        
        {/* Teeth Count Control */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="teeth" className="text-lg">Teeth Count</Label>
            <span className="text-sm text-slate-300">{gearProps.teethCount}</span>
          </div>
          <Slider
            id="teeth"
            value={[gearProps.teethCount]}
            min={6}
            max={24}
            step={1}
            onValueChange={handleTeethChange}
            className="w-full"
          />
        </div>
        
        {/* Rotation Speed Control */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="speed" className="text-lg">Rotation Speed</Label>
            <span className="text-sm text-slate-300">{gearProps.rotationSpeed} RPM</span>
          </div>
          <Slider
            id="speed"
            value={[gearProps.rotationSpeed]}
            min={1}
            max={30}
            step={1}
            onValueChange={handleSpeedChange}
            className="w-full"
          />
        </div>
        
        {/* Direction Control */}
        <div className="flex items-center justify-between">
          <Label htmlFor="direction" className="text-lg">Clockwise Rotation</Label>
          <Switch
            id="direction"
            checked={gearProps.clockwise}
            onCheckedChange={handleDirectionChange}
          />
        </div>
      </div>
    </div>
  );
}