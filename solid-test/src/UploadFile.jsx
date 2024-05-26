import { For, createSignal } from "solid-js";
import Modal from "./Modal";
import styles from "./UploadFile.module.css";
import Form from "./Form";
const MetaTypes = { DEFAULT: "Default", CUSTOM: "Custom" };
const forms = {
    [MetaTypes.DEFAULT]: {
        name: "default",
        items: [
            { name: "name", label: "Имя", required: true },
            { name: "lastname", label: "Фамилия", required: true },
        ],
    },
    [MetaTypes.CUSTOM]: {
        name: "custom",
        items: [
            { name: "custom-name", label: "Кастомнае Имя", required: true },
            { name: "custom-lastname", label: "Кастомная Фамилия", required: true },
        ],
    },
};
const UploadFile = (props) => {
    const [formType, setFormType] = createSignal(MetaTypes.DEFAULT);
    const uploadData = async (formData) => {
        try {
            const jsonData={};
            let file;
            [...formData.entries()].forEach(([key,value] )=>{
                if (key==="file") {
                    file=value;
                    return;
                }
                jsonData[key]=value;
            });
            const body=new FormData();
            body.append("json_data",JSON.stringify(jsonData));
            body.append("file",file);
            await fetch("http://localhost:6060/upload", {
                headers: {"Access-Control-Allow-Origin": "http://localhost:3000"},
                method: 'POST',
                body
            });
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
        }
    };
    return (
        <Modal classList={{ [styles.container]: true }}>
            <div class={styles.select}>
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
            <div class={styles.form}>

                <Form
                    name={forms[formType()].name}
                    items={forms[formType()].items}
                    classList={{[styles.form]: true}}
                    onSubmit={(e) =>{
                        uploadData(new FormData(e.target)).then(()=>props.onModalClose?.());

                        //console.log(e);
                        console.log(new FormData(e.target));
                    }}
                />
                <div class="modal-footer">
                    <input name={"file"} form={"form_name"} type="file"/>
                    <button class="btn btn_2 btn-primary" type="submit" form={"form_name"}>Upload</button>
                </div>
            </div>
        </Modal>
    );
};
export default UploadFile;