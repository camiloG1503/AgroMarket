import api from "./api.js";

export const getProfile = async () => (await api.get("/users/profile")).data;
export const updateProfile = async (payload) => (await api.put("/users/update", payload)).data;
export const uploadProfilePicture = async (file) => {
  const form = new FormData();
  form.append("foto", file);
  return (await api.post("/users/upload", form, { headers: { "Content-Type": "multipart/form-data" } })).data;
};
export const changePassword = async (payload) => (await api.post("/auth/change-password", payload)).data;

export const getFavorites = async () => (await api.get("/favorites")).data;
export const removeFavorite = async (productId) => (await api.delete(`/favorites/${productId}`)).data;
export const addToCart = async (productId, quantity = 1) =>
  (await api.post(`/cart/me/items/${productId}`, { quantity })).data;

export const getCart = async () => (await api.get("/cart/me")).data;
export const updateCartItem = async (productId, quantity) =>
  (await api.put(`/cart/me/items/${productId}`, { quantity })).data;
export const removeCartItem = async (productId) => (await api.delete(`/cart/me/items/${productId}`)).data;
export const checkout = async (tipo_entrega = "domicilio") =>
  (await api.post("/orders/checkout", { tipo_entrega })).data;

export const getOrders = async () => (await api.get("/orders/me")).data;
export const createReview = async (productId, calificacion, comentario) =>
  (await api.post(`/reviews/${productId}`, { calificacion, comentario })).data;
export const getAdminDashboard = async () => (await api.get("/dashboard/admin")).data;
export const getAllOrders = async () => (await api.get("/orders/all")).data;
export const changeOrderStatus = async (id, status) =>
  (await api.put(`/orders/${id}/status`, { status })).data;
