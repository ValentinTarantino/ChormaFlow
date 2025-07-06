import { FaWandMagicSparkles } from 'react-icons/fa6';
import './Controls.css';

const HARMONY_OPTIONS = [
    { id: 'random', label: 'Aleatoria' },
    { id: 'analogous', label: 'Análoga' },
    { id: 'monochromatic', label: 'Monocromática' },
    { id: 'complementary', label: 'Complementaria' },
    { id: 'triadic', label: 'Triádica' },
];

const Controls = ({ onGeneratePalette, onHarmonyChange, selectedHarmony }) => {
    return (
        <header className="Controls-panel">
            <h1 className="Controls-title">ChromaFlow</h1>

            <div className="Controls-group">
                {HARMONY_OPTIONS.map(harmony => (
                    <button
                        key={harmony.id}
                        className={`Controls-harmonyButton ${selectedHarmony === harmony.id ? 'active' : ''}`}
                        onClick={() => onHarmonyChange(harmony.id)}
                    >
                        {harmony.label}
                    </button>
                ))}
            </div>

            <button className="Controls-generateButton" onClick={onGeneratePalette}>
                <FaWandMagicSparkles />
                <span>Generar Paleta</span>
            </button>
        </header>
    );
};
export default Controls;