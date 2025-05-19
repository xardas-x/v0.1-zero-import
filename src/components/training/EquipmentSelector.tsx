import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Dumbbell, Plus, Search } from 'lucide-react';

const EquipmentSelector: React.FC = () => {
  const { 
    equipment, 
    selectedEquipment, 
    toggleEquipment, 
    equipmentPresets, 
    applyPreset,
    addCustomEquipment
  } = useAppContext();
  
  const [equipmentFilter, setEquipmentFilter] = useState<'Minimal' | 'Standard' | 'Advanced' | 'Custom' | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [newEquipment, setNewEquipment] = useState('');
  
  const filteredEquipment = equipment.filter(item => {
    const matchesFilter = equipmentFilter === 'All' || item.category === equipmentFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const handleAddCustom = () => {
    if (newEquipment.trim()) {
      addCustomEquipment(newEquipment.trim());
      setNewEquipment('');
    }
  };
  
  return (
    <Card
      title="Available Equipment"
      icon={<Dumbbell size={24} />}
      className="transition-all duration-300 hover:shadow-lg"
    >
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
          <Select 
            options={[
              { value: 'All', label: 'All Equipment' },
              { value: 'Minimal', label: 'Minimal' },
              { value: 'Standard', label: 'Standard Gym' },
              { value: 'Advanced', label: 'Advanced Equipment' },
              { value: 'Custom', label: 'Custom Added' }
            ]}
            value={equipmentFilter}
            onChange={(value) => setEquipmentFilter(value as any)}
            className="md:w-1/3"
          />
          
          <Select
            options={[
              { value: '', label: 'Select Preset...' },
              ...equipmentPresets.map(preset => ({ 
                value: preset.id, 
                label: preset.name 
              }))
            ]}
            onChange={(value) => {
              if (value) applyPreset(value);
            }}
            className="md:w-1/3"
          />
          
          <div className="relative flex-grow">
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredEquipment.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleEquipment(item.id)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all
                ${selectedEquipment.includes(item.id)
                  ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-300'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                }
              `}
            >
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <Input
            placeholder="Add custom equipment..."
            value={newEquipment}
            onChange={(e) => setNewEquipment(e.target.value)}
            className="flex-grow"
          />
          <Button
            onClick={handleAddCustom}
            disabled={!newEquipment.trim()}
            leftIcon={<Plus size={16} />}
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EquipmentSelector;