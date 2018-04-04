import { Action } from '@ngrx/store';
import { schema } from 'normalizr';
import { EntityMap } from '../reducers/normalize';
export interface SchemaMap {
    [schemaKey: string]: string;
}
export interface NormalizeActionPayload {
    entities: EntityMap;
    result: string[];
}
export interface NormalizeRemoveActionPayload {
    id: string;
    key: string;
    removeChildren: SchemaMap | null;
}
export interface NormalizeActionSchemaConfig {
    schema: schema.Entity;
}
export interface NormalizeChildActionSchemaConfig {
    parentSchema: NormalizeActionSchemaConfig['schema'];
}
export interface NormalizeActionConfig<T> extends NormalizeActionSchemaConfig {
    data: T[];
}
export interface NormalizeUpdateActionConfig<T> extends NormalizeActionSchemaConfig {
    id: NormalizeRemoveActionPayload['id'];
    changes: Partial<T>;
}
export interface NormalizeChildActionConfigBase<T> extends NormalizeChildActionSchemaConfig {
    data: T[];
}
export interface NormalizeChildActionPayload extends NormalizeActionPayload {
    parentId: string;
    parentProperty: string;
    parentSchemaKey: string;
}
export interface NormalizeRemoveChildActionPayload {
    id: NormalizeRemoveActionPayload['id'];
    childSchemaKey: string;
    parentId: NormalizeChildActionPayload['parentId'];
    parentProperty: NormalizeChildActionPayload['parentProperty'];
    parentSchemaKey: NormalizeChildActionPayload['parentSchemaKey'];
}
export interface NormalizeRemoveActionConfig extends NormalizeActionSchemaConfig {
    id: NormalizeRemoveActionPayload['id'];
    removeChildren?: NormalizeRemoveActionPayload['removeChildren'];
}
export interface NormalizeChildActionConfig<T> extends NormalizeChildActionConfigBase<T> {
    childSchema: schema.Entity;
    parentId: NormalizeChildActionPayload['parentId'];
}
export interface NormalizeRemoveChildActionConfig extends NormalizeChildActionSchemaConfig {
    id: NormalizeRemoveActionPayload['id'];
    childSchema: schema.Entity;
    parentId: NormalizeChildActionPayload['parentId'];
}
export interface NormalizeUpdateActionPayload<T> {
    id: NormalizeUpdateActionConfig<T>['id'];
    key: string;
    changes: EntityMap;
    result: string[];
}
export interface NormalizeActionCreators<T> {
    setData: (data: NormalizeActionConfig<T>['data']) => SetData<T>;
    addData: (data: NormalizeActionConfig<T>['data']) => AddData<T>;
    addChildData: <C>(data: NormalizeChildActionConfig<C>['data'], childSchema: NormalizeChildActionConfig<C>['childSchema'], parentId: NormalizeChildActionConfig<C>['parentId']) => AddChildData<C>;
    updateData: (id: NormalizeUpdateActionConfig<T>['id'], changes: NormalizeUpdateActionConfig<T>['changes']) => UpdateData<T>;
    removeData: (id: NormalizeRemoveActionConfig['id'], removeChildren?: NormalizeRemoveActionConfig['removeChildren']) => RemoveData;
    removeChildData: (id: NormalizeRemoveChildActionConfig['id'], childSchema: NormalizeRemoveChildActionConfig['childSchema'], parentId: NormalizeRemoveChildActionConfig['parentId']) => RemoveChildData;
}
export declare class NormalizeActionTypes {
    static readonly SET_DATA: string;
    static readonly ADD_DATA: string;
    static readonly ADD_CHILD_DATA: string;
    static readonly UPDATE_DATA: string;
    static readonly REMOVE_DATA: string;
    static readonly REMOVE_CHILD_DATA: string;
}
export declare class SetData<T> implements Action {
    readonly type: string;
    payload: NormalizeActionPayload;
    constructor(config: NormalizeActionConfig<T>);
}
export declare class AddData<T> implements Action {
    readonly type: string;
    payload: NormalizeActionPayload;
    constructor(config: NormalizeActionConfig<T>);
}
export declare class AddChildData<T> implements Action {
    readonly type: string;
    payload: NormalizeChildActionPayload;
    constructor(config: NormalizeChildActionConfig<T>);
}
export declare class UpdateData<T> implements Action {
    readonly type: string;
    payload: NormalizeUpdateActionPayload<T>;
    constructor(config: NormalizeUpdateActionConfig<T>);
}
export declare class RemoveData implements Action {
    readonly type: string;
    payload: NormalizeRemoveActionPayload;
    constructor(config: NormalizeRemoveActionConfig);
}
export declare class RemoveChildData implements Action {
    readonly type: string;
    payload: NormalizeRemoveChildActionPayload;
    constructor(config: NormalizeRemoveChildActionConfig);
}
export declare function actionCreators<T>(schema: schema.Entity): NormalizeActionCreators<T>;
