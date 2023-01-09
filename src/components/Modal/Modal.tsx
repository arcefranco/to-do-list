import React, { ReactNode } from "react";
import styles from "./Modal.module.css";
import "./Modal.module.css";
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export default function Modal({ children, ...props }: Props) {
  return (
    <article className={styles.modal}>
      <div className={styles.modalContainer}>{children}</div>
    </article>
  );
}
