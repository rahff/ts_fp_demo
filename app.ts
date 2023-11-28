import express, {Application} from "express";
import {join} from "path";
import router from "./routes/index.js";

export const app: Application = express();

app.get("*", router)
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));

app.listen(3000, () => console.log("listen on 3000"))