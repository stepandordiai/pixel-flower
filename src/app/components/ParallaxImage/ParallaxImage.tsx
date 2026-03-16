import useParallax from "@/app/hooks/useParallax";

export default function ParallaxImage({
	src,
	alt,
	speed,
	threshold,
	left = "auto",
	right,
}: {
	src: string;
	alt: string;
	speed?: number;
	threshold?: number;
	left?: string | number;
	right?: string | number;
}) {
	const resolvedRight = right ?? left;
	const { visible, elementRef } = useParallax(speed, threshold);

	return (
		<div
			style={{
				position: "fixed",
				bottom: 0,
				left,
				right: resolvedRight,
				zIndex: 1000,
				pointerEvents: "none",
				opacity: visible ? 1 : 0,
				transition: "opacity 0.3s ease",
			}}
		>
			<img
				ref={elementRef}
				src={src}
				width={100}
				alt={alt}
				style={{
					display: "block",
					willChange: "transform",
				}}
			/>
		</div>
	);
}
