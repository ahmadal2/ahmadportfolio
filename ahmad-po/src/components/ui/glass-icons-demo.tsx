import { GlassIcons } from "@/components/ui/glass-icons";
import { FiFileText, FiBook, FiHeart, FiCloud, FiEdit, FiBarChart2 } from 'react-icons/fi';

const GlassIconsDemo = () => {
  // Define the items array as provided in the original demo
  const items = [
    { icon: <FiFileText />, color: 'blue', label: 'Files', comment: 'Document management system' },
    { icon: <FiBook />, color: 'purple', label: 'Books', comment: 'Library catalog' },
    { icon: <FiHeart />, color: 'red', label: 'Health', comment: 'Health monitoring' },
    { icon: <FiCloud />, color: 'indigo', label: 'Weather', comment: 'Weather forecasting' },
    { icon: <FiEdit />, color: 'orange', label: 'Notes', comment: 'Note taking app' },
    { icon: <FiBarChart2 />, color: 'green', label: 'Stats', comment: 'Analytics dashboard' },
  ];

  return (
    <div className="flex w-full h-screen justify-center items-center">
      {/* The outer div maintains the full screen centered layout */}
      <div style={{ height: '600px', position: 'relative' }}>
        {/* Render the GlassIcons component with the defined items and class name */}
        <GlassIcons items={items} className="custom-class" />
      </div>
    </div>
  );
};

export default GlassIconsDemo;