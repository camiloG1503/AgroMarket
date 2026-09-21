import api from "./api.js";

export async function register({ firstName, lastName, email, password }) {
  const { data } = await api.post("/auth/register", {
    nombre: firstName.trim(),
    apellido: lastName.trim(),
    correo: email.trim().toLowerCase(),
    contraseña: password,
  });
  return data;
}

export async function login(correo, contraseña) {
  const { data } = await api.post("/auth/login", {
    correo: correo.trim().toLowerCase(),
    contraseña,
  });
  return data; // { message, token, user }
}

export async function forgotPassword(correo) {
  const { data } = await api.post("/auth/forgot-password", { correo });
  return data; // { message }
}

export async function resetPassword(token, nueva_contrasena) {
  const { data } = await api.post(`/auth/reset-password/${token}`, {
    nueva_contrasena,
  });
  return data; // { message }
}
