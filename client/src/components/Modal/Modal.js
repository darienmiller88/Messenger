import React, { useEffect, useRef } from 'react'
import styles from "./Modal.module.scss"

//Expects a function that takes a boolean to set the variable passed to "show" parameter to true or false.
export const openModal = (setIsModalShowing) => {
    document.querySelector("body").style.overflow = "hidden"
    setIsModalShowing(true)
}

//Expects a function that takes a boolean to set the variable passed to "show" parameter to true or false.
export const closeModal = (setIsModalShowing) => {
    document.querySelector("body").style.overflow = 'visible';
    setIsModalShowing(false)
}

export const Modal = ({show, onHide, modalHeader, modalContent}) => {
    const modalRef = useRef(null)

    useEffect(() => {
        window.onclick = e => {
            if (e.target === modalRef.current) {
                onHide()
            }
        }
    }, [show])

    return (
        <div className={`${styles.modal} ${show ? styles.slidein : styles.slideout}`} ref={modalRef}>
            <div className={styles.modal_body}>
                <div className={styles.modal_header}>
                    <div className={styles.header}>{modalHeader}</div>
                    <span className={styles.close} onClick={onHide}>&times;</span>
                </div>
                <div className={styles.modal_content}>
                    { modalContent }
                </div>
                <div className={styles.modal_footer} >
                    <button onClick={onHide}>Close</button>
                </div>
            </div>
        </div>
    );
}
