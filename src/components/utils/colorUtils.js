// --- Conversiones Básicas ---
export const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    return { r, g, b };
};

export const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

export const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: h = 0;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const hslToRgb = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

// --- Generación de Colores ---
export const generateRandomHex = () => "#" + ("000000" + Math.floor(Math.random() * 16777215).toString(16)).slice(-6).toUpperCase();

export const generateRandomColorObject = () => {
    const hex = generateRandomHex();
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return { hex, rgb, hsl, isLocked: false };
};

// --- Armonías de Color ---
const adjustHue = (h, delta) => (h + delta + 360) % 360;

const createColorObjectFromHsl = (h, s, l) => {
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    return { hex, rgb, hsl: { h, s, l }, isLocked: false };
};

export const getMonochromaticColors = (baseHsl, numColors = 5) => {
    const colors = [];
    const lightnessSteps = [0, 15, -15, 30, -30];
    for (let i = 0; i < numColors; i++) {
        const l = Math.max(0, Math.min(100, baseHsl.l + (lightnessSteps[i] || 0)));
        colors.push(createColorObjectFromHsl(baseHsl.h, baseHsl.s, l));
    }
    return colors;
};

export const getAnalogousColors = (baseHsl, numColors = 5) => {
    const colors = [];
    const hueOffsets = [0, -30, 30, -60, 60];
    for (let i = 0; i < numColors; i++) {
        const h = adjustHue(baseHsl.h, hueOffsets[i] || 0);
        colors.push(createColorObjectFromHsl(h, baseHsl.s, baseHsl.l));
    }
    return colors;
};

export const getComplementaryColors = (baseHsl, numColors = 5) => {
    const colors = [createColorObjectFromHsl(baseHsl.h, baseHsl.s, baseHsl.l)];
    const complementaryHue = adjustHue(baseHsl.h, 180);
    colors.push(createColorObjectFromHsl(complementaryHue, baseHsl.s, baseHsl.l));
    while (colors.length < numColors) {
        const lastColor = colors[colors.length - 1].hsl;
        const newL = Math.max(10, Math.min(90, lastColor.l + (Math.random() > 0.5 ? 15 : -15)));
        colors.push(createColorObjectFromHsl(lastColor.h, lastColor.s, newL));
    }
    return colors;
};

export const getTriadicColors = (baseHsl, numColors = 5) => {
    const hues = [baseHsl.h, adjustHue(baseHsl.h, 120), adjustHue(baseHsl.h, 240)];
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const currentHue = hues[i % 3];
        const l = Math.max(10, Math.min(90, baseHsl.l + (Math.random() * 30 - 15)));
        colors.push(createColorObjectFromHsl(currentHue, baseHsl.s, l));
    }
    return colors;
};