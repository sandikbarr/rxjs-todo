import { DobyModule } from './doby.module';

describe('CoreModule', () => {
  let dobyModule: DobyModule;

  beforeEach(() => {
    dobyModule = new DobyModule();
  });

  it('should create an instance', () => {
    expect(dobyModule).toBeTruthy();
  });
});
