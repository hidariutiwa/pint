"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
	FiFileText,
	FiCalendar,
	FiMessageCircle,
	FiUsers,
} from "react-icons/fi";

function NavigationItem({
	text,
	icon,
	href,
	pathname,
}: {
	text: string;
	icon: React.ReactNode;
	href: string;
	pathname: string;
}) {
	const isSelected = pathname === href;

	return (
		<Link
			href={href}
			className={`flex h-full w-24 flex-col items-center justify-end gap-2 rounded-2xl p-1 ${isSelected ? "bg-stone-100 text-green-700" : "bg-white"}`}
		>
			<div>{icon}</div>
			<p className={`text-xs ${isSelected ? "font-bold" : ""}`}>{text}</p>
		</Link>
	);
}

export default function Navigation() {
	const pathname = usePathname();

	return (
		<nav className="flex h-fit w-full justify-between border-t border-stone-200 bg-white p-2">
			<NavigationItem
				text="メモ"
				href="/memo"
				icon={<FiFileText size={30} />}
				pathname={pathname}
			/>
			<NavigationItem
				text="カレンダー"
				href="/calendar"
				icon={<FiCalendar size={30} />}
				pathname={pathname}
			/>
			<NavigationItem
				text="きく"
				href="/chat"
				icon={<FiMessageCircle size={30} />}
				pathname={pathname}
			/>
			<NavigationItem
				text="グループ"
				href="/group"
				icon={<FiUsers size={30} />}
				pathname={pathname}
			/>
		</nav>
	);
}
