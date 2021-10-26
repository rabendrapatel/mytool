import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HandyDataTable } from '@handy-ng/extenders/handy-datatable';
import { HandyNgUserService } from '@handy-ng/services/handy-ng-user.service';
import { HandyDataTableResult, HandyNgSelectOptions, FilterQuery, MongooseSortingOptions } from '@handy-ng/types';
import { FormGroup, FormControl } from '@angular/forms';

import { UserNgModel } from '@handy-ng/models/user.ng-model';
import { UserModelInterfaces } from '@server-models/user/model.interface';

@Component({
  selector: 'user-crud-table-table',
  templateUrl: './user-crud-table.component.html',
  styleUrls: ['./user-crud-table.component.scss']
})
export class UserCrudTableComponent extends HandyDataTable<TableDataType, FilterType, UserModelInterfaces> implements OnInit, OnDestroy {

  public modelFieldsToQuery: UserModelInterfaces['allFields'][] = ['_id', 'email', 'name', 'roles', 'permissions', 'hasVerifiedEmail', 'banned', ];
  public displayedColumns: string[] = ['_id', 'email', 'name', 'roles', 'permissions', 'hasVerifiedEmail', 'banned', 'actions'];

  public rememberTableState: boolean = true; 
  public tableName: string = 'userCrudTable_table';

  /* ---------------------------- Optional columns ---------------------------- */
  public optionalColumns: HandyNgSelectOptions[] = [
    {
      value: 'email',
      displayValue: 'Email'
    },
    {
      value: 'name',
      displayValue: 'Name'
    },
    {
      value: 'roles',
      displayValue: 'Roles'
    },
    {
      value: 'permissions',
      displayValue: 'Permissions'
    },
    {
      value: 'hasVerifiedEmail',
      displayValue: 'Verified email'
    },
    {
      value: 'banned',
      displayValue: 'Banned'
    },
  ];
  
  /* ---------------------------- Searchable fileds --------------------------- */
  public searchableFields: HandyNgSelectOptions[] = [
    {
      value: '_id',
      displayValue: 'Id'
    },
    {
      value: 'email',
      displayValue: 'Email'
    },
    {
      value: 'name',
      displayValue: 'Name'
    },
    {
      value: 'roles',
      displayValue: 'Roles'
    },
    {
      value: 'permissions',
      displayValue: 'Permissions'
    },
    {
      value: 'newEmail',
      displayValue: 'New email'
    },
  ];
  
  /* -------------------------------------------------------------------------- */
  /*                              Additional filter                             */
  /* -------------------------------------------------------------------------- */
  public _idFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  
  public emailFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  
  public passwordFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  
  public nameFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  
  public rolesFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  
  public permissionsFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  
  public hasVerifiedEmailFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  
  public newEmailFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  
  public bannedFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  

  constructor (
    protected _handyNgUserService: HandyNgUserService, 
    protected _model: UserNgModel) {

    super(_handyNgUserService);
    this.initExtender();

  }

  public createFilterForm(filterData: FilterType): void {

    this.filterForm = new FormGroup({
      search: new FormControl(filterData.search),
      searchableFields: new FormControl(filterData.searchableFields),
      displayedColumns: new FormControl(filterData.displayedColumns),
      _id: new FormControl(filterData._id),
      email: new FormControl(filterData.email),
      password: new FormControl(filterData.password),
      name: new FormControl(filterData.name),
      roles: new FormControl(filterData.roles),
      permissions: new FormControl(filterData.permissions),
      hasVerifiedEmail: new FormControl(filterData.hasVerifiedEmail),
      newEmail: new FormControl(filterData.newEmail),
      banned: new FormControl(filterData.banned),
    })

  }

  public getData(filterData: FilterType, page: number, limit: number, sort: MongooseSortingOptions<TableDataType>): Promise<HandyDataTableResult<TableDataType>> {

    return new Promise((resolve, reject) => {

      let { search = '', searchableFields } = filterData;
        
      this._model.search(
        search,
        searchableFields,
        { selectType: 'select', fields: this.modelFieldsToQuery },
        this.getFindOptions(page, limit, sort),
        this.getAdditionalSearchQueries(filterData),
        this.getAdditionalFilterQueries(filterData)
      )
        .subscribe(result => {

          let { docs, paginationData } = result.data;

          return resolve({
            dataSource: new MatTableDataSource(docs as any),
            pageIndex: paginationData.page,
            itemsCount: paginationData.totalRecordsCount
          });

        }, err => {

          return reject(err);

        })

    })

  }

  // For queries that are not included in default handy model search functionality
  protected getAdditionalSearchQueries(filterData: FilterType): FilterQuery<UserModelInterfaces['fullModelShape']>[] {
    return [];
  }

  // For additional filters
  protected getAdditionalFilterQueries(filterData: FilterType): FilterQuery<UserModelInterfaces['fullModelShape']>[] {

    let additionalFilterQueries: FilterQuery<UserModelInterfaces['fullModelShape']>[] = [];
    
    let { _id, email, password, name, roles, permissions, hasVerifiedEmail, newEmail, banned, } = filterData;

      // Id filter
    if (_id !== null && _id !== undefined) {
      additionalFilterQueries.push({
        _id
      })
    }

      // Email filter
    if (email !== null && email !== undefined) {
      additionalFilterQueries.push({
        email
      })
    }

      // Password filter
    if (password !== null && password !== undefined) {
      additionalFilterQueries.push({
        password
      })
    }

      // Name filter
    if (name !== null && name !== undefined) {
      additionalFilterQueries.push({
        name
      })
    }

      // Roles filter
    if (roles !== null && roles !== undefined) {
      additionalFilterQueries.push({
        roles
      })
    }

      // Permissions filter
    if (permissions !== null && permissions !== undefined) {
      additionalFilterQueries.push({
        permissions
      })
    }

      // Verified email filter
    if (hasVerifiedEmail !== null && hasVerifiedEmail !== undefined) {
      additionalFilterQueries.push({
        hasVerifiedEmail
      })
    }

      // New email filter
    if (newEmail !== null && newEmail !== undefined) {
      additionalFilterQueries.push({
        newEmail
      })
    }

      // Banned filter
    if (banned !== null && banned !== undefined) {
      additionalFilterQueries.push({
        banned
      })
    }
    
    return additionalFilterQueries;

  }

  /* -------------------------------------------------------------------------- */
  /*                              Actions methods                               */
  /* -------------------------------------------------------------------------- */
  public removeEntryAction(id: number): void {

    this._model.deleteById(id).subscribe(deleteResult => {

      // TODO do whatever you need to do after removing
      this.refreshTableData();
      console.log(deleteResult);

    }, err => {
      console.log(err);
    })

  }
  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}

type ModelFieldsToQuery = Extract<UserModelInterfaces['allFields'], '_id' | 'email' | 'name' | 'roles' | 'permissions' | 'hasVerifiedEmail' | 'banned' | 'actions'>;
type TableDataType = Pick<UserModelInterfaces['fullModelShape'], ModelFieldsToQuery> & {
  actions: null,
}


interface FilterType {
  search: string,
  searchableFields: UserModelInterfaces['searchableFields'][],
  displayedColumns: string[],
  _id: UserModelInterfaces['fullModelShape']['_id']
  email: UserModelInterfaces['fullModelShape']['email']
  password: UserModelInterfaces['fullModelShape']['password']
  name: UserModelInterfaces['fullModelShape']['name']
  roles: UserModelInterfaces['fullModelShape']['roles']
  permissions: UserModelInterfaces['fullModelShape']['permissions']
  hasVerifiedEmail: UserModelInterfaces['fullModelShape']['hasVerifiedEmail']
  newEmail: UserModelInterfaces['fullModelShape']['newEmail']
  banned: UserModelInterfaces['fullModelShape']['banned']
}