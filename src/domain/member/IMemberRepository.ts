import { Member } from "./Member";

export interface IMemberRepository {
    findAllMember(): Promise<Member[]>;
    findMemberByCode(memberCode: string): Promise<Member | null>;
    updateMemberState(member: Member): Promise<void>;
}
