
const API_URL = "http://localhost:8080/api";

//Usando fetch para la comunicacion con el API

function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token || localStorage.getItem("token"); 
}

// Register
export async function register(user) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  
  const data = await res.json(); 
  
  if (!res.ok) {
    throw new Error(data.error || data.message || "Error al registrar");
  }
  
  return data;
}

// Login
export async function login(credentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Credenciales incorrectas");
  const data = await res.json();
  
 
  localStorage.setItem("token", data.token);
  return data;
}

// Para hacer el logout eliminamos el token del localstorage asi como el user
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Obtención de actividades
export const getActivitiesByUserId = async (userId) => {
  const token = getToken();
  
  const response = await fetch(`${API_URL}/activities/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al cargar actividades');
  }
  
  return response.json();
};

// Agregar actividad
export async function addActivity(activity) {
  const token = getToken();
  
  const res = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    },
    body: JSON.stringify(activity),
  });
  
  if (!res.ok) throw new Error("Error al agregar actividad");
  return res.json();
}

// Actualizar actividad
export async function updateActivity(id, activity) {

  const token = getToken(); 
  console.log("Este es mi token", token)
  const res = await fetch(`${API_URL}/activities/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify(activity),
  });
  
  if (!res.ok) throw new Error("Error al actualizar actividad"); 
  return res.json();
}

// Eliminar Actividad
export async function deleteActivity(id) {
  const token = getToken();
  
  const res = await fetch(`${API_URL}/activities/${id}`, {
    method: "DELETE",
    headers: { 
      "Authorization": `Bearer ${token}` 
    },
  });
  
  if (!res.ok) throw new Error("Error al eliminar actividad");
}