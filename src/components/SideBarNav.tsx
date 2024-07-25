"use client";
import { GoPerson } from "react-icons/go";
import { GrHomeRounded } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "../styles/componetns/sideBarNav.css";

const menus = {
  top: [
    {
      label: "หน้าหลัก",
      icon: GrHomeRounded,
      href: "/",
    },
    {
      label: "ขึ้นทะเบียนสำเร็จ",
      icon: IoDocumentTextOutline,
      href: "#",
    },
    {
      label: "User Managemant",
      icon: MdOutlineManageAccounts,
      href: "#",
    },
  ],
  bottom: [
    {
      label: "บริการอื่นๆ",
      href: "#",
    },
    {
      label: "คำถามที่พบบ่อย",
      href: "#",
    },
    {
      label: "ออกจากระบบ",
      href: "#",
    },
  ],
};
function SideBarNav() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <nav className="relative h-full w-fit bg-gray-50 z-10 font-noto-sans shadow-md border-r-[1px] transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-20 absolute -right-2 top-[70px] w-5 h-5 bg-gray-50 rounded-full border-[1px] border-gray-100 hover:bg-gray-200 duration-200"
      >
        <MdOutlineKeyboardArrowLeft
          className={`${isOpen ? "" : "rotate-180"} duration-200 font-semibold`}
        />
      </button>
      <aside
        className="flex flex-col justify-between h-full p-4 transition-all duration-300 ease-linear"
        data-isopen={isOpen}
      >
        <div>
          <div className="flex border-b-[1px] mb-4 pb-4 max-h-16 overflow-hidden">
            <span className="bg-zinc-900 mr-2 w-12 h-12 flex justify-center items-center rounded-md">
              <GoPerson className="text-4xl text-gray-400" />
            </span>
            <div className={`${isOpen ? "flex" : "hidden"} flex-col user-text`}>
              <span className="font-semibold">นพ.ทดสอบ ระบบแพทย์</span>
              <div className="line-clamp-1">กระทรวงสาธารณะสุข การควบคุมโรค</div>
            </div>
          </div>
          <ul>
            {menus.top.map(({ label, href, icon: Icon }, index) => (
              <li
                key={index}
                className={`${isOpen ? "w-full" : "w-12"} ${
                  href === pathname ? "bg-green-400" : ""
                } hover:bg-green-300 duration-200 rounded-md p-3`}
              >
                <Link
                  href={href}
                  className={`${
                    isOpen ? "w-full" : "w-12"
                  } flex flex-row overflow-hidden max-h-6`}
                >
                  <Icon className="text-xl" />
                  <span
                    className={`${isOpen ? "block ml-2" : " hidden"} menu-text`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ul className={`${isOpen ? "flex flex-col" : "hidden"}`}>
          {menus.bottom.map((item, index) => (
            <li
              key={index}
              className="w-full rounded-md p-3 hover:bg-gray-200 duration-300 cursor-pointer"
            >
              <Link href={item.href} className="w-full">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  );
}

export default SideBarNav;
