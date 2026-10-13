// Utility to parse image paths returned by Django API
export const getImageUrl = (path) => {
  if (!path) return "";
  
  // Trata URLs externas que possam vir prefixadas com /media/
  if (path.includes("http://") || path.includes("https://")) {
    const httpIdx = path.indexOf("http://");
    const httpsIdx = path.indexOf("https://");
    const actualUrlIdx = httpsIdx !== -1 ? httpsIdx : httpIdx;
    return path.substring(actualUrlIdx);
  }
  
  const apiBase = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api";
  const origin = apiBase.replace(/\/api\/?$/, "");
  return `${origin}${path.startsWith("/") ? "" : "/"}${path}`;
};
