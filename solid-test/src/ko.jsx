import { For, createSignal } from "solid-js";
import Modal from "./Modal";
import { createEffect } from "solid-js";

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
    const [formData, setFormData] = createSignal({});

    // Функция для отправки данных
    const handleSubmit = async () => {
        try {
            const response = await fetch("/your-api-endpoint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData()),
            });

            if (response.ok) {
                console.log("Данные успешно отправлены");
                // Добавьте логику обработки успешной отправки
            } else {
                console.error("Ошибка при отправке данных");
                // Добавьте логику обработки ошибки
            }
        } catch (error) {
            console.error("Ошибка:", error);
            // Добавьте логику обработки ошибки
        }
    };

    // Обновление данных формы
    createEffect(() => {
        setFormData(
            Object.fromEntries(
                forms[formType()].items.map((item) => [item.name, ""])
            )
        );
    });

    return (
        <div classList={{ [styles.wrapper]: true }}>
            <Modal classList={{ [styles.container]: true }}>
                <div>
                    <select
                        onChange={(e) => {
                            setFormType(e.target.value);
                        }}
                    >
                        <For each={Object.values(MetaTypes)}>
                            {(name) => (
                                <option value={name}>{name}</option>
                            )}
                        </For>
                    </select>
                </div>
                <Form
                    name={forms[formType()].name}
                    items={forms[formType()].items}
                    classList={{ [styles.form]: true }}
                    onChange={(name, value) => {
                        setFormData((prev) => ({
                            ...prev,
                            [name]: value,
                        }));
                    }}
                />
                <button onClick={handleSubmit}>Отправить</button>
            </Modal>
        </div>
    );
};

export default UploadMeta;