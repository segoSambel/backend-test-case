import {Member} from "./Member";

export interface IMemberRepository {
    findAllMember(): Promise<Member[]>;
}
