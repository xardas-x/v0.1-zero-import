import { BufferGeometry, Vector3 } from 'three';

export interface MuscleData {
  id: string;
  name: string;
  category: 'upper' | 'core' | 'lower';
  color: string;
  position: Vector3;
  geometry: BufferGeometry;
  deepGeometry?: BufferGeometry;
  functions: string[];
  exercises: string[];
  injuryPrevention: string;
  recoveryTips: string;
  tags: string[];
}