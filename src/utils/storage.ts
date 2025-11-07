const DARK_MODE_KEY = 'mcf_dark_mode';

export const getDarkMode = (): boolean => {
  try {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    return stored === 'true';
  } catch {
    return false;
  }
};

export const setDarkMode = (isDark: boolean): void => {
  localStorage.setItem(DARK_MODE_KEY, isDark.toString());
};
