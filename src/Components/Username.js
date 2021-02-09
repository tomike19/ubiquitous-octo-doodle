import React from "react";
import styles from "./Username.module.scss";

const Username = ({ label = "Username or Email:" }) => {
	return (
		<div className={styles.username}>
			<p className={styles.label}>{label}</p>
			<div className={styles.flexWrapperOne}>
				<input className={styles.input} placeholder="Enter username or email" />
			</div>
		</div>
	);
};

export default Username;
