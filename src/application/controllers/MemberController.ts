import { NextFunction, Request, Response } from "express";
import { GetAllMember } from "../usecases/member/GetAllMember";

export class MemberController {
    constructor(private getAllMember: GetAllMember) {
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const members = await this.getAllMember.execute();
            res.status(200).json(members);
        } catch (e) {
            next(e)
        }
    }
}
