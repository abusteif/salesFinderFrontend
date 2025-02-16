import { backendBaseURL } from "./config";

export const getStoreItems = async (store) => {
  try {
    const response = await fetch(`${backendBaseURL}/items/${store}`);
    return response.json();
  } catch (e) {
    return [];
  }
};

export const getCategories = async (store) => {
  try {
    const response = await fetch(`${backendBaseURL}/categories/${store}`);
    return response.json();
  } catch (e) {
    return [];
  }
};

export const getStores = async () => {
  try {
    const response = await fetch(`${backendBaseURL}/stores`);
    return response.json();
  } catch (e) {
    return [];
  }
};