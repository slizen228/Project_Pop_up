import { For, createSignal } from "solid-js";
import Modal from "./Modal";

import styles from "./UploadMeta.module.css";
import Form from "./Form";

const MetaTypes = { DEFAULT: "Default", CUSTOM: "Custom" };

const forms = {
  [MetaTypes.DEFAULT]: {
    name: "default",
    items: [
      { name: "name", label: "Имя" },
      { name: "lastname", label: "Фамилия" },
    ],
  },
  [MetaTypes.CUSTOM]: {
    name: "custom",
    items: [
      { name: "custom-name", label: "Кастомнае Имя" },
      { name: "custom-lastname", label: "Кастомная Фамилия" },
    ],
  },
};

const UploadMeta = () => {
  const [formType, setFormType] = createSignal(MetaTypes.DEFAULT);

  return (
      <div classList={{[styles.wrapper]:true}}>
    <Modal classList={{ [styles.container]: true }}>
      <div>
        <select
          onChange={(e) => {
            setFormType(e.target.value);
          }}
        >
          <For each={Object.values(MetaTypes)}>
            {(name) => <option value={name}>{name}</option>}
          </For>
        </select>
      </div>
      <Form
        name={forms[formType()].name}
        items={forms[formType()].items}
        classList={{ [styles.form]: true }}
      />
    </Modal>
      </div>
  );
};

export default UploadMeta;
