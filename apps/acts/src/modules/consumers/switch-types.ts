import { Consumer, CustomerAct, GeneralCustomerAct } from '@app/models';
import { TypeKey } from './enum/type-key';

export class SwitchTypes {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  getType() {
    if (this.key === TypeKey.GENERAL_CUSTOMER)
      return { entityType: GeneralCustomerAct, dataType: Consumer };
    if (this.key === TypeKey.CUSTOMER) {
      return { entityType: CustomerAct, dataType: Consumer };
    }
  }
}
