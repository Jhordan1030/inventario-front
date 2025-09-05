import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function ProductoModal({ open, onClose, onSave, producto }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
  });

  useEffect(() => {
    if (producto) {
      setForm(producto);
    } else {
      setForm({ nombre: "", descripcion: "", precio: "", stock: "", categoria: "" });
    }
  }, [producto]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {producto ? "Editar Producto" : "Agregar Producto"}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nombre"
          fullWidth
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Descripción"
          fullWidth
          multiline
          rows={3}
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Precio"
          type="number"
          fullWidth
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Stock"
          type="number"
          fullWidth
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Categoría"
          fullWidth
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={() => onSave(form)}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
