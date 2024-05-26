import { render } from "solid-js/web";

import UploadMeta from "./UploadMeta";
import "./index.css";
import "./bootstrap.css";
import UploadFile from "./UploadFile";

const root = document.getElementById("root");

render(() => <UploadFile onModalClose={()=>console.log("closed")}/>, root);
