import { MemoizedSelector } from '@ngrx/store';
import { schema } from 'normalizr';
export interface EntityMap {
    [key: string]: {
        [id: string]: any;
    };
}
export interface NormalizedState {
    normalized: NormalizedEntityState;
}
export interface NormalizedEntityState {
    result: string[];
    entities: EntityMap;
}
export declare function normalized(state: NormalizedEntityState, action: any): {
    result: any;
    entities: any;
};
export declare const getNormalizedEntities: MemoizedSelector<any, EntityMap>;
export declare const getResult: MemoizedSelector<any, string[]>;
export interface SchemaSelectors<T> {
    getNormalizedEntities: MemoizedSelector<any, EntityMap>;
    getEntities: MemoizedSelector<{}, T[]>;
    entityProjector: (entities: {}, id: string) => T;
    entitiesProjector: (entities: {}) => T[];
}
export declare function createSchemaSelectors<T>(schema: schema.Entity): SchemaSelectors<T>;
