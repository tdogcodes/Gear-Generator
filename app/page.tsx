import GearCanvas from '@/components/GearCanvas';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-slate-900 to-slate-800">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Interactive Mechanical Gear</h1>
      <GearCanvas />
    </main>
  );
}