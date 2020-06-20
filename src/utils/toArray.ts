export default <T = any>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);
