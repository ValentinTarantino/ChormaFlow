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

            <div className="Controls-actions">
                {/* --- Grupo de Botones para ESCRITORIO --- */}
                {/* Este grupo se ocultará en pantallas pequeñas */}
                <div className="Controls-group-desktop">
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

                {/* --- Dropdown para MÓVIL --- */}
                {/* Este select solo será visible en pantallas pequeñas */}
                <select
                    className="Controls-select-mobile"
                    value={selectedHarmony}
                    onChange={(e) => onHarmonyChange(e.target.value)}
                    aria-label="Seleccionar tipo de armonía"
                >
                    {HARMONY_OPTIONS.map(harmony => (
                        <option key={harmony.id} value={harmony.id}>
                            {harmony.label}
                        </option>
                    ))}
                </select>

                <button className="Controls-generateButton" onClick={onGeneratePalette}>
                    <FaWandMagicSparkles />
                    <span>Generar Paleta</span>
                </button>
            </div>
        </header>
    );
};
export default Controls;