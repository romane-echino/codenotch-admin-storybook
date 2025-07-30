class RGB {
    constructor(r, g, b) {
        Object.defineProperty(this, "r", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "g", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "b", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.r = r;
        this.g = g;
        this.b = b;
    }
    ToString() {
        return `${this.r}, ${this.g}, ${this.b}`;
    }
}
const lumianceThreshold = 50;
export function getTint(accent) {
    const palette = tailwindcssPaletteGenerator(accent);
    let result = '';
    result += '--primary-color:' + palette['500'].rgb.ToString() + ";";
    result += '--primary-color-50:' + palette['50'].rgb.ToString() + ";";
    result += '--primary-color-100:' + palette['100'].rgb.ToString() + ";";
    result += '--primary-color-200:' + palette['200'].rgb.ToString() + ";";
    result += '--primary-color-300:' + palette['300'].rgb.ToString() + ";";
    result += '--primary-color-400:' + palette['400'].rgb.ToString() + ";";
    result += '--primary-color-500:' + palette['500'].rgb.ToString() + ";";
    result += '--primary-color-600:' + palette['600'].rgb.ToString() + ";";
    result += '--primary-color-700:' + palette['700'].rgb.ToString() + ";";
    result += '--primary-color-800:' + palette['800'].rgb.ToString() + ";";
    result += '--primary-color-900:' + palette['900'].rgb.ToString() + ";";
    result += '--primary-color-950:' + palette['950'].rgb.ToString() + ";";
    return result;
}
export function appyTint(accent) {
    const isTintSet = document.body.style.getPropertyValue('--primary-color') === '';
    if (isTintSet) {
        //@ts-nocheck
        document.body.style.cssText += getTint(accent);
    }
    else {
        console.warn('Tint is already set, skipping.');
    }
}
const tailwindcssPaletteGenerator = (hex) => {
    const shades = [
        { name: "50", lightness: 98 },
        { name: "100", lightness: 95 },
        { name: "200", lightness: 90 },
        { name: "300", lightness: 82 },
        { name: "400", lightness: 64 },
        { name: "500", lightness: 50 },
        { name: "600", lightness: 33 },
        { name: "700", lightness: 24 },
        { name: "800", lightness: 14 },
        { name: "900", lightness: 7 },
        { name: "950", lightness: 4 },
    ];
    const palette = generateColor({ hex, shades });
    const hsl = hexToHSL(hex);
    palette['500'] = {
        hex: hex,
        hsl: hsl,
        lightness: '500',
        rgb: hexToRgb(hex),
        text: hsl.l >= lumianceThreshold ? '#000000' : '#FFFFFF'
    };
    return palette;
};
const generateColor = ({ hex, shades }) => {
    // convert hex to hsl
    const colorHSL = hexToHSL(hex);
    // initiate shade object
    const obj = {};
    // generate shades
    shades.forEach(({ name, lightness }) => {
        // deconstruct h & s
        const { h, s } = colorHSL;
        // generate shade hsl
        const hsl = { h, s, l: lightness };
        // convert hsl to hex
        const hex = hslToHEX(hsl);
        // update shade object
        obj[name] = {
            hex: hex,
            hsl: hsl,
            text: hsl.l >= lumianceThreshold ? '#000000' : '#FFFFFF',
            lightness: name,
            rgb: hexToRgb(hex)
        };
    });
    return obj;
};
export const hslToHEX = ({ h, s, l }) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};
export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return new RGB(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16));
    }
    else {
        return new RGB(0, 0, 0);
    }
}
export const hexToHSL = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || [];
    try {
        let r = parseInt(result[1], 16);
        let g = parseInt(result[2], 16);
        let b = parseInt(result[3], 16);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (r /= 255), (g /= 255), (b /= 255);
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        // eslint-disable-next-line prefer-const
        let h = 0, s = 0, l = (max + min) / 2;
        if (max == min) {
            h = s = 0; // achromatic
        }
        else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        const HSL = { h: 0, s: 0, l: 0 };
        HSL.h = Math.round(h * 360);
        HSL.s = Math.round(s * 100);
        HSL.l = Math.round(l * 100);
        return HSL;
    }
    catch {
        return { h: 0, s: 0, l: 0 };
    }
};
export { tailwindcssPaletteGenerator };
