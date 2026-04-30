"use client";

import { CSSProperties, useEffect, useState } from "react";
import { Lobster, Alex_Brush } from "next/font/google";
import templates from "@/data/templates.json";
import { useRef } from "react";
import classNames from "classnames";
import HandIcon from "@/components/icons/HandIcon";
import styles from "./styles.module.scss";

const cormorantInfant = Lobster({
	weight: ["400"],
	variable: "--font-cormorant-infant",
	subsets: ["latin", "cyrillic"],
});

const alexBrush = Alex_Brush({
	weight: ["400"],
	variable: "--font-cormorant-infant",
	subsets: ["latin"],
});

const template = templates.find((template) => template.id === "wedding-4")!;

// TODO: learn this
function helper(time: number, one: string, two: string, five: string): string {
	const abs = Math.abs(time);
	const lastDigit = abs % 10;
	const lastTwoDigits = abs % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return five;
	}

	if (lastDigit === 1) {
		return one;
	}

	if (lastDigit >= 2 && lastDigit <= 4) {
		return two;
	}

	return five;
}

// TODO: learn this
const getMonthName = (date: Date) => {
	const nominative = date.toLocaleDateString("uk-UA", { month: "long" });

	const genitive = date
		.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })
		.replace(/^\d+\s*/, "");

	return { nominative, genitive };
};

export default function Wedding3ClientTemplate() {
	const [playing, setPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const fakeDate = new Date();
	fakeDate.setDate(fakeDate.getDate() + 3);

	// TODO:
	function getDaysOfMonth(year: any, month: any) {
		// month is 0-indexed in JS (0 = January, 1 = February, ...)
		const days1 = [];
		const date1 = new Date(year, month, 1); // start of month

		while (date1.getMonth() === month) {
			days1.push(new Date(date1)); // push a copy of the current day
			date1.setDate(date1.getDate() + 1); // move to next day
		}

		return days1;
	}

	const days2 = [];

	const firstDay = new Date(2025, 7, 1); // August 1, 2025
	let startWeekday = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ...

	const febDayNumbers = getDaysOfMonth(2025, 7).map((d) => d.getDate());

	startWeekday = (startWeekday + 6) % 7; // now Monday=0, Tuesday=1, ...

	for (let i = 0; i < startWeekday; i++) {
		days2.push(null); // empty slot
	}

	days2.push(...febDayNumbers);

	const [animate, setAnimate] = useState(false);
	const pathRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// TODO: learn this
						entry.target.classList.add(styles["animate--active"]);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 },
		);

		document.querySelectorAll(`.${styles.animate}`).forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	const targetDate: any = new Date(fakeDate);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		let interval = setInterval(() => {
			const date: any = new Date();
			const dateDifference = targetDate - date;
			setDays(Math.floor(dateDifference / 1000 / 60 / 60 / 24));
			setHours(Math.floor((dateDifference / 1000 / 60 / 60) % 24));
			setMinutes(Math.floor((dateDifference / 1000 / 60) % 60));
			setSeconds(Math.floor((dateDifference / 1000) % 60));

			if (dateDifference <= 0) {
				clearInterval(interval);
				setDays(0);
				setHours(0);
				setMinutes(0);
				setSeconds(0);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const { nominative, genitive } = getMonthName(fakeDate);

	const togglePlay = () => {
		if (playing) {
			audioRef.current?.pause();
		} else {
			audioRef.current?.play();
		}

		setPlaying((prev) => !prev);
	};

	const [preview, setPreview] = useState(true);

	const handlePreview = () => {
		setAnimate(true);
		audioRef.current?.play();

		setTimeout(() => {
			setPlaying(true);
			setPreview(false);
			document.documentElement.style.overflow = "";
		}, 3000);
	};

	useEffect(() => {
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, []);

	useEffect(() => {
		if (!pathRef) return;
		const len = pathRef.current?.getTotalLength();

		console.log(len);
	}, []);

	return (
		<>
			<div
				className={classNames(styles.preview, {
					[styles["preview--hidden"]]: !preview,
				})}
			>
				<div
					style={{
						background: "var(--accent-clr)",
						position: "absolute",
						inset: "5px 0 0 0",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<svg
						width="184"
						height="83"
						viewBox="0 0 184 83"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<style>{`
								@keyframes drawK {
								0% { stroke-dashoffset: 1407; }
								100% { stroke-dashoffset: 0; }
								}

								.logo {
								stroke-dasharray: 1407;
								stroke-dashoffset: 1407;
								animation: ${animate ? "drawK 10s ease forwards" : "none"} 
								}
							`}</style>
						<path
							ref={pathRef}
							className="logo"
							d="M26.2391 82.3041C20.6071 82.3041 15.1884 81.1947 9.98309 78.9761C3.32709 76.1601 -0.000906244 72.2774 -0.000906244 67.3281C-0.000906244 61.6107 2.72976 56.9174 8.19109 53.2481C10.6658 51.6267 13.2258 50.4321 15.8711 49.6641C18.5164 48.8107 21.2898 48.2987 24.1911 48.1281C25.6418 44.7147 27.4338 40.7467 29.5671 36.2241C31.7858 31.7014 33.9618 27.4774 36.0951 23.5521C36.7778 22.3574 37.6738 20.7787 38.7831 18.8161C39.8924 16.7681 41.2151 14.5921 42.7511 12.2881C44.0311 10.4107 46.2071 9.47205 49.2791 9.47205C50.4738 9.47205 51.0711 9.81339 51.0711 10.4961C51.0711 10.6667 50.9858 10.9227 50.8151 11.2641C42.7938 22.1014 35.3698 34.3894 28.5431 48.1281C47.7431 48.4694 62.0364 52.7787 71.4231 61.0561C74.1538 57.3867 75.5191 54.0161 75.5191 50.9441C75.5191 45.5681 71.8924 41.3441 64.6391 38.2721C59.0071 35.9681 53.0338 34.8161 46.7191 34.8161H43.7751C42.6658 34.8161 42.1111 34.4321 42.1111 33.6641C42.1111 32.1281 43.3484 31.1467 45.8231 30.7201C46.2498 30.6347 47.1031 30.5067 48.3831 30.3361C49.7484 30.1654 50.9431 29.9947 51.9671 29.8241C62.2924 27.7761 69.8444 24.4907 74.6231 19.9681C76.5858 18.1761 77.5671 16.5547 77.5671 15.1041C77.5671 12.0321 73.5991 9.72806 65.6631 8.19205C60.2871 7.16805 54.7404 6.65605 49.0231 6.65605C33.7484 6.65605 19.4124 9.42939 6.01509 14.9761C5.50309 15.1467 5.16176 15.2321 4.99109 15.2321C4.30843 15.2321 3.96709 14.8907 3.96709 14.2081C3.96709 13.0987 4.52176 11.9894 5.63109 10.8801C6.82576 9.60005 7.93509 8.74672 8.95909 8.32005C17.8338 4.73605 29.1404 2.94405 42.8791 2.94405C51.0711 2.94405 58.6658 3.71205 65.6631 5.24805C76.5858 7.55206 82.0471 11.2214 82.0471 16.2561C82.0471 20.3521 78.7191 24.0641 72.0631 27.3921C67.1991 29.8667 62.0364 31.5734 56.5751 32.5121C62.6338 33.8774 67.8391 35.8827 72.1911 38.5281C78.1644 42.1121 81.1511 46.4214 81.1511 51.4561C81.1511 55.5521 79.0604 59.9467 74.8791 64.6401C77.3538 67.6267 78.5911 69.8027 78.5911 71.1681C78.5911 72.3627 78.1218 72.9601 77.1831 72.9601C76.7564 72.9601 76.4151 72.7467 76.1591 72.3201C75.5618 71.1254 74.9644 70.1014 74.3671 69.2481C73.7698 68.3947 73.1724 67.6694 72.5751 67.0721C67.1138 72.1921 59.8604 76.1174 50.8151 78.8481C43.0498 81.1521 34.8578 82.3041 26.2391 82.3041ZM26.2391 79.4881C45.1831 79.4881 59.4764 74.2827 69.1191 63.8721C64.3404 59.8614 58.3244 56.7041 51.0711 54.4001C44.3298 52.2667 37.5458 51.2001 30.7191 51.2001C30.1218 51.2001 29.4818 51.2001 28.7991 51.2001C28.2018 51.2001 27.6044 51.2427 27.0071 51.3281C21.8871 62.1654 19.3271 69.4614 19.3271 73.2161C19.3271 73.6427 19.3698 73.9841 19.4551 74.2401C19.5404 74.4961 19.5831 74.8374 19.5831 75.2641C19.5831 76.3734 19.1138 76.9281 18.1751 76.9281C16.8098 76.9281 16.1271 75.7761 16.1271 73.4721C16.1271 69.6321 18.3031 62.4214 22.6551 51.8401C11.3058 53.7174 5.63109 58.9654 5.63109 67.5841C5.63109 71.4241 8.23376 74.4961 13.4391 76.8001C17.5351 78.5921 21.8018 79.4881 26.2391 79.4881ZM98.4161 82.1761C93.8081 82.1761 90.0961 81.1521 87.2801 79.1041C83.9521 76.8001 82.2881 73.4721 82.2881 69.1201C82.2881 64.1707 84.3788 59.6054 88.5601 55.4241C92.2294 51.7547 96.6668 49.1947 101.872 47.7441C106.139 46.5494 111.685 45.6534 118.512 45.0561C125.339 44.4587 133.403 44.2027 142.704 44.2881C145.093 41.4721 147.056 39.1681 148.592 37.3761C150.128 35.4987 151.451 33.8774 152.56 32.5121C153.669 31.1467 154.736 29.8241 155.76 28.5441C156.869 27.1787 158.107 25.5574 159.472 23.6801L166.64 14.0801C167.067 13.6534 167.451 13.4401 167.792 13.4401C168.901 13.4401 169.456 13.9521 169.456 14.9761C169.456 15.0614 169.371 15.3601 169.2 15.8721L161.264 26.4961C160.752 27.1787 159.899 28.2881 158.704 29.8241C157.509 31.3601 156.229 33.0667 154.864 34.9441C153.499 36.8214 152.133 38.6134 150.768 40.3201C149.488 42.0267 148.464 43.3921 147.696 44.4161C149.829 44.5014 151.92 44.7147 153.968 45.0561C156.101 45.3974 158.192 45.7814 160.24 46.2081C162.629 35.4561 165.701 25.3014 169.456 15.7441C170.053 14.2934 170.736 12.7147 171.504 11.0081C172.272 9.21605 173.296 7.04005 174.576 4.48006C174.832 3.88272 175.984 2.98672 178.032 1.79205C179.995 0.597387 181.317 5.34058e-05 182 5.34058e-05C182.768 5.34058e-05 183.152 0.384054 183.152 1.15205C183.152 1.40806 182.939 1.87739 182.512 2.56005C175.173 14.7627 169.157 29.6961 164.464 47.3601C168.304 48.4694 170.224 49.5787 170.224 50.6881C170.224 51.5414 169.755 51.9681 168.816 51.9681C168.731 51.9681 168.432 51.8827 167.92 51.7121C167.408 51.4561 166.939 51.2854 166.512 51.2001C165.829 50.8587 165.232 50.6454 164.72 50.5601C164.208 50.3894 163.867 50.2614 163.696 50.1761C162.501 55.2961 161.563 59.9041 160.88 64.0001C160.283 68.0107 159.984 71.5094 159.984 74.4961C159.984 77.3974 160.411 78.8481 161.264 78.8481C162.032 78.8481 163.056 78.3361 164.336 77.3121C165.701 76.2027 166.512 75.6481 166.768 75.6481C167.536 75.6481 167.92 76.1174 167.92 77.0561C167.92 77.9947 167.109 78.9334 165.488 79.8721C163.867 80.8961 162.459 81.4081 161.264 81.4081C158.021 81.4081 156.4 78.7201 156.4 73.3441C156.4 70.6134 156.656 67.2427 157.168 63.2321C157.68 59.2214 158.491 54.6134 159.6 49.4081C157.467 49.0667 155.12 48.8534 152.56 48.7681C150.085 48.5974 147.397 48.4694 144.496 48.3841C143.216 50.0054 141.765 51.7547 140.144 53.6321C138.523 55.5094 136.603 57.6001 134.384 59.9041C131.568 62.9761 129.221 65.4507 127.344 67.3281C125.467 69.2054 123.845 70.7414 122.48 71.9361C121.2 73.0454 119.92 74.0694 118.64 75.0081C112.24 79.7867 105.499 82.1761 98.4161 82.1761ZM96.8801 77.1841C103.28 77.1841 109.637 75.0507 115.952 70.7841C117.915 69.4187 120.176 67.5841 122.736 65.2801C125.381 62.8907 128.197 60.1174 131.184 56.9601C132.293 55.7654 133.488 54.5281 134.768 53.2481C136.048 51.8827 137.499 50.2614 139.12 48.3841H135.536C128.197 48.3841 121.755 48.6401 116.208 49.1521C110.661 49.5787 106.011 50.3041 102.256 51.3281C100.123 51.9254 98.0748 52.7787 96.1121 53.8881C94.2348 54.9974 92.5708 56.2347 91.1201 57.6001C87.5361 61.0134 85.7441 64.7681 85.7441 68.8641C85.7441 71.5094 86.9388 73.6427 89.3281 75.2641C91.3761 76.5441 93.8934 77.1841 96.8801 77.1841Z"
							stroke="#000"
							strokeWidth="2"
						/>
					</svg>
				</div>
				<div
					onClick={handlePreview}
					className={classNames(styles["preview-bottom"], {
						[styles["preview-bottom--animate"]]: animate,
					})}
				>
					<span>Торнкніться щоб розпочати</span>
				</div>
			</div>
			<button onClick={togglePlay} className={styles["music-btn"]}>
				<div className={styles["equalizer-wrapper"]}>
					<div
						className={classNames(styles.equalizer, {
							[styles["paused"]]: !playing,
						})}
					>
						<span />
						<span />
						<span />
						<span />
					</div>
				</div>
			</button>
			<audio
				ref={audioRef}
				src={template.song}
				loop
				// TODO: learn this
				preload="auto"
			></audio>
			<main className={`${styles.main}  ${cormorantInfant.variable}`}>
				<section className={styles.hero}>
					{/* <div className={styles["hero-hint"]}>
						<HandIcon size={32} />
					</div> */}
					<div className={`${styles["hero-container"]}`}>
						<div className={styles["hero-container-header"]}>
							<div>
								<svg
									width="24"
									height="24"
									viewBox="0 0 256 256"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M128.001 0C139.977 64.8783 191.122 116.025 256 128.001C191.123 139.978 139.978 191.123 128.001 256C116.025 191.122 64.8783 139.977 0 128.001C64.8791 116.026 116.026 64.8791 128.001 0Z" />
								</svg>
							</div>
							<div>Save the Date</div>
							<div>
								<svg
									width="24"
									height="24"
									viewBox="0 0 256 256"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M128.001 0C139.977 64.8783 191.122 116.025 256 128.001C191.123 139.978 139.978 191.123 128.001 256C116.025 191.122 64.8783 139.977 0 128.001C64.8791 116.026 116.026 64.8791 128.001 0Z" />
								</svg>
							</div>
						</div>
						<div className={styles["hero-container-main"]}>
							<p
								className={classNames(
									styles["setion__title"],
									alexBrush.className,
									{
										[styles["active"]]: !preview,
									},
								)}
								style={{ fontSize: "3rem", opacity: 0 }}
							>
								Wedding day
							</p>
							<div className={styles["hero__img-container"]}>
								<img
									className={styles["hero__img"]}
									src="/wedding-4/03.jpg"
									alt=""
								/>
							</div>
							<p style={{ textAlign: "center", fontSize: "3rem" }}>
								Bohdan
								<br />
								and
								<br />
								Anzhelika
							</p>
						</div>
						<div className={styles["hero-container-footer"]}>
							<div>
								<svg
									width="24"
									height="24"
									viewBox="0 0 256 256"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M128.001 0C139.977 64.8783 191.122 116.025 256 128.001C191.123 139.978 139.978 191.123 128.001 256C116.025 191.122 64.8783 139.977 0 128.001C64.8791 116.026 116.026 64.8791 128.001 0Z" />
								</svg>
							</div>
							<div>{`${fakeDate.getDate()}/${fakeDate.getMonth() + 1}/${fakeDate.getFullYear()}`}</div>
							<div>
								<svg
									width="24"
									height="24"
									viewBox="0 0 256 256"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M128.001 0C139.977 64.8783 191.122 116.025 256 128.001C191.123 139.978 139.978 191.123 128.001 256C116.025 191.122 64.8783 139.977 0 128.001C64.8791 116.026 116.026 64.8791 128.001 0Z" />
								</svg>
							</div>
						</div>
					</div>
				</section>
				<section className={styles.section}>
					<div
						style={{
							backgroundColor: "var(--accent-clr)",
							width: "100%",
							padding: "100px 0",
							color: "#fff",
						}}
					>
						<p className={`${styles["section__title"]} ${styles.animate}`}>
							Дорога сім'я Копилець
						</p>
					</div>
					{/* <img
						className={styles.animate}
						src="/wedding-three/02-c.png"
						width={256}
						height={256}
						alt=""
					/> */}
					<p className={`${styles.txt} ${styles.animate}`}>
						З глибокою радістю та трепетом у серці запрошуємо вас розділити з
						нами один із найважливіших днів нашого життя. День, коли любов стане
						обіцянкою — щирою, вічною та незмінною.
					</p>
					<p style={{ fontSize: "24px" }} className={styles.animate}>
						{`${fakeDate.getDate()} ${genitive.charAt(0).toUpperCase() + genitive.slice(1)} ${fakeDate.getFullYear()}`}
					</p>
					<div className={`${styles.calendar} ${styles.animate}`}>
						<div className={styles["calendar-inner"]}>
							<div>Пн</div>
							<div>Вт</div>
							<div>Ср</div>
							<div>Чт</div>
							<div>Пт</div>
							<div>Сб</div>
							<div>Нд</div>
							{days2.map((day, index) => {
								return (
									<div
										key={index}
										className={
											day == fakeDate.getDate() ? styles["target-time"] : ""
										}
									>
										{day}
										{day == fakeDate.getDate() && (
											<svg
												style={{
													position: "absolute",
													transform: "translateY(2px)",
													width: "100%",
													height: "100%",
													color: "var(--accent-clr)",
												}}
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												className="bi bi-heart"
												viewBox="0 0 16 16"
											>
												<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
											</svg>
										)}
									</div>
								);
							})}
						</div>
					</div>
					<p className={`${styles.txt} ${styles.animate}`}>
						Будемо щасливі бачити вас серед тих, хто розділить з нами цю
						незабутню мить.
					</p>
				</section>
				<section className={styles.section}>
					<img
						className={styles.animate}
						src="/wedding-three/03-c.png"
						width={256}
						alt=""
					/>
					<p className={`${styles["section__title"]} ${styles.animate}`}>
						Адреси святкування
					</p>
					<div className={styles.addresses}>
						{template.addresses.map((address, i) => {
							return (
								<div key={i} className={styles.address}>
									<p
										style={{ display: "flex", flexDirection: "column" }}
										className={styles.animate}
									>
										<span className={styles.txt} style={{ fontSize: "2rem" }}>
											{address.title}
										</span>
										<span style={{ fontSize: "24px" }} className={styles.txt}>
											{`${address.time} (${template.location_time})`}
										</span>
									</p>
									<span
										className={styles.animate}
										style={{
											border: "3px solid var(--accent-clr)",
											alignSelf: "center",
											width: "50px",
											height: "50px",
											borderRadius: "50%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="currentColor"
											className="bi bi-building"
											viewBox="0 0 16 16"
										>
											<path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
											<path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
										</svg>
									</span>
									<p className={`${styles.txt} ${styles.animate}`}>
										{address.address_title}
									</p>
									<span
										style={{
											border: "3px solid var(--accent-clr)",
											alignSelf: "center",
											width: "50px",
											height: "50px",
											borderRadius: "50%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
										className={styles.animate}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="currentColor"
											className="bi bi-geo-alt"
											viewBox="0 0 16 16"
										>
											<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
											<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
										</svg>
									</span>
									<a
										className={`${styles.txt} ${styles.animate}`}
										style={{ color: "#000" }}
										href={address.address}
										target="_blank"
									>
										{address.address}
									</a>
									<iframe
										className={styles["address__map"]}
										src={address.address_url}
										// loading="lazy"
									></iframe>
									<a
										className={styles.link}
										href={address.address_destination_url}
										target="_blank"
									>
										Отримати маршрут
									</a>
								</div>
							);
						})}
					</div>
				</section>
				<section className={styles.section}>
					<img
						className={styles.animate}
						src="/wedding-three/04-c.png"
						width={256}
						alt=""
					/>
					<p className={`${styles["section__title"]} ${styles.animate}`}>
						До нашого весілля залишилось
					</p>
					<div className={styles.countdown} id="date">
						<div className="animated-element">
							<span
								style={
									{
										"--procent": `${((days / 365) * 100).toFixed(1)}%`,
									} as CSSProperties
								}
								className={`${styles["countdown-circle"]} ${styles.animate}`}
							>
								{days}
							</span>
							<span className={`${styles.txt} ${styles.animate}`}>
								{helper(hours, "день", "дні", "днів")}
							</span>
						</div>
						<div className="animated-element">
							<span
								style={
									{
										"--procent": `${((hours / 24) * 100).toFixed(1)}%`,
									} as CSSProperties
								}
								className={`${styles["countdown-circle"]} ${styles.animate}`}
							>
								{hours}
							</span>
							<span className={`${styles.txt} ${styles.animate}`}>
								{helper(hours, "година", "години", "годин")}
							</span>
						</div>
						<div>
							<span
								style={
									{
										"--procent": `${((minutes / 60) * 100).toFixed(1)}%`,
									} as CSSProperties
								}
								className={`${styles["countdown-circle"]} ${styles.animate}`}
							>
								{minutes}
							</span>
							<span className={`${styles.txt} ${styles.animate}`}>
								{helper(minutes, "хвилина", "хвилини", "хвилин")}
							</span>
						</div>
						<div className="animated-element">
							<span
								style={
									{
										"--procent": `${((seconds / 60) * 100).toFixed(1)}%`,
									} as CSSProperties
								}
								className={`${styles["countdown-circle"]} ${styles.animate}`}
							>
								{seconds}
							</span>
							<span className={`${styles.txt} ${styles.animate}`}>
								{helper(seconds, "секунда", "секунди", "секунд")}
							</span>
						</div>
					</div>
				</section>
				<section className={styles.section}>
					<img
						className={styles.animate}
						src="/wedding-three/05-c.png"
						width={256}
						alt=""
					/>
					<p className={`${styles.txt} ${styles.animate}`}>
						Чекаємо на вас з нетерепінням і любов'ю
						<br />
						<span style={{ fontSize: "2rem" }}>
							{template.hisName} та {template.herName}
						</span>
					</p>
				</section>
			</main>
		</>
	);
}
