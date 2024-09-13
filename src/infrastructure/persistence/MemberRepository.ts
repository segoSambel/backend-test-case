import {IMemberRepository} from "../../domain/member/IMemberRepository";
import {Member} from "../../domain/member/Member";
import {prismaClient} from "../config/database";

export class MemberRepository implements IMemberRepository {
    async findAllMember(): Promise<Member[]> {
        const members = await prismaClient.member.findMany();
        return members.map(m => new Member(m.code, m.name, 1, false, ""));
    }
}
