import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "../modules/darkMode/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Attendre que le composant soit monté
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-500"
      />
      <span className="text-xl">{theme === "dark" ? "🌜" : "🔆"}</span>
    </div>
  );
}
