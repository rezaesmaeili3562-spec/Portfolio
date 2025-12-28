import { http } from "../../../api/http";
import type { StoreSettings } from "../../../shared/types/settings";

export type SettingsResponse = {
  settings: StoreSettings;
};

export const getSettings = async (): Promise<SettingsResponse> => {
  const response = await http.get<SettingsResponse>("/settings");
  return response.data;
};

export const updateSettings = async (payload: StoreSettings): Promise<StoreSettings> => {
  const response = await http.put<{ settings: StoreSettings }>("/settings", payload);
  return response.data.settings;
};
