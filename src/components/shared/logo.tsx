import { Gem } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * A Basic logo component with icon and name
 *
 */
export default function Logo() {
  return (
    <div>
      <Link to="/dashboard" className="flex gap-2.5">
        <Gem />
        <span className="font-bold tracking-wider">V-Eng</span>
      </Link>
    </div>
  );
}
