export interface HasNumericId {
  id?: number;
}

export interface HasStringId {
  id?: string;
}

export interface Timestamped {
  createdAt?: Date;
  updatedAt?: Date;
}
