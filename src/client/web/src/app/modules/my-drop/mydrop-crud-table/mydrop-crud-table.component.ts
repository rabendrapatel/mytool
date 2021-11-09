import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HandyDataTable } from '@handy-ng/extenders/handy-datatable';
import { HandyNgUserService } from '@handy-ng/services/handy-ng-user.service';
import { HandyDataTableResult, HandyNgSelectOptions, FilterQuery, MongooseSortingOptions } from '@handy-ng/types';
import { FormGroup, FormControl } from '@angular/forms';

import { MydropNgModel } from '@handy-ng/models/mydrop.ng-model';
import { MydropModelInterfaces } from '@server-models/mydrop/model.interface';
import { MydropCrudFormComponent, MydropCrudFormComponentResolver } from '../mydrop-crud-form/mydrop-crud-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mydrop-crud-table-table',
  templateUrl: './mydrop-crud-table.component.html',
  styleUrls: ['./mydrop-crud-table.component.scss']
})
export class MydropCrudTableComponent extends HandyDataTable<TableDataType, FilterType, MydropModelInterfaces> implements OnInit, OnDestroy {

  public modelFieldsToQuery: MydropModelInterfaces['allFields'][] = ['content', 'password', 'expireAt', ];
  public displayedColumns: string[] = ['content', 'password', 'expireAt', 'actions'];

  public rememberTableState: boolean = true; 
  public tableName: string = 'mydropCrudTable_table';

  /* ---------------------------- Optional columns ---------------------------- */
  public optionalColumns: HandyNgSelectOptions[] = [
    {
      value: 'content',
      displayValue: 'Content'
    },
    {
      value: 'password',
      displayValue: 'Password'
    },
    {
      value: 'expireAt',
      displayValue: 'Expiration'
    },
  ];
  
  /* ---------------------------- Searchable fileds --------------------------- */
  public searchableFields: HandyNgSelectOptions[] = [
    {
      value: '_id',
      displayValue: 'ID'
    },
    {
      value: 'content',
      displayValue: 'Content'
    },
    {
      value: 'expireAt',
      displayValue: 'Expiration'
    },
  ];
  
  /* -------------------------------------------------------------------------- */
  /*                              Additional filter                             */
  /* -------------------------------------------------------------------------- */
  public expireAtFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  

  constructor (
    public dialog: MatDialog, 
    private formResolver: MydropCrudFormComponentResolver,
    protected _handyNgUserService: HandyNgUserService, 
    protected _model: MydropNgModel) {

    super(_handyNgUserService);
    this.initExtender();

  }

  public createFilterForm(filterData: FilterType): void {

    this.filterForm = new FormGroup({
      search: new FormControl(filterData.search),
      searchableFields: new FormControl(filterData.searchableFields),
      displayedColumns: new FormControl(filterData.displayedColumns),
      expireAt: new FormControl(filterData.expireAt),
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
  protected getAdditionalSearchQueries(filterData: FilterType): FilterQuery<MydropModelInterfaces['fullModelShape']>[] {
    return [];
  }

  // For additional filters
  protected getAdditionalFilterQueries(filterData: FilterType): FilterQuery<MydropModelInterfaces['fullModelShape']>[] {

    let additionalFilterQueries: FilterQuery<MydropModelInterfaces['fullModelShape']>[] = [];
    
    let { expireAt, } = filterData;

      // Expiration filter
    if (expireAt !== null && expireAt !== undefined) {
      additionalFilterQueries.push({
        expireAt
      })
    }
    
    return additionalFilterQueries;

  }

  /* -------------------------------------------------------------------------- */
  /*                              Actions methods                               */
  /* -------------------------------------------------------------------------- */
  public editOrCreateAction(id?: number): void {

    if (id) {

      this.formResolver.getItemData(id)
        .then(formData => {

        const dialogRef = this.dialog.open(MydropCrudFormComponent, {
          data: { formData }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          this.refreshTableData();
        });

      })

      return;

    }

    const dialogRef = this.dialog.open(MydropCrudFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.refreshTableData();
    });

  }

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

type ModelFieldsToQuery = Extract<MydropModelInterfaces['allFields'], 'content' | 'password' | 'expireAt' | 'actions'>;
type TableDataType = Pick<MydropModelInterfaces['fullModelShape'], ModelFieldsToQuery> & {
  actions: null,
}


interface FilterType {
  search: string,
  searchableFields: MydropModelInterfaces['searchableFields'][],
  displayedColumns: string[],
  expireAt: MydropModelInterfaces['fullModelShape']['expireAt']
}