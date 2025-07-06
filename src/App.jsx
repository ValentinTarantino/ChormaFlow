import { useState, useEffect, useCallback } from 'react';
import * as colorUtils from './components/utils/colorUtils.js';
import { v4 as uuidv4 } from 'uuid';
import Controls from './components/Controls/Controls.jsx';
import ColorCard from './components/ColorCard/ColorCard.jsx';

function App() {
  const NUM_COLORS = 5;

  const [colors, setColors] = useState(() => {
    let initialColors = [];
    for (let i = 0; i < NUM_COLORS; i++) {
      initialColors.push(colorUtils.generateRandomColorObject());
    }
    return initialColors;
  });

  const [harmonyMode, setHarmonyMode] = useState('random');

  const generatePalette = useCallback((mode) => {
    let newColors = [];
    const baseColor = colorUtils.generateRandomColorObject();
    
    switch (mode) {
      case 'monochromatic': newColors = colorUtils.getMonochromaticColors(baseColor.hsl, NUM_COLORS); break;
      case 'analogous': newColors = colorUtils.getAnalogousColors(baseColor.hsl, NUM_COLORS); break;
      case 'complementary': newColors = colorUtils.getComplementaryColors(baseColor.hsl, NUM_COLORS); break;
      case 'triadic': newColors = colorUtils.getTriadicColors(baseColor.hsl, NUM_COLORS); break;
      default:
        for (let i = 0; i < NUM_COLORS; i++) {
          newColors.push(colorUtils.generateRandomColorObject());
        }
    }

    setColors(prevColors => 
      newColors.map((newColor, index) => {
        const prevColor = prevColors[index];
        return (prevColor && prevColor.isLocked) ? prevColor : { ...newColor, id: prevColor?.id || uuidv4() };
      })
    );
  }, []);

  const handleToggleLock = (id) => {
    setColors(prevColors =>
      prevColors.map(c => (c.id === id ? { ...c, isLocked: !c.isLocked } : c))
    );
  };

  const handleHarmonyChange = (mode) => {
    setHarmonyMode(mode);
    generatePalette(mode);
  };

  return (
    <div className="app-container">
      <Controls
        onGeneratePalette={() => generatePalette(harmonyMode)}
        onHarmonyChange={handleHarmonyChange}
        selectedHarmony={harmonyMode}
      />
      <main className="palette-container">
        {colors.map((color) => (
          <ColorCard
            key={color.id}
            color={color}
            onToggleLock={handleToggleLock}
          />
        ))}
      </main>
    </div>
  );
}
export default App;