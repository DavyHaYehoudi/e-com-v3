import { Copy } from "lucide-react";
import { useState } from "react";

interface ClipboardButtonProps {
  text: string;
  className?: string;
  iconSize?: number; // Taille de l'icône (facultatif)
}

const ClipboardButton: React.FC<ClipboardButtonProps> = ({
  text,
  className = "w-6 h-6 text-blue-500",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Réinitialise l'état après 2 secondes
    });
  };

  return (
    <div className={`relative inline-flex items-center gap-1 ${className}`}>
      <button
        onClick={handleCopy}
        className="flex items-center text-[var(--whiteSmoke)] hover:text-gray-800 focus:outline-none"
        title="Copier"
      >
        <Copy className={className} />
      </button>
      {copied && (
        <span className="absolute -top-5 left-0 text-xs text-green-500">
          Copié
        </span>
      )}
    </div>
  );
};

export default ClipboardButton;
