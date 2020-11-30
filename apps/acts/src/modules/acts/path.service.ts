import { TryCatchWrapperAsync } from "@app/models";
import { Injectable } from "@nestjs/common";
import { ActsService } from "./acts.service";
import path from 'path'

@Injectable()
export class PathSercvice {

    constructor(private readonly actsService: ActsService) {}

    @TryCatchWrapperAsync()
    async createPath(id: string): Promise<string> {
        const act = await this.actsService.findActByIdWithRelations(id, ['customer', 'generalCustomer', 'lab']);

        const filepath = path.join(act.customer.label, act.generalCustomer.label, act.lab.label, act.datetime.date.toDateString())

        return filepath
    }
}