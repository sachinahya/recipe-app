import { BasicAction } from './actions';

export class InvalidActionError extends Error {
  constructor(action?: Partial<BasicAction>) {
    const actionType = action?.type;
    super(
      `The dispatched action ${
        actionType ? `with type ${actionType}` : ''
      }is not supported by this reducer.`
    );
    // this.name = 'UnsupportedActionError'
  }
}
