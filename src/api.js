const API_URL = "https://productos-three-orpin.vercel.app/api/productos";

// GET todos
export async function getProductos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
}

// POST crear
export async function createProducto(producto) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return await res.json();
}

// PUT actualizar
export async function updateProducto(id, producto) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return await res.json();
}

// DELETE eliminar
export async function deleteProducto(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return await res.json();
}
