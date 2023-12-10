import express, {Application} from "express";
import {join} from "path";
import router from "./routes/index.js";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, 'public')));
app.use("/api", router)

app.listen(3000, () => console.log("listen on 3000"))
