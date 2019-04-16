import React from "react";
import ReactDom from "react-dom";
import indexStyle from "./index.css";

ReactDom.render(
    <h1 className={indexStyle.main}>hello world!</h1>,
    document.getElementById("root")
)