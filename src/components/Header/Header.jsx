import { FaWandMagicSparkles } from 'react-icons/fa6';
import './Header.css';

const Header = ({ onGeneratePalette, onHarmonyChange, selectedHarmony }) => {
    return (
        <header className="Header">
            <div className="Header-content main-container">
                <h1 className="Header-title">ChromaFlow</h1>
                <div className="Header-actions">
                    <select
                        className="Header-select"
                        value={selectedHarmony}
                        onChange={(e) => onHarmonyChange(e.target.value)}
                        aria-label="Seleccionar tipo de armonía"
                    >
                        <option value="random">Aleatoria</option>
                        <option value="analogous">Análoga</option>
                        <option value="monochromatic">Monocromática</option>
                        <option value="complementary">Complementaria</option>
                        <option value="triadic">Triádica</option>
                    </select>
                    <button className="Header-generateButton" onClick={onGeneratePalette}>
                        <FaWandMagicSparkles />
                        <span>Generar Paleta</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
export default Header;