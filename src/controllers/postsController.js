import {getPosts,criarPost,updatPost} from "../models/posts.js";
import gerarDescricaoComGemini from "../service/geminiService.js";
import fs from "fs"

export async function listaPosts(req,res) {
    const posts = await getPosts();
    res.status(200).json(posts);
}

export async function publicarPost(req,res) {
    const novoPost = req.body 

    try {
        const posts = await criarPost(novoPost);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(200).json({"Erro": "Falha na requisição"});
    }
    
  
}


export async function uploadImg(req,res) {
    const novoPost = {
        descricao:"",
        imgUrl:req.file.originalname,
        descricao:"",
    }

    try {
        const posts = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${posts.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
    
  
}


export async function updatePost(req,res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
   
    try {
        const imagemBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imagemBuffer);
        console.log(descricao)
        const novoPost = {
            imgUrl:urlImagem,
            descricao: descricao,
            alt:  req.body.alt,
        }
    
        
        const posts = await updatPost(id,novoPost);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(200).json({"Erro": "Falha na requisição"});
    }
    
  
}