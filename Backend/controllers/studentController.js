import mongoose from "mongoose";
import studentModel from "../models/studentModel.js";

// admin
export async function getStudents(req, res){
    try {
        const students = await studentModel.find();
        res.status(200).send({students})
    } catch (error) {
        res.status(400).send({message : "Error : ", error})
    }
}