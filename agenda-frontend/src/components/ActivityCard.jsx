export default function ActivityCard({ activity, onDelete, onEdit }) {
  const statusColors = {
    PENDIENTE: "bg-yellow-200 text-yellow-800",
    EN_PROGRESO: "bg-blue-200 text-blue-800",
    COMPLETADA: "bg-green-200 text-green-800",
    CANCELADA: "bg-red-200 text-red-800",
  };

  // Calculando duracion de la tarea
  const calcularDuracion = (horaInicio, horaFin) => {
    if (!horaInicio || !horaFin) return "N/A";
    
    const [horaI, minI] = horaInicio.split(':').map(Number);
    const [horaF, minF] = horaFin.split(':').map(Number);
    
    const minutosInicio = horaI * 60 + minI;
    const minutosFin = horaF * 60 + minF;
    const diferenciaMinutos = minutosFin - minutosInicio;
    
    const horas = Math.floor(diferenciaMinutos / 60);
    const minutos = diferenciaMinutos % 60;
    
    if (horas > 0 && minutos > 0) {
      return `${horas}h ${minutos}m`;
    } else if (horas > 0) {
      return `${horas}h`;
    } else {
      return `${minutos}m`;
    }
  };

  const duracion = calcularDuracion(activity.horaInicio, activity.horaFin);

  return (
    <div className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{activity.nombre}</h2>
        <p className="text-sm text-gray-500">
          {activity.fecha} • {activity.horaInicio} - {activity.horaFin} 
          <span className="ml-2 font-medium text-blue-600">
            Duración: {duracion}
          </span>
        </p>
        {activity.comentarios && (
          <p className="text-gray-600 mt-1">{activity.comentarios}</p>
        )}
        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${statusColors[activity.estatus]}`}>
          {activity.estatus.replace('_', ' ')}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(activity)}
          className="text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(activity.id)}
          className="text-xs bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}