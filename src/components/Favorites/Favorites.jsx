import { FaTrash, FaDownload } from 'react-icons/fa';
import './Favorites.css'; 

const Favorites = ({ palettes, onLoad, onDelete }) => {
    if (!palettes || palettes.length === 0) {
        return null; 
    }

    return (
        <div className="container mt-5">
            <h2 className="Favorites-title">Paletas Favoritas</h2>
            <div className="Favorites-grid">
                {palettes.map((palette) => (
                    <div key={palette.id} className="Favorites-item">
                        <div className="Favorites-paletteInfo">
                            <strong className="Favorites-paletteName">{palette.name}</strong>
                            <div className="Favorites-swatchContainer">
                                {palette.colors.map((color) => (
                                    <div
                                        key={color.id}
                                        className="Favorites-swatch"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="Favorites-actions">
                            <button title="Cargar paleta" onClick={() => onLoad(palette.colors)}><FaDownload /></button>
                            <button title="Eliminar paleta" className="Favorites-deleteButton" onClick={() => onDelete(palette.id)}><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;