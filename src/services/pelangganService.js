// src/services/pelangganService.js

import { supabase } from "./supabase";

export const getPelanggan = async () => {
  const { data, error } = await supabase
    .from("pelanggan")
    .select("*")
    .order("id_pelanggan");

  if (error) throw error;

  return data;
};