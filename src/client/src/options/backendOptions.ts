import { required } from '@mihben/ngx-configuration';

export class BackendOptions {
  @required()
  public baseAddress!: string;
}
