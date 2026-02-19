import styles from "./ArrowRightBtn.module.scss";
import ArrowRightIcon from "@/app/icons/ArrowRightIcon";

type ArrowRightBtnProps = {
	url: string;
	icon?: React.ComponentType<{ size: number }>;
	label: string;
};

const ArrowRightBtn = ({ url, icon: Icon, label }: ArrowRightBtnProps) => {
	return (
		<a className={styles.link} href={url} target="_blank">
			{Icon && <Icon size={24} />}
			<span>{label}</span>
			<span className={styles.container}>
				<span className={styles.inner}>
					{[...Array(2)].map((_, i) => {
						return <ArrowRightIcon key={i} size={24} />;
					})}
				</span>
			</span>
		</a>
	);
};

export default ArrowRightBtn;
