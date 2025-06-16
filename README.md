# CSS Grid Generator

⚙️ Una herramienta interactiva para crear layouts CSS Grid personalizados visualmente, seleccionando áreas dinámicamente y generando el código CSS y HTML correspondiente.

---

## 📌 Descripción

Esta aplicación React permite diseñar fácilmente grids CSS mediante una interfaz visual. Puedes definir el número de filas, columnas, el espacio (gap) entre ellas y seleccionar áreas dentro del grid para crear elementos personalizados. 

La app genera el código CSS y HTML basado en la configuración actual, que puedes copiar para usar en tus proyectos.

---

## 🚀 Funcionalidades principales

- Definir dinámicamente el número de **columnas** y **filas**.
- Ajustar el **gap** entre celdas en píxeles.
- Selección visual de áreas rectangulares dentro del grid para generar ítems.
- Visualización en tiempo real del grid con los ítems seleccionados.
- Generación automática y actualizada de código CSS y HTML para el layout.
- Copiar el código CSS y HTML con un botón para usar en otros proyectos.
- Opción para resetear todas las selecciones.

---

## 📁 Estructura del proyecto

- **App.jsx**: Componente principal que maneja estados globales, inputs y muestra el grid junto con el código generado.
- **GridEditor.jsx**: Componente que renderiza el grid editable, maneja selección con mouse y comunica las áreas seleccionadas al padre.

---

## 🧩 Tecnologías usadas

- React con hooks (`useState`, `useEffect`).
- Tailwind CSS para estilos rápidos y responsivos.
- Librería `uuid` para generación de IDs únicos de ítems.

---

## ⚙️ Uso

1. Modifica el número de columnas y filas con los inputs numéricos.
2. Ajusta el gap para cambiar el espacio entre celdas.
3. En el área de la izquierda, selecciona áreas arrastrando con el mouse para crear ítems.
4. Observa en la derecha el preview visual del grid con las áreas seleccionadas.
5. Copia el CSS o HTML generado usando los botones.
6. Usa el botón "Reset Selecciones" para borrar todas las áreas seleccionadas y empezar de nuevo.

---

## 📖 Explicación rápida del flujo

- `App.jsx` controla el estado del grid, las áreas seleccionadas y genera el código CSS/HTML.
- `GridEditor.jsx` permite al usuario seleccionar múltiples áreas mediante eventos mouse down, enter y up.
- Cada selección es un área rectangular con filas y columnas de inicio y fin.
- Estas áreas se visualizan y el código se actualiza automáticamente.

## 📬 Contribuciones
- ¡Contribuciones bienvenidas! Si tienes sugerencias, mejoras o bugs, abre un issue o pull request.
- considera dejar tu Star ⭐⭐⭐
---

## 🔧 Instalación y ejecución

```bash

# Entra al directorio
cd css-generator-app

# Instala dependencias
npm install

# Corre la app
npm start

