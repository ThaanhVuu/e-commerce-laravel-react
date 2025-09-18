// utils/getByPath.js
export const getByPath = (obj, path, fallback = undefined) => {
    if (!obj || !path) return fallback;
    return path.split('.').reduce((acc, key) => (acc?.[key]), obj) ?? fallback;
};
