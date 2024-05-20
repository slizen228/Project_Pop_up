import { For, createSignal } from "solid-js";
import Modal from "./Modal";
import styles from "./UploadFile.module.css";
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
const UploadFile = () => {
    const [formType, setFormType] = createSignal(MetaTypes.DEFAULT);
    const [file, setFile] = createSignal(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const uploadData = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file());
            const formValues = {};
            forms[formType()].items.forEach((item) => {
                formValues[item.name] = Object.getElementById(item.name).value;
            });
            formData.append("data", JSON.stringify(formValues));
            await fetch("/upload", {
                method: 'POST',
                body: formData
            });
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
        }
    };
    return (
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
            <form onSubmit={(e) => {
                e.preventDefault();
                uploadData();
            }}>

                <Form
                    name={forms[formType()].name}
                    items={forms[formType()].items}
                    classList={{[styles.form]: true}}
                />
                <div class="modal-footer">
                    <input type="file" onChange={handleFileChange}/>
                    <button class="btn btn_2 btn-primary" type="submit">Upload</button>
                </div>
            </form>
        </Modal>
    );
};
export default UploadFile;