/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Act,
  actId,
  ActsServiceController,
  ActsServiceControllerMethods,
  Path,
} from '@app/proto/proto/build/acts';
import { Controller } from '@nestjs/common';
import { from, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActsService } from './acts.service';
import { PathSercvice } from './path.service';
import {
  Timestamp,
  protobufPackage,
} from '../../../../../libs/proto/src/proto/build/google/protobuf/timestamp';

@Controller('acts')
@ActsServiceControllerMethods()
export class ActsController implements ActsServiceController {
  constructor(
    private readonly pathService: PathSercvice,
    private readonly actsService: ActsService,
  ) {}

  getFilePath({ id }: actId): Observable<Path> {
    const path = this.pathService.createPath(id);

    return from(path).pipe(
      map(path => {
        return { path };
      }),
    );
  }

  async getActForTemplater({ id }: actId): Promise<Act> {
    const act = await this.actsService.findActByIdWithRelations(id, [
      'applications',
      'climaticEnvironmental',
      'customer',
      'datetime',
      'definedIndicators',
      'environmentalEngineer',
      'generalCustomer',
      'goal',
      'lab',
      'method',
      'name',
      'normativeDocuments',
      'objectName',
      'passedSample',
      'place',
      'planning',
      'preparation',
      'representative',
      'sampleType',
      'toolType',
      'typeOfSample',
    ]);

    const timestamp = (act.datetime.date.toISOString() as unknown) as Timestamp;

    const fapplications = [
      ...act.applications.map(value => {
        const timestamp = (value.datetime.date.toISOString() as unknown) as Timestamp;

        return { ...value, datetime: { ...value.datetime, date: timestamp } };
      }),
    ];

    const fAct = {
      ...act,
      datetime: { ...act.datetime, date: timestamp },
      applications: fapplications,
    };

    return fAct as Act;
  }
}
