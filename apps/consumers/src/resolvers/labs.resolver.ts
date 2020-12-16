import { CreateConsumerDto, Lab, PatchConsumerDto } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Lab)
export class LabResolver extends BaseResolver(
  Lab,
  CreateConsumerDto,
  PatchConsumerDto,
) {}
