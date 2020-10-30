export interface MessageConsumerController<T> {
  value: { payload: T };
}
