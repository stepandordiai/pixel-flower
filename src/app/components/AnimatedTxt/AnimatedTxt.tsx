import { useEffect, useRef } from "react";
import styles from "./AnimatedTxt.module.scss";

type AnimatedTxtProps = {
	children: React.ReactNode;
};

const AnimatedTxt = ({ children }: AnimatedTxtProps) => {
	const txtWrapper = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add(styles["txt--animate"]);
					}
				});
			},
			{ threshold: 0 },
		);

		if (txtWrapper.current) {
			observer.observe(txtWrapper.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<span className={styles["txt-wrapper"]}>
			<span ref={txtWrapper} className={styles.txt}>
				{children}
			</span>
		</span>
	);
};

export default AnimatedTxt;
