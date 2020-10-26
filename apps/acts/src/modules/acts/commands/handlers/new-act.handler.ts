/* eslint-disable prefer-const */
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NewActCommand } from '../impl/new-act.command';
import { Logger } from '@nestjs/common';
import { ActsService } from '../../acts.service';
import { ActCreatedEvent } from '../../events/impl/act-created.event';
import { Act } from '@app/models';

@CommandHandler(NewActCommand)
export class NewActHandler implements ICommandHandler<NewActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly as: ActsService, private eventBus: EventBus) {}

  async execute(command: NewActCommand): Promise<Act> {
    this.logger.verbose(`new-act.command`);

    const { newActData } = command;

    try {
      let applications: Application[] = [];

      if (newActData.applications) {
        this.logger.log(newActData.applications);
        for await (let application of newActData.applications) {
          const app = await this.appRepository.findOne(application.id);

          await this.appRepository.update(app.id, {
            ...application,
          });

          applications.push(app);
        }
      }

      const newAct = await this.actRepository.save({
        ...newActData,
        customer: customer,
        generalCustomer: generalCustomer,
        lab: lab,
        typeOfSample: tos,
        applications: applications,
      });

      return newAct;
    } catch (e) {
      this.logger.error(JSON.stringify(e));
    }
  }
}
