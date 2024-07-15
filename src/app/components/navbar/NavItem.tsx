import Link from "next/link";

interface NavItemProps {
  label: string;
  active?: boolean;
  path: string;
}
const NavItem = ({ path, label, active }: NavItemProps) => {
  return (
    <Link
      href={`${path}`}
      className={`text-gray-600 hover:text-green-500 px-3 py-2 rounded-md text-lg font-medium cursor-pointer ${
        active ? "text-green-500" : ""
      }`}
    >
      {label}
    </Link>
  );
};

export default NavItem;
