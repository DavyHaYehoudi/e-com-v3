import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface NavBackDashboardProps {
  path: string;
  text: string;
  role: "admin" | "customer";
}
const NavBackDashboard: React.FC<NavBackDashboardProps> = ({
  path,
  text,
  role,
}) => {
  return (
    <p className="m-5">
      <Link
        to={`/${role}/tableau-de-bord/${path}`}
        className="flex items-center gap-2"
      >
        <MoveLeft />
        <span className="text-blue-300 text-xs">{text} </span>
      </Link>
    </p>
  );
};

export default NavBackDashboard;
