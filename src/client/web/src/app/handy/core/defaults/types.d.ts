export * from '@server-types';
import { SingleOrArrayCombo, UnSignedObject, MongooseSortingOptions } from '@server-types';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface HandySubjectStream<EventNames extends string> {
  eventName: EventNames,
  data?: any
}

export type HandyCoreEventNames = 'apiServiceLoaded' | 'configServiceLoaded' | 'configServiceLoadingFailed';

export type HttpRequestType = 'get' | 'post' | 'put' | 'delete';
export type HttpRequestHeaders =  {
  [name: string]: string | number
}


// export type UnSignedObject = { [key: string]: any };
// export type SingleOrArrayCombo<UnionType> = UnionType | UnionType[];
export { UnSignedObject };
export interface RequestQueryParams {
  [key: string]: SingleOrArrayCombo<RequestQueryParamValue>
}

export type RequestQueryParamValue = string | number | boolean;

export interface HandyNgSocketTree {

  [key: string]: {
    rooms: string[],
    socket: HandyNgSocket,
    connected: boolean
  }

}

export interface HandyNgSocket {

  joinRooms(rooms: string | string[]): void,
  leaveRooms(rooms: string | string[]): void,
  leaveNamespace(): void,
  emit(eventName: string, payLoad?: any): void,
  on<T = any>(eventName: string, debounceTime?: number): Observable<T>,
  once<T = any>(eventName: string): Observable<T>,

}

export interface HandyNgModelDecoratorSettings {
  name: string
}

export interface NestedMenuStructure {

  icon?: string,
  text?: string,
  link?: string,
  hasChildren?: boolean,
  children?: NestedMenuStructure[],
  isSeparator?: boolean,

}

export type SimpleAutocompleteFormData = (string | number)[];
export type CombinedAutocompleteFormData = { fieldValue: string | number, displayValue: string | number, emitVal?: any }[];
export type GroupAutocompleteFormData = { groupName: string, groupOptions: SimpleAutocompleteFormData | CombinedAutocompleteFormData }[];

export type HandyAutoCompleteData = SimpleAutocompleteFormData | CombinedAutocompleteFormData | GroupAutocompleteFormData;

export interface HandyNgSelectOptions<ValueType = any> {
  // ?has to be string only, because mobile select sees it as string, 
  // ?event if you put in number 
  value: ValueType,
  displayValue: string,
  disabled?: boolean 
} 

export interface HandyNgSelectGroupOptions<ValueType = any> {
  label: string,
  options: HandyNgSelectOptions<ValueType>[],
  disabled?: boolean
}

export type HandyNgSelectOptionsData<ValueType = any> = (HandyNgSelectOptions<ValueType> | HandyNgSelectGroupOptions<ValueType>)[];

export interface HandyNgRadioBtn<ValueType = any> {
  value: ValueType,
  label: string,
  labelPosition?: 'before' | 'after',
  extraClass?: string,
  color?: 'primary' | 'accent' | 'warn',
  disabled?: boolean
}

export interface HandyNgRadioGroupOptionsData<ValueType = any> {
  extraClass?: string,
  buttons: HandyNgRadioBtn<ValueType>[]
}

export interface HandyNgDataTableState {
  filterData: UnSignedObject, 
  paginatorData: {
    pageIndex: number,
    pageSize: number,
  },
  sort: MongooseSortingOptions<any>,
  filtersToggleState: boolean,
  displayedColumns: string[],
  expanded: boolean
}

export interface HandyDataTableResult<TableDataType = any> {
  dataSource: MatTableDataSource<TableDataType>,
  pageIndex: number
  itemsCount: number
}

export type ClientErrCodes = '500' | '400' | '401' | '403' | '404' | '410' | '415';
export type ClientErrBodyByCode = {
  headline: string,
  msg: string
}

export type EmailRequestAction = 'passwordReset' | 'unlock' | 'verify';

export type HandyNgNotificationDuration = number | 'keepOpen';

export interface SimpleNgMsgNotification {
  msg?: string | string[],
  headline?: string,
  duration?: HandyNgNotificationDuration,
  hasDismissBtn?: boolean,
  dismissBtnLabel?: string,
}