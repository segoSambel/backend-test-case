import {Request, Response, NextFunction} from "express";
import {GetAllMember} from "../usecases/member/GetAllMember";
import {MemberResponse} from "../resources/MemberResponse";

export class MemberController {
    constructor(private getAllMember: GetAllMember) {
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const members = (await this.getAllMember.execute()).map(m => new MemberResponse(m.code, m.name, m.borrowedBookTotal, m.penaltyStatus, m.penaltyEndDate));
            res.status(200).json(members);
        } catch (e) {
            next(e)
        }
    }
}
