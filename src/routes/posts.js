import express from 'express';
import { listaPosts, publicarPost, updatePost, uploadImg } from "../controllers/postsController.js";
import multer from 'multer';
import cors from "cors";

const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus:200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) =>{
    
    app.use(express.json());
    app.use(cors(corsOption));

    app.get("/posts", listaPosts);

    app.post("/posts", publicarPost)

    app.post("/upload", upload.single("imagem"), uploadImg)

    app.put("/upload/:id",  updatePost)
    
}

export default routes;
