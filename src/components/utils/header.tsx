import Image from "next/image";

export default function Header() {
	return (
		<div className="flex h-fit w-full items-center justify-between bg-green-800 p-2 pl-6">
			<p className="text-2xl font-bold text-white">Pint</p>
			<Image
				src={"images/google_icon.svg"}
				alt=""
				width={44}
				height={44}
			/>
		</div>
	);
}
