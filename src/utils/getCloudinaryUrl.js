/**
 * Принимает оригинальный Cloudinary URL и возвращает URL с трансформациями.
 *
 * @param {string} url - оригинальный URL изображения
 * @param {object} options
 * @param {number} [options.width] - ширина в пикселях
 * @param {number} [options.height] - высота в пикселях
 * @param {string} [options.crop='fill'] - режим обрезки (fill, fit, scale, ...)
 * @param {string} [options.quality='auto'] - качество (auto, 80, 60, ...)
 * @param {string} [options.format='auto'] - формат (auto = WebP/AVIF по поддержке браузера)
 * @returns {string}
 */
export function getCloudinaryUrl(url, { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = {}) {
    if (!url || !url.includes('cloudinary.com')) return url;

    const parts = [];
    if (width) parts.push(`w_${width}`);
    if (height) parts.push(`h_${height}`);
    parts.push(`c_${crop}`);
    parts.push(`f_${format}`);
    parts.push(`q_${quality}`);

    return url.replace('/upload/', `/upload/${parts.join(',')}/`);
}
