import React from "react";
import styles from "./Password.module.scss";

const Password = ({ label = "Password:" }) => {
	return (
		<div className={styles.password}>
			<p className={styles.label}>{label}</p>
			<div className={styles.flexWrapperOne}>
				<input className={styles.input} placeholder="Enter password" />
			</div>
		</div>
	);
};

export default Password;
