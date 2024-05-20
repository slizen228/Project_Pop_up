import styles from "./Modal.module.css";

const Modal = (props) => {
  console.log(props.classList);
  return (
    <div class={styles.overlay}>
      <div classList={{ [styles.body]: true, ...props.classList }}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
