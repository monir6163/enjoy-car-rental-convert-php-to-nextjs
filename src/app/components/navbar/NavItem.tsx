import Link from "next/link";

interface NavItemProps {
  label: string;
  active?: boolean;
  path: string;
  onClick?: () => void;
}
const NavItem = ({ path, label, active }: NavItemProps) => {
  return (
    <Link
      href={`${path}`}
      className={`text-gray-600 text-center hover:text-green-500 px-3 py-2 rounded-md text-lg font-medium cursor-pointer border-b-2 md:border-b-0 ${
        active ? "text-green-500" : "text-white md:text-gray-600"
      }`}
    >
      {label}
    </Link>
  );
};

export default NavItem;
