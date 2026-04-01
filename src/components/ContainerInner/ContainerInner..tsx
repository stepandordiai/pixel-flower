import "./ContainerInner.scss";

type ContainerInnerProps = {
	children: React.ReactNode;
};

const ContainerInner = ({ children }: ContainerInnerProps) => {
	return <div className="container-inner">{children}</div>;
};

export default ContainerInner;
