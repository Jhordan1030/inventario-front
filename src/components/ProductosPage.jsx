import React, { useState, useEffect } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../api";
import TablaProductos from "./TablaProductos";
import ProductoModal from "./ProductoModal";
import { Container, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSave = async (producto) => {
    if (productoEdit) {
      await updateProducto(productoEdit.id, producto);
    } else {
      await createProducto(producto);
    }
    setModalOpen(false);
    setProductoEdit(null);
    cargarProductos();
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      await deleteProducto(id);
      cargarProductos();
    }
  };

  return (
    <Container sx={{ mt: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <Typography variant="h4" component="h1">
          Gestión de Productos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setProductoEdit(null);
            setModalOpen(true);
          }}
        >
          Agregar Producto
        </Button>
      </div>

      <TablaProductos
        productos={productos}
        onEdit={(p) => {
          setProductoEdit(p);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <ProductoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        producto={productoEdit}
      />
    </Container>
  );
}
