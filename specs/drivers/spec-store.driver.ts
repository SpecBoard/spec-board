import axios from 'axios';
import { injectable } from 'tsyringe';

@injectable()
export class SpecStoreDriver {
  private readonly url = 'http://localhost:5100/';

  public async healthCheckAsync() {
    const response = await axios.get(`${this.url}.well-known/healthy`);
    if (response.status !== axios.HttpStatusCode.Ok)
      throw Error(response.statusText);
  }

  public async uploadReportAsync(project: string) {
    const response = await axios.post(`${this.url}api/project/${project}`);
    if (response.status != axios.HttpStatusCode.Ok)
      throw Error(response.statusText);
  }
}
