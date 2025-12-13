/**
 * Convierte un string a formato slug (URL-friendly)
 * Ejemplo: "Bandera Argentina de Ceremonia" → "bandera-argentina-de-ceremonia"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Separar caracteres con acentos
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^a-z0-9\s-]/g, "") // Remover caracteres especiales
    .trim()
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
    .replace(/-+/g, "-"); // Remover guiones múltiples
}

/**
 * Genera un slug único basado en el nombre del producto y su ID
 * Ejemplo: generateProductSlug("Bandera Argentina", "abc123") → "bandera-argentina-abc123"
 */
export function generateProductSlug(name: string, id: string): string {
  const baseSlug = slugify(name);
  const shortId = id.slice(-6); // Últimos 6 caracteres del ID para unicidad
  return `${baseSlug}-${shortId}`;
}
