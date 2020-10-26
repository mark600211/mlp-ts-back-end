import { DbService } from '@app/db';
import { Act, Application, NewActDto } from '@app/models';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConsumersService } from '../consumers/consumers.service';

@Injectable()
export class ActsService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly dbService: DbService,
    private readonly consumerService: ConsumersService,
  ) {}

  getRepository(key: string): Repository<Act | Application> {
    let repository: Repository<any>;

    switch (key) {
      case 'act':
        repository = this.dbService.getRepository<Act>(Act);
        break;
      case 'application':
        repository = this.dbService.getRepository<Application>(Application);
        break;
    }

    return repository;
  }

  newAct(data: NewActDto): Promise<Act> {
    const repository = this.getRepository('act');

    const consumers = this.consumerService.findConsumers(data);

    const newAct = repository.create({
      ...consumers,
      name: data.name,
      datetime: data.datetime,
    });
  }

  findAct(id: string): Promise<Act> {
    this.logger.log('find act');

    try {
      const repository = this.getRepository('act') as Repository<Act>;

      const act = repository.findOne(id);

      if (!act)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Act wasn`t found' },
          HttpStatus.NOT_FOUND,
        );

      return act;
    } catch (error) {
      this.logger.error(error);
    }
  }

  findApplication;

  saveAct(act: Act): Promise<Act> {
    return this.actRepository.save(act);
  }
}
