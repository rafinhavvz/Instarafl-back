import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js';

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export  async function getPosts(){
    const db = conexao.db("imersao-instaralf");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export  async function criarPost(post){
    const db = conexao.db("imersao-instaralf");
    const colecao = db.collection("posts");
    return colecao.insertOne(post);
}

export  async function updatPost(id, post){
    const db = conexao.db("imersao-instaralf");
    const colecao = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objectId)},{$set:post});

}