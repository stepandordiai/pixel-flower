"use client";

import { useEffect } from "react";
import styles from "./WeddingThree.module.scss";
import { Alex_Brush } from "next/font/google";
// import { useRef, useEffect } from "react";

const alexBrush = Alex_Brush({
	weight: ["400"],
	variable: "--font-caveat",
	subsets: ["latin"],
});

const WeddingThree = () => {
	useEffect(() => {
		document.body.classList.add(styles.black);

		return () => document.body.classList.remove(styles.black);
	}, []);
	// const leftRef = useRef<HTMLImageElement>(null);
	// const rightRef = useRef<HTMLImageElement>(null);

	// useEffect(() => {
	// 	let current = 0;
	// 	let target = 0;
	// 	let stopped = false;

	// 	const maxRotation = 180;
	// 	const speed = 0.2; // 10% smoothing

	// 	const onScroll = () => {
	// 		if (stopped) return;

	// 		const maxScroll = window.innerHeight * 1.5;
	// 		target = Math.min(window.scrollY / maxScroll, 1);
	// 	};

	// 	const animate = () => {
	// 		if (stopped) return;

	// 		current += (target - current) * speed;

	// 		// Clamp hard stop
	// 		if (current >= 0.999) {
	// 			current = 1;
	// 			stopped = true;

	// 			// final transform (safety)
	// 			leftRef.current!.style.transform = `rotateY(-180deg)`;
	// 			rightRef.current!.style.transform = `rotateY(180deg)`;

	// 			window.removeEventListener("scroll", onScroll);
	// 			return;
	// 		}

	// 		const rotation = current * maxRotation;

	// 		if (leftRef.current) {
	// 			leftRef.current.style.transform = `rotateY(${-rotation}deg)`;
	// 		}

	// 		if (rightRef.current) {
	// 			rightRef.current.style.transform = `rotateY(${rotation}deg)`;
	// 		}

	// 		requestAnimationFrame(animate);
	// 	};

	// 	window.addEventListener("scroll", onScroll);
	// 	animate();

	// 	return () => {
	// 		window.removeEventListener("scroll", onScroll);
	// 	};
	// }, []);

	return (
		<>
			{/* <img
				// ref={leftRef}
				className={styles["paper-left"]}
				src="/wedding-three/paper.jpg"
				alt=""
			/>
			<img
				// ref={rightRef}
				className={styles["paper-right"]}
				src="/wedding-three/paper.jpg"
				alt=""
			/> */}
			<main className={styles.main}>
				<div className={styles.hero}>
					<img src="/wedding-three/01.jpg" alt="" />
					<div className={styles["hero-container"]}>
						<p style={{ fontSize: "18px" }}>03 / 05 / 2026</p>
						<div className={styles["hero__img-wrapper"]}>
							<img src="/wedding-three/heart.png" alt="" />
						</div>
						<p className={styles["hero__heading"]}>Stepan & Andriana</p>
					</div>
				</div>
			</main>
		</>
	);
};

export default WeddingThree;
