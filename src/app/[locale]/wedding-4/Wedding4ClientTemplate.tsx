"use client";

import { CSSProperties, useEffect, useState } from "react";
import { Ephesis, Comfortaa, Great_Vibes } from "next/font/google";
import templates from "@/data/templates.json";
import { useRef } from "react";
import classNames from "classnames";
import HandIcon from "@/components/icons/HandIcon";
import { getMonthName } from "@/helpers/getMonthName";
import { getPluralForm } from "@/helpers/getPluralForm";
import styles from "./styles.module.scss";

const cormorantInfant = Comfortaa({
	weight: ["400"],
	variable: "--font-cormorant-infant",
	subsets: ["latin"],
});

const alexBrush = Ephesis({
	weight: ["400"],
	variable: "--font-alex-brush",
	subsets: ["latin"],
});

const greatVibes = Great_Vibes({
	weight: ["400"],
	variable: "--font-great-vibes",
	subsets: ["cyrillic"],
});

const template = templates.find((template) => template.id === "wedding-4")!;

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

	const { genitive } = getMonthName(fakeDate);

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

	return (
		<>
			<div
				className={classNames(styles.preview, {
					[styles["preview--hidden"]]: !preview,
				})}
			>
				<div
					style={{
						background: "#fff",
						position: "absolute",
						inset: "5px 0 0 0",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<p className={`${styles["preview__txt"]}  ${greatVibes.variable}`}>
						Запрошення на Весілля
					</p>
					<svg
						width="200"
						viewBox="0 0 392 103"
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
								animation: ${animate ? "drawK 8s ease forwards" : "none"} 
								}
							`}</style>
						<path
							className="logo"
							d="M11.3915 94.72C3.7968 94.72 -0.000531197 89.472 -0.000531197 78.976C-0.000531197 73.5147 1.06614 67.7547 3.19947 61.696C5.16214 55.8934 7.42347 51.712 9.98347 49.152C11.6048 47.5307 12.9275 46.72 13.9515 46.72C15.0608 46.72 15.9141 47.7867 16.5115 49.92C17.1088 51.968 17.6635 54.1014 18.1755 56.32C20.9061 66.1334 25.2581 73.9414 31.2315 79.744C38.7408 72.7467 46.6768 63.1894 55.0395 51.072L49.6635 50.432C47.4448 49.92 46.3355 49.0667 46.3355 47.872C46.3355 46.4214 47.3595 45.824 49.4075 46.08C50.3461 46.2507 51.4981 46.3787 52.8635 46.464C54.3141 46.5494 55.9781 46.6347 57.8555 46.72C59.9888 43.5627 61.7808 40.7467 63.2315 38.272C64.7675 35.7974 65.9621 33.6214 66.8155 31.744C68.4368 28.0747 70.8261 24.704 73.9835 21.632C76.7995 19.072 79.0608 17.792 80.7675 17.792C81.7061 17.792 82.1755 18.304 82.1755 19.328C82.1755 21.0347 80.9381 23.7654 78.4635 27.52C76.5008 30.6774 74.3675 33.8774 72.0635 37.12C69.7595 40.2774 67.3701 43.52 64.8955 46.848C69.5035 46.592 74.1115 45.9947 78.7195 45.056C83.3275 44.1174 87.5941 42.7947 91.5195 41.088C95.4448 39.296 98.6448 37.0347 101.119 34.304C103.679 31.5734 105.13 28.2454 105.471 24.32C105.642 21.8454 105.087 19.4987 103.807 17.28C102.527 15.0614 100.65 13.0134 98.1755 11.136C92.6288 6.69868 84.9488 4.05335 75.1355 3.20002C72.7461 2.94402 70.2288 2.81602 67.5835 2.81602C54.3568 2.81602 42.2395 5.50402 31.2315 10.88C20.3088 16.1707 14.8475 21.76 14.8475 27.648C14.8475 30.8907 16.9808 33.7494 21.2475 36.224C22.9541 36.9067 23.8075 37.4187 23.8075 37.76C23.8075 38.1867 23.1248 38.4 21.7595 38.4C19.2848 38.4 17.2795 38.1014 15.7435 37.504C9.1728 34.2614 5.88747 30.3787 5.88747 25.856C5.88747 19.456 11.4768 13.6107 22.6555 8.32001C34.5168 2.77335 48.2981 1.52588e-05 63.9995 1.52588e-05C66.9008 1.52588e-05 70.3995 0.170682 74.4955 0.512016C78.5915 0.768018 82.8155 1.32269 87.1675 2.17602C91.5195 3.02935 95.5728 4.35202 99.3275 6.14402C103.167 7.85069 106.282 10.1547 108.671 13.056C111.061 15.9574 112.255 19.6267 112.255 24.064C112.255 27.5627 111.231 30.6774 109.183 33.408C107.221 36.0534 104.575 38.3574 101.247 40.32C98.0048 42.2827 94.3781 43.9467 90.3675 45.312C86.4421 46.592 82.4741 47.616 78.4635 48.384C74.5381 49.0667 70.9541 49.4934 67.7115 49.664C71.9781 49.92 76.5008 50.2614 81.2795 50.688C86.0581 51.1147 90.5381 51.84 94.7195 52.864C98.9861 53.8027 102.442 55.2107 105.087 57.088C107.818 58.9654 109.183 61.5254 109.183 64.768C109.183 68.1814 108.33 71.5094 106.623 74.752C105.002 77.9947 102.357 81.1094 98.6875 84.096C90.0688 91.1787 78.6341 94.72 64.3835 94.72C61.3968 94.72 58.2821 94.5494 55.0395 94.208C51.8821 93.8667 48.5968 93.3547 45.1835 92.672C39.7221 91.4774 34.5595 88.7467 29.6955 84.48C21.9301 91.3067 15.8288 94.72 11.3915 94.72ZM63.1035 91.136C74.1968 91.136 83.6261 88.192 91.3915 82.304C98.0475 77.184 101.375 72.064 101.375 66.944C101.375 64.0427 100.181 61.6107 97.7915 59.648C95.4875 57.6854 92.5435 56.1494 88.9595 55.04C85.4608 53.9307 81.7915 53.12 77.9515 52.608C74.1968 52.096 70.7835 51.7974 67.7115 51.712C64.6395 51.6267 62.5061 51.6267 61.3115 51.712C58.3248 55.6374 54.4848 60.0747 49.7915 65.024C45.0981 69.9734 39.5088 75.4347 33.0235 81.408C37.2048 85.248 41.8981 87.808 47.1035 89.088C52.4795 90.4534 57.8128 91.136 63.1035 91.136ZM12.1595 90.752C16.4261 90.752 21.6741 88.064 27.9035 82.688C20.9061 76.4587 16.0421 69.76 13.3115 62.592C12.7995 61.312 12.2448 60.672 11.6475 60.672C10.6235 60.672 9.38614 62.4214 7.93547 65.92C6.82614 68.8214 5.93014 72.064 5.24747 75.648C4.99147 77.0134 4.86347 78.4214 4.86347 79.872C4.86347 87.1254 7.29547 90.752 12.1595 90.752ZM202.341 89.216C202.171 89.216 202 89.1307 201.829 88.96C200.72 87.5947 199.397 85.9734 197.861 84.096C196.325 82.1334 194.576 79.8294 192.613 77.184C190.139 78.6347 187.451 80 184.549 81.28C181.648 82.56 178.576 83.6694 175.333 84.608C168.592 86.656 162.405 87.68 156.773 87.68C150.288 87.68 145.296 86.1867 141.797 83.2C138.64 80.5547 137.061 77.0134 137.061 72.576C137.061 68.224 138.512 63.6587 141.413 58.88C144.4 54.1014 148.453 49.8774 153.573 46.208C155.707 44.8427 158.437 43.0507 161.765 40.832C165.179 38.6134 169.147 36.0107 173.669 33.024C173.328 31.232 173.072 29.5254 172.901 27.904C172.731 26.2827 172.645 24.7894 172.645 23.424C172.645 11.5627 178.149 4.94935 189.157 3.58401C189.413 3.58401 189.627 3.58401 189.797 3.58401C190.053 3.49868 190.309 3.45602 190.565 3.45602C192.784 3.45602 194.533 4.13868 195.813 5.50401C197.093 6.78402 197.733 8.53335 197.733 10.752C197.733 14.592 196.027 18.3894 192.613 22.144C190.736 24.192 188.517 26.368 185.957 28.672C183.397 30.8907 180.496 33.2374 177.253 35.712C177.424 38.3574 177.808 41.0454 178.405 43.776C180.283 43.3494 182.416 42.9654 184.805 42.624C187.195 42.1974 189.883 41.856 192.869 41.6C196.539 41.2587 199.397 41.0027 201.445 40.832C203.493 40.576 204.688 40.4054 205.029 40.32C207.675 39.8934 209.979 39.4667 211.941 39.04C213.904 38.6134 215.483 38.1867 216.677 37.76C222.821 35.712 225.936 32.896 226.021 29.312C226.021 28.032 226.533 27.392 227.557 27.392C228.496 27.392 228.965 28.5867 228.965 30.976C228.965 34.7307 225.125 37.76 217.445 40.064C213.264 41.344 208.528 42.368 203.237 43.136C206.992 44.5867 208.869 47.8294 208.869 52.864C208.869 53.4614 208.827 54.1014 208.741 54.784C208.741 55.3814 208.699 56.0214 208.613 56.704C207.76 63.5307 203.408 69.7174 195.557 75.264L203.749 85.376C203.92 85.7174 204.005 86.0587 204.005 86.4C204.005 88.2774 203.451 89.216 202.341 89.216ZM176.997 30.72C187.152 23.4667 192.571 17.2374 193.253 12.032V11.52C193.253 10.496 192.955 9.51468 192.357 8.57602C191.504 7.04002 190.096 6.27202 188.133 6.27202C187.792 6.27202 187.451 6.31468 187.109 6.40002C186.768 6.40002 186.427 6.44268 186.085 6.52802C183.099 7.29602 180.752 10.1973 179.045 15.232C177.68 19.4134 176.997 24.576 176.997 30.72ZM162.277 84.096C164.752 84.096 167.525 83.84 170.597 83.328C177.765 82.1334 184.507 79.2747 190.821 74.752C184.08 65.792 179.472 57.0027 176.997 48.384C171.28 51.2854 168.421 55.0827 168.421 59.776C168.421 61.9094 169.445 63.8294 171.493 65.536C172.347 66.304 172.56 66.816 172.133 67.072C171.792 67.2427 171.579 67.328 171.493 67.328C171.237 67.328 170.853 67.1574 170.341 66.816C168.891 65.6214 167.696 64.64 166.757 63.872C165.904 63.0187 165.264 62.3787 164.837 61.952C163.472 60.5014 162.875 58.9654 163.045 57.344C163.813 51.2854 168.08 46.976 175.845 44.416L175.461 42.496L174.437 37.76C170.768 40.4054 165.392 44.6294 158.309 50.432C155.408 52.992 152.848 56.32 150.629 60.416C148.155 64.9387 146.917 69.0774 146.917 72.832C146.917 80.3414 152.037 84.096 162.277 84.096ZM193.509 72.576C199.397 67.712 202.811 62.5067 203.749 56.96C203.835 56.2774 203.877 55.6374 203.877 55.04C203.963 54.4427 204.005 53.8454 204.005 53.248C204.005 47.7867 201.531 44.672 196.581 43.904L192.485 44.416C189.925 44.7574 187.536 45.184 185.317 45.696C183.184 46.1227 181.221 46.6774 179.429 47.36C180.624 51.3707 182.373 55.5094 184.677 59.776C187.067 63.9574 190.011 68.224 193.509 72.576ZM263.792 102.528C258.843 102.528 254.363 101.632 250.352 99.84C246.427 98.048 243.227 95.616 240.752 92.544C236.912 87.7654 234.992 81.8347 234.992 74.752C234.992 69.7174 235.931 65.152 237.808 61.056C241.563 52.352 247.792 44.8854 256.496 38.656C265.115 32.512 273.52 29.44 281.712 29.44C286.832 29.44 291.142 30.72 294.64 33.28C298.139 35.84 299.888 39.5094 299.888 44.288C299.888 47.616 298.992 50.8587 297.2 54.016C295.494 57.088 293.318 59.136 290.672 60.16C290.502 60.16 290.331 60.1174 290.16 60.032C289.99 59.8614 289.947 59.7334 290.032 59.648C291.483 57.6 292.806 55.4667 294 53.248C295.195 50.944 295.792 48.4267 295.792 45.696C295.792 43.0507 294.982 40.7467 293.36 38.784C291.824 36.736 289.819 35.1574 287.344 34.048C284.955 32.8534 282.48 32.256 279.92 32.256C276.422 32.256 272.923 33.0667 269.424 34.688C265.926 36.3094 262.427 38.4427 258.928 41.088C251.419 46.976 246.299 54.528 243.568 63.744C242.288 67.84 241.648 71.808 241.648 75.648C241.648 82.9867 244.166 88.9174 249.2 93.44C251.248 95.232 253.424 96.5974 255.728 97.536C258.032 98.56 260.507 99.072 263.152 99.072C271.771 99.072 281.158 95.9147 291.312 89.6C301.552 83.3707 312.39 73.8987 323.824 61.184L312.176 61.44C308.507 61.3547 306.672 60.5867 306.672 59.136C306.672 57.4294 308.464 55.6374 312.048 53.76C313.499 53.248 314.48 52.992 314.992 52.992C315.76 52.992 316.23 53.5894 316.4 54.784C316.571 55.8934 316.955 56.5334 317.552 56.704C319.003 56.7894 320.539 56.8747 322.16 56.96C323.782 56.96 325.531 56.96 327.408 56.96C335.43 47.1467 342.683 38.9547 349.168 32.384C355.739 25.8133 361.84 20.5227 367.472 16.512C373.19 12.5014 378.694 9.51468 383.984 7.55202C384.752 7.21068 385.691 7.04002 386.8 7.04002C389.702 7.04002 391.152 7.93602 391.152 9.72802C391.152 10.496 390.726 11.3067 389.872 12.16C378.438 24.2774 370.075 38.7414 364.784 55.552C366.064 55.4667 367.259 55.3814 368.368 55.296C369.563 55.2107 370.672 55.0827 371.696 54.912C372.123 54.8267 372.464 54.784 372.72 54.784C373.062 54.784 373.403 54.784 373.744 54.784C375.28 54.784 376.048 54.9974 376.048 55.424C376.048 56.7894 372.038 57.7707 364.016 58.368C361.883 65.3654 360.816 71.8934 360.816 77.952C360.816 83.584 361.67 86.8694 363.376 87.808C363.547 87.8934 363.718 87.936 363.888 87.936C364.059 88.0214 364.23 88.064 364.4 88.064C365.168 88.064 365.936 87.68 366.704 86.912C367.558 86.0587 367.984 85.632 367.984 85.632C368.155 85.8027 368.24 86.1014 368.24 86.528C368.24 88.2347 367.686 89.856 366.576 91.392C365.552 92.928 364.315 93.696 362.864 93.696C361.926 93.696 360.987 93.312 360.048 92.544C357.403 90.4107 356.08 86.3574 356.08 80.384C356.08 79.7014 356.08 79.0187 356.08 78.336C356.08 77.568 356.123 76.8427 356.208 76.16C356.379 73.6854 356.678 70.9974 357.104 68.096C357.616 65.1947 358.256 62.0374 359.024 58.624L328.048 60.8C316.102 74.5387 304.795 84.9067 294.128 91.904C283.462 98.9867 273.35 102.528 263.792 102.528ZM331.504 56.96C334.747 56.8747 338.715 56.7467 343.408 56.576C348.187 56.4054 353.606 56.192 359.664 55.936C363.675 42.112 367.771 31.36 371.952 23.68C372.635 22.3147 373.36 20.992 374.128 19.712C374.982 18.432 375.835 17.1947 376.688 16C374.555 16.6827 372.166 17.8773 369.52 19.584C366.875 21.2053 364.358 22.9547 361.968 24.832C359.579 26.7094 357.616 28.3307 356.08 29.696C351.643 33.7067 347.419 38.0587 343.408 42.752C339.483 47.36 335.515 52.096 331.504 56.96Z"
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
			<main
				className={`${styles.main}  ${cormorantInfant.variable} ${alexBrush.variable}`}
			>
				<div>
					<section className={styles.hero}>
						<div className={styles["hero-hint"]}>
							<HandIcon size={32} />
						</div>
						<p
							className={classNames(
								styles["setion__title"],
								alexBrush.className,
								{
									[styles["active"]]: !preview,
								},
							)}
							style={{
								fontSize: "3rem",
								opacity: 0,
								color: "#fff",
							}}
						>
							Wedding day
						</p>
						<p className={styles["hero__title"]}>
							Bohdan
							<br />
							&
							<br />
							Anzhelika
						</p>
						<p
							style={{ fontSize: "1.5rem", fontWeight: 700 }}
						>{`${fakeDate.getDate()}/${fakeDate.getMonth() + 1}/${fakeDate.getFullYear()}`}</p>
						<img
							className={styles["hero__img"]}
							src="/wedding-4/05-c.png"
							alt=""
						/>
					</section>
					<img className={styles.animate} src="/wedding-4/06-c.png" alt="" />
					<section className={styles.section}>
						<p className={`${styles["section__title"]} ${styles.animate}`}>
							Дорогі гості
						</p>

						<p className={`${styles.txt} ${styles.animate}`}>
							З глибокою радістю та трепетом у серці запрошуємо вас розділити з
							нами один із найважливіших днів нашого життя. День, коли любов
							стане обіцянкою — щирою, вічною та незмінною.
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
				</div>

				<img className={styles.animate} src="/wedding-4/06-c.png" alt="" />
				<section className={styles.section}>
					<p className={`${styles["section__title"]} ${styles.animate}`}>
						Адреси святкування
					</p>
					<div className={styles.addresses}>
						{template.addresses.map((address, i) => {
							return (
								<div key={i} className={styles.address}>
									<p
										style={{ alignSelf: "flex-start" }}
										className={styles.animate}
									>
										<span className={styles.txt} style={{ fontSize: "2rem" }}>
											{address.title} {address.time}
										</span>
									</p>
									<div
										style={{
											display: "flex",
											justifyContent: "flex-start",
											alignItems: "center",
											gap: "10px",
											textAlign: "left",
										}}
									>
										<span
											className={styles.animate}
											style={{
												border: "3px solid var(--accent-clr)",
												width: "50px",
												height: "50px",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												flexShrink: 0,
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
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "flex-start",
											alignItems: "center",
											gap: "10px",
											textAlign: "left",
										}}
									>
										<span
											style={{
												border: "3px solid var(--accent-clr)",
												width: "50px",
												height: "50px",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												flexShrink: 0,
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
											style={{ color: "#fff" }}
											href={address.address}
											target="_blank"
										>
											{address.address}
										</a>
									</div>
									<iframe
										className={styles["address__map"]}
										src={address.address_url}
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
				<img className={styles.animate} src="/wedding-4/06-c.png" alt="" />
				<section className={styles.section}>
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
								{getPluralForm(hours, "день", "дні", "днів")}
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
								{getPluralForm(hours, "година", "години", "годин")}
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
								{getPluralForm(minutes, "хвилина", "хвилини", "хвилин")}
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
								{getPluralForm(seconds, "секунда", "секунди", "секунд")}
							</span>
						</div>
					</div>
				</section>
				<img
					style={{ alignSelf: "center" }}
					className={styles.animate}
					src="/wedding-4/07-c.png"
					width={300}
					alt=""
				/>
				<section className={styles.section}>
					<p className={`${styles.txt} ${styles.animate}`}>
						Чекаємо на вас з нетерепінням і любов'ю
						<br />
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
