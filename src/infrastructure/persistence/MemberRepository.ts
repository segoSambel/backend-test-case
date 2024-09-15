import { IMemberRepository } from "../../domain/member/IMemberRepository";
import { Member } from "../../domain/member/Member";
import { prismaClient } from "../config/database";

export class MemberRepository implements IMemberRepository {
    async updateMemberState(member: Member): Promise<void> {
        await prismaClient.member.update({
            data: {
                penaltyEndDate: member.penaltyEndDate
            },
            where: {
                code: member.memberCode
            }
        });
    }

    async findAllMember(): Promise<Member[]> {
        const members = await prismaClient.member.findMany({
            include: {
                Borrow: {
                    where: {
                        returnedDate: null
                    }
                }
            }
        });

        return members.map(member => new Member(member.code, member.name, member.penaltyEndDate, member.Borrow.length));
    }

    async findMemberByCode(memberCode: string): Promise<Member | null> {
        const member = await prismaClient.member.findUnique({
            where: {
                code: memberCode
            },
            include: {
                Borrow: true
            }
        });

        if (member) {
            return new Member(member.code, member.name, member.penaltyEndDate, member.Borrow.length);
        }

        return null;
    }
}
