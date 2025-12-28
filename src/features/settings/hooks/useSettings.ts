import React from "react";
import { getSettings, updateSettings } from "../api/settingsApi";
import type { StoreSettings } from "../../../shared/types/settings";

export const useSettings = () => {
  const [settings, setSettings] = React.useState<StoreSettings | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSettings();
      setSettings(response.settings);
    } catch {
      setError("دریافت تنظیمات با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const saveSettings = async (payload: StoreSettings) => {
    const updated = await updateSettings(payload);
    setSettings(updated);
  };

  return { settings, loading, error, reload: load, saveSettings };
};
