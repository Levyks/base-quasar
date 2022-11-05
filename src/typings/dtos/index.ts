export interface HasNumericId {
  id: number;
}

export interface HasStringId {
  id: string;
}

export interface HasTimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface HasTimestampsAndNumericId
  extends HasNumericId,
    HasTimestamps {}
export interface HasTimestampsAndStringId extends HasStringId, HasTimestamps {}
