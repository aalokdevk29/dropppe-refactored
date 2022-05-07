import React, { useRef } from "react";
import { Button } from "./GlobalButton";
import styles from "../styles/form.module.css";

type IFormProps = {
  "on-submit": (payload: {
    title: string | null;
    description: string | null;
    price: number | null;
  }) => void;
};

export const Form: React.FC<IFormProps> = (props) => {
  let formRef = useRef<HTMLFormElement>(null);
  let titleRef = useRef<HTMLInputElement>(null);
  let priceRef = useRef<HTMLInputElement>(null);
  let descriptionRef = useRef<HTMLTextAreaElement>(null);

  const validate = () => {
    let validationError = "";
    if (!titleRef.current?.value) {
      validationError = "Your product needs a title";
    } else if (priceRef.current?.value && isNaN(+priceRef.current?.value)) {
      validationError = "Price should be a numerical value";
    } else if (!descriptionRef.current?.value || !priceRef.current?.value) {
      validationError = "Your product needs some content";
    }

    if (!validationError) return false;
    else return validationError;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      props["on-submit"]({
        title: titleRef?.current && titleRef.current?.value,
        description: descriptionRef.current && descriptionRef.current.value,
        price: priceRef.current && parseFloat(priceRef.current?.value),
      });
      formRef.current?.reset();
    } else {
      alert(validate());
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(event) => handleSubmit(event)}
      ref={formRef}
    >
      <span className={styles.label}>Product title: *</span>

      <input
        ref={titleRef}
        placeholder="Title..."
        defaultValue=""
        className={styles.input}
      />

      <span className={styles.label}>Product details: *</span>

      <input
        ref={priceRef}
        placeholder="Price..."
        defaultValue=""
        className={styles.input}
      />

      <textarea
        ref={descriptionRef}
        placeholder="Start typing product description here..."
        defaultValue=""
        className={styles.textarea}
      />

      <Button>Add a product</Button>
    </form>
  );
};
