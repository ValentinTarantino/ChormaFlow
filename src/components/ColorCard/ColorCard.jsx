import { FaCopy, FaLock, FaUnlock } from 'react-icons/fa';
import './ColorCard.css';

const ColorCard = ({ color, onToggleLock }) => {
    const textColor = color.hsl.l > 65 ? '#111827' : '#ffffff';

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className="ColorCard" style={{ backgroundColor: color.hex }}>
            <div className="ColorCard-overlay">
                <div className="ColorCard-info" style={{ color: textColor }}>
                    <h2 className="ColorCard-hex">{color.hex}</h2>
                    <div className="ColorCard-details">
                        <span>RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}</span>
                        <span>HSL: {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%</span>
                    </div>
                    <div className="ColorCard-actions">
                        <button title="Copiar HEX" onClick={() => handleCopy(color.hex)}>
                            <FaCopy />
                        </button>
                        <button title="Bloquear/Desbloquear" onClick={() => onToggleLock(color.id)}>
                            {color.isLocked ? <FaLock /> : <FaUnlock />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ColorCard;