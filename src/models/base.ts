import { Constructor } from '@/typings/misc';

export abstract class BaseModel {
  clone(): this {
    return Object.assign(new (this.constructor as Constructor<this>)(), this);
  }
}
