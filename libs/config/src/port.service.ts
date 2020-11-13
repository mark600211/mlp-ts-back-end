import { Modules } from '@app/models';
import { Module } from '@nestjs/common';

export class PortService {
  static getGrpcPort(module: Modules): number {
    switch (module) {
      case Modules.ACTS:
        return 50052;
      case Modules.FILES:
        return 50051;
      case Modules.PYTHON:
        return 50150;
    }
  }
}
