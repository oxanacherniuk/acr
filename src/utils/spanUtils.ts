/**
 * Извлекает содержимое первого тега span из строки
 * @param input - Входная строка с HTML/XML тегами
 * @returns Содержимое первого тега span или null, если span не найден
 */
export const extractSpanContent = (input: string): string | null => {
    if (!input || typeof input !== 'string') {
        return null;
    }

    const spanRegex = /<span[^>]*>(.*?)<\/span>/i;
    const match = input.match(spanRegex);

    return match ? match[1] : null;
};

/**
 * Извлекает содержимое всех тегов span из строки
 * @param input - Входная строка с HTML/XML тегами
 * @returns Массив содержимого всех тегов span
 */
export const extractAllSpanContents = (input: string): string[] => {
    if (!input || typeof input !== 'string') {
        return [];
    }

    const spanRegex = /<span[^>]*>(.*?)<\/span>/gi;
    const matches: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = spanRegex.exec(input)) !== null) {
        matches.push(match[1]);
    }

    return matches;
};

/**
 * Извлекает содержимое span с учетом атрибутов
 * @param input - Входная строка
 * @param className - Опционально: конкретный класс для поиска
 * @param id - Опционально: конкретный id для поиска
 * @returns Содержимое span или null
 */
export const extractSpanByAttributes = (
    input: string,
    className?: string,
    id?: string
): string | null => {
    if (!input || typeof input !== 'string') {
        return null;
    }

    let regexPattern = '<span';

    if (id) {
        regexPattern += `[^>]*id=["']${id}["'][^>]*`;
    } else if (className) {
        regexPattern += `[^>]*class=["'][^"']*${className}[^"']*["'][^>]*`;
    } else {
        regexPattern += '[^>]*';
    }

    regexPattern += '>(.*?)</span>';

    const regex = new RegExp(regexPattern, 'i');
    const match = input.match(regex);

    return match ? match[1] : null;
};

/**
 * Удаляет все теги span из строки, оставляя только их содержимое
 * @param input - Входная строка
 * @returns Строка без тегов span
 */
export const removeSpanTags = (input: string): string => {
    if (!input || typeof input !== 'string') {
        return input;
    }

    return input.replace(/<span[^>]*>(.*?)<\/span>/gi, '$1');
};