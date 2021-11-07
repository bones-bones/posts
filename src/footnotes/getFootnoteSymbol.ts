const mappings = {
    '0': '*',
    '1': '†',
    '2': '‡',
    '3': '§',
    '4': '¶',
    '5': '#',
    '6': '♠',
    '7': '♥',
    '8': '♦',
    '9': '♣',
};
export const getFootnoteSymbol = (numberOfFootnotes: number) =>
    ('' + numberOfFootnotes)
        .split('')
        .map((entry) => (mappings as any)[entry])
        .join('');

