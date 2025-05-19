import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { MuscleGroup } from './MuscleGroup';
import { MuscleInfo } from './MuscleInfo';
import { muscleData } from './muscleData';
import { Tabs } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Download } from 'lucide-react';

const AnatomyViewer: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [showDeepMuscles, setShowDeepMuscles] = useState(false);
  const [activeTab, setActiveTab] = useState('upper');
  const controlsRef = useRef<any>(null);

  const handleMuscleClick = (muscleId: string) => {
    setSelectedMuscle(muscleId === selectedMuscle ? null : muscleId);
  };

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const tabs = [
    { id: 'upper', label: 'Upper Body' },
    { id: 'core', label: 'Core' },
    { id: 'lower', label: 'Lower Body' }
  ];

  return (
    <div className="w-full h-[600px] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="bg-white dark:bg-gray-800 shadow-lg"
        />
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeepMuscles(!showDeepMuscles)}
          className="bg-white dark:bg-gray-800"
        >
          <Layers className="w-4 h-4 mr-2" />
          {showDeepMuscles ? 'Show Surface' : 'Show Deep'}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={resetCamera}
          className="bg-white dark:bg-gray-800"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (controlsRef.current) {
              controlsRef.current.zoomIn();
            }
          }}
          className="bg-white dark:bg-gray-800"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (controlsRef.current) {
              controlsRef.current.zoomOut();
            }
          }}
          className="bg-white dark:bg-gray-800"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // Export functionality
          }}
          className="bg-white dark:bg-gray-800"
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={10}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {muscleData
          .filter(muscle => muscle.category === activeTab)
          .map(muscle => (
            <MuscleGroup
              key={muscle.id}
              {...muscle}
              isSelected={selectedMuscle === muscle.id}
              onClick={() => handleMuscleClick(muscle.id)}
              showDeepMuscles={showDeepMuscles}
            />
          ))}
      </Canvas>

      {selectedMuscle && (
        <MuscleInfo
          muscle={muscleData.find(m => m.id === selectedMuscle)!}
          onClose={() => setSelectedMuscle(null)}
        />
      )}
    </div>
  );
};

export default AnatomyViewer;