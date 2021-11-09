import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HandyDataTable } from '@handy-ng/extenders/handy-datatable';
import { HandyNgUserService } from '@handy-ng/services/handy-ng-user.service';
import { HandyDataTableResult, HandyNgSelectOptions, FilterQuery, MongooseSortingOptions } from '@handy-ng/types';
import { FormGroup, FormControl } from '@angular/forms';

import { StudentNgModel } from '@handy-ng/models/student.ng-model';
import { StudentModelInterfaces } from '@server-models/student/model.interface';

@Component({
  selector: 'student-table',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent extends HandyDataTable<TableDataType, FilterType, StudentModelInterfaces> implements OnInit, OnDestroy {

  public modelFieldsToQuery: StudentModelInterfaces['allFields'][] = ['_id', 'studentName', 'studentAddress', 'studentCourse', 'studentMobile', 'studentEmail', ];
  public displayedColumns: string[] = ['_id', 'studentName', 'studentAddress', 'studentCourse', 'studentMobile', 'studentEmail', 'actions'];

  public rememberTableState: boolean = true; 
  public tableName: string = 'student_table';

  /* ---------------------------- Optional columns ---------------------------- */
  public optionalColumns: HandyNgSelectOptions[] = [
    {
      value: 'studentName',
      displayValue: 'Student Name'
    },
    {
      value: 'studentAddress',
      displayValue: 'Full Address'
    },
    {
      value: 'studentCourse',
      displayValue: 'Course'
    },
    {
      value: 'studentMobile',
      displayValue: 'Mobile No'
    },
  ];
  
  /* ---------------------------- Searchable fileds --------------------------- */
  public searchableFields: HandyNgSelectOptions[] = [
    {
      value: '_id',
      displayValue: 'ID'
    },
    {
      value: 'studentName',
      displayValue: 'Student Name'
    },
    {
      value: 'studentCourse',
      displayValue: 'Course'
    },
    {
      value: 'studentMobile',
      displayValue: 'Mobile No'
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
  
  public studentAddressFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  
  public studentEmailFilterOptions: HandyNgSelectOptions[] = [
    {
      value: null,
      displayValue: 'Example value'
    },
  ];
  

  constructor (
    protected _handyNgUserService: HandyNgUserService, 
    protected _model: StudentNgModel) {

    super(_handyNgUserService);
    this.initExtender();

  }

  public createFilterForm(filterData: FilterType): void {

    this.filterForm = new FormGroup({
      search: new FormControl(filterData.search),
      searchableFields: new FormControl(filterData.searchableFields),
      displayedColumns: new FormControl(filterData.displayedColumns),
      _id: new FormControl(filterData._id),
      studentAddress: new FormControl(filterData.studentAddress),
      studentEmail: new FormControl(filterData.studentEmail),
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
  protected getAdditionalSearchQueries(filterData: FilterType): FilterQuery<StudentModelInterfaces['fullModelShape']>[] {
    return [];
  }

  // For additional filters
  protected getAdditionalFilterQueries(filterData: FilterType): FilterQuery<StudentModelInterfaces['fullModelShape']>[] {

    let additionalFilterQueries: FilterQuery<StudentModelInterfaces['fullModelShape']>[] = [];
    
    let { _id, studentAddress, studentEmail, } = filterData;

      // Id filter
    if (_id !== null && _id !== undefined) {
      additionalFilterQueries.push({
        _id
      })
    }

      // Full Address filter
    if (studentAddress !== null && studentAddress !== undefined) {
      additionalFilterQueries.push({
        studentAddress
      })
    }

      // Email filter
    if (studentEmail !== null && studentEmail !== undefined) {
      additionalFilterQueries.push({
        studentEmail
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

type ModelFieldsToQuery = Extract<StudentModelInterfaces['allFields'], '_id' | 'studentName' | 'studentAddress' | 'studentCourse' | 'studentMobile' | 'studentEmail' | 'actions'>;
type TableDataType = Pick<StudentModelInterfaces['fullModelShape'], ModelFieldsToQuery> & {
  actions: null,
}


interface FilterType {
  search: string,
  searchableFields: StudentModelInterfaces['searchableFields'][],
  displayedColumns: string[],
  _id: StudentModelInterfaces['fullModelShape']['_id']
  studentAddress: StudentModelInterfaces['fullModelShape']['studentAddress']
  studentEmail: StudentModelInterfaces['fullModelShape']['studentEmail']
}