import {IMemberRepository} from "../../../domain/member/IMemberRepository";
import {Member} from "../../../domain/member/Member";

export class GetAllMember {
    constructor(private repository: IMemberRepository) {
    }

    async execute(): Promise<Member[]> {
        return await this.repository.findAllMember();
    }
}
