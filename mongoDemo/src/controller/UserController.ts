import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { Student } from "../interfaces/Student";
require('dotenv').config()

export class UserController extends Contorller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    public async findAll(req: Request, res: Response) {
        const responseObj: resp<Array<DBResp<Student>> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
    
        try {
            const dbResp = await this.service.getAllStudents();
            if (dbResp && dbResp.length > 0) {
                responseObj.body = dbResp;
                responseObj.message = "find successful";
                res.json(responseObj); // 使用 json() 方法發送回應
            } else {
                responseObj.code = 404;
                responseObj.message = "no students found";
                res.status(404).json(responseObj); // 發送 404 回應
            }
        } catch (error) {
            responseObj.code = 500;
            responseObj.message = "server error";
            res.status(500).json(responseObj); // 發送 500 錯誤
        }
    }
    

    public async insertOne(Request: Request, Response: Response) {
        const resp = await this.service.insertOne(Request.body)
        Response.status(resp.code).send(resp)
    }


}