import {Router} from 'express';
import {MemberRepository} from "../../infrastructure/persistence/MemberRepository";
import {MemberController} from "../controllers/MemberController";
import {GetAllMember} from "../usecases/member/GetAllMember";

const router = Router();
const memberRepository = new MemberRepository();
const memberController = new MemberController(
    new GetAllMember(memberRepository)
);

router.get('/members', memberController.getAll.bind(memberController));

export default router;
