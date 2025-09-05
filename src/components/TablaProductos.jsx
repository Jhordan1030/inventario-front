import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../api";
import ModalProducto from "./ModalProducto";

export default function TablaProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openModal(producto = null) {
    if (producto) {
      setEditId(producto.id);
      setForm({
        nombre: producto.nombre,
        descripcion: producto.descripcion || "",
        precio: producto.precio,
        stock: producto.stock,
        categoria: producto.categoria || "",
      });
    } else {
      setEditId(null);
      setForm({ nombre: "", descripcion: "", precio: "", stock: "", categoria: "" });
    }
    setIsModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editId) {
        await updateProducto(editId, form);
      } else {
        await createProducto(form);
      }
      setIsModalOpen(false);
      cargarProductos();
    } catch (err) {
      console.error(err);
      alert("Error al guardar producto");
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await deleteProducto(id);
      cargarProductos();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar producto");
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Gestión de Productos
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-5 py-2 rounded-xl shadow-md transition"
        >
          + Nuevo Producto
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Categoría</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">${p.precio}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">{p.categoria}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => openModal(p)}
                      className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <ModalProducto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Editar Producto" : "Agregar Producto"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            name="precio"
            step="0.01"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={form.categoria}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-4 py-3 rounded-xl shadow-md transition"
          >
            {editId ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </ModalProducto>
    </div>
  );
}
