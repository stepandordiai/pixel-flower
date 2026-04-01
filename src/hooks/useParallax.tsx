import { useRef, useState, useEffect } from "react";

export default function useParallax(speed = 0.4, threshold = 300) {
	const [visible, setVisible] = useState(false);
	const offsetRef = useRef(0);
	const targetRef = useRef(0);
	const rafRef = useRef<number>(0);
	const elementRef = useRef<HTMLImageElement>(null);
	const visibleRef = useRef(false);

	useEffect(() => {
		const updateTarget = () => {
			const scrollY = window.scrollY;

			if (scrollY >= threshold) {
				visibleRef.current = true;
				setVisible(true);
				targetRef.current = (scrollY - threshold) * speed;
			} else {
				visibleRef.current = false;
				setVisible(false);
				targetRef.current = 0;
			}
		};

		const animate = () => {
			const diff = targetRef.current - offsetRef.current;

			// only update DOM if difference is visible
			if (Math.abs(diff) > 0.1) {
				offsetRef.current += diff * 0.06;

				if (elementRef.current) {
					elementRef.current.style.transform = `translateY(-${offsetRef.current}px)`;
				}
			}

			rafRef.current = requestAnimationFrame(animate);
		};

		window.addEventListener("scroll", updateTarget, { passive: true });
		window.addEventListener("touchmove", updateTarget, { passive: true });
		window.addEventListener("touchend", updateTarget, { passive: true });

		rafRef.current = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("scroll", updateTarget);
			window.removeEventListener("touchmove", updateTarget);
			window.removeEventListener("touchend", updateTarget);
			cancelAnimationFrame(rafRef.current);
		};
	}, [speed, threshold]);

	return { visible, elementRef };
}
