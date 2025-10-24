import { useState, useEffect } from "react";
import {
  getActivitiesByUserId,
  addActivity,
  deleteActivity,
  updateActivity,
} from "../api/api";
import ActivityCard from "../components/ActivityCard";

export default function Activities({ user, onLogout }) {

console.log("This is my user: ", user)


  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    comentarios: "",
    estatus: "PENDIENTE",
  });

  console.log("Estas son mis actividades: ", activities)
  const [editing, setEditing] = useState(null);

  const load = async () => setActivities(await getActivitiesByUserId(user.id));

  useEffect(() => { load(); }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  //hora de inicio no puede ser mayor a la de fin
  if (form.horaInicio >= form.horaFin) {
    alert("La hora de inicio debe ser menor que la hora de fin");
    return;
  }
  
  const activityData = {
    nombre: form.nombre,
    fecha: form.fecha,
    horaInicio: form.horaInicio,
    horaFin: form.horaFin,
    comentarios: form.comentarios,
    estatus: form.estatus,
    user: { id: user.id } 
  };

  try {
    if (editing) {
      await updateActivity(editing.id, activityData);
      setEditing(null);
    } else {
      await addActivity(activityData);
    }

    setForm({
      nombre: "",
      fecha: "",
      horaInicio: "",
      horaFin: "",
      comentarios: "",
      estatus: "PENDIENTE",
    });
    
    await load();
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
};

  const handleEdit = (activity) => {
    setEditing(activity);
    setForm({
      nombre: activity.nombre,
      fecha: activity.fecha,
      horaInicio: activity.horaInicio,
      horaFin: activity.horaFin,
      comentarios: activity.comentarios,
      estatus: activity.estatus,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hola, {user.nombre}</h1>
        <button onClick={onLogout} className="bg-gray-700 text-white px-4 py-2 rounded">
          Cerrar sesión
        </button>
      </div>

      {/* Form principal */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow grid grid-cols-2 gap-3 mb-6"
      >
        <input
          placeholder="Nombre de actividad"
          className="border p-2 rounded col-span-2"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />

      
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de la tarea
          </label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            required
          />
        </div>

     
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora de inicio
          </label>
          <input
            type="time"
            className="border p-2 rounded w-full"
            value={form.horaInicio}
            onChange={(e) => setForm({ ...form, horaInicio: e.target.value })}
            required
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora de fin
          </label>
          <input
            type="time"
            className="border p-2 rounded w-full"
            value={form.horaFin}
            onChange={(e) => setForm({ ...form, horaFin: e.target.value })}
            required
          />
        </div>

        <input
          placeholder="Comentarios"
          className="border p-2 rounded col-span-2"
          value={form.comentarios}
          onChange={(e) => setForm({ ...form, comentarios: e.target.value })}
        />

        {/* Selector de estatus */}
        <select
          className="border p-2 rounded col-span-2"
          value={form.estatus}
          onChange={(e) => setForm({ ...form, estatus: e.target.value })}
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="EN_PROGRESO">En progreso</option>
          <option value="COMPLETADA">Completada</option>
          <option value="CANCELADA">Cancelada</option>
        </select>

        <button className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {editing ? "Actualizar actividad" : "Agregar actividad"}
        </button>
      </form>

      {/* Lista de activities card */}
      <div className="space-y-3">
        {activities.map((a) => (
          <ActivityCard
            key={a.id}
            activity={a}
            onDelete={async (id) => {
              await deleteActivity(id);
              load();
            }}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}