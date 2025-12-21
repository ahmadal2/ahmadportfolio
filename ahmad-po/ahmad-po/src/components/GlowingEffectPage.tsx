import React from 'react';
import { GlowingEffectDemo } from '@/components/ui/glowing-effect-demo';

const GlowingEffectPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Glowing Effect Demo</h1>
        <GlowingEffectDemo />
      </div>
    </div>
  );
};

export default GlowingEffectPage;