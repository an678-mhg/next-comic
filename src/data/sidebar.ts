import { FiHome, FiFilter } from "react-icons/fi";
import { RiUserFollowLine } from "react-icons/ri";
import { AiOutlineHistory } from "react-icons/ai";

export const sidebar = [
  {
    name: "Trang chủ",
    link: "/",
    icon: FiHome,
  },
  {
    name: "Theo dõi",
    link: "/following",
    icon: RiUserFollowLine,
  },
  {
    name: "Lịch sử",
    link: "/history",
    icon: AiOutlineHistory,
  },
  {
    name: "Bộ lọc",
    link: "/filter",
    icon: FiFilter,
  },
];
