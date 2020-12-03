/**
 * @description       : 
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-03-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   11-30-2020   ashish765082@gmail.com   Initial Version
**/
import { LightningElement, wire, track } from 'lwc';

import getRecordsMethods from '@salesforce/apex/getRecords.getRecordsMethods';
import deleteSelected from '@salesforce/apex/RecordHandler.deleteSelected';

import { refreshApex } from '@salesforce/apex';

import { NavigationMixin } from 'lightning/navigation';


// Field labels for datatable.
const actions = [
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];
const accountColumns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Account Site', fieldName: 'Site' },
    { label: 'Account Source', fieldName: 'AccountSource' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
    { label: 'Type', fieldName: 'Type' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];
const leadColumns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Company', fieldName: 'Company' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
    { label: 'Industry', fieldName: 'Industry' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];
const opportunityColumns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Opportunity Amount', fieldName: 'Amount' },
    { label: 'Stage Name', fieldName: 'StageName' },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date' },
    { label: 'Type', fieldName: 'Type' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];
const contactColumns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Birthdate', fieldName: 'Birthdate', type: 'date' },
    { label: 'LeadSource', fieldName: 'LeadSource' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];

export default class RecPage extends NavigationMixin(LightningElement) {

    //to keep the value of the current tab clicked
    @track tabValue = 'Account';

    // Variables for datatable
    selectedRows = [];
    selectedRowsIds = [];
    accountColumns = accountColumns;
    leadColumns = leadColumns;
    opportunityColumns = opportunityColumns;
    contactColumns = contactColumns;
    data = [];
    error;
    wiredActivities;

    //Variables for pagination
    pageSize = 10;
    @track pageNumber = 1;
    totalItemCount = 0;

    //Variables for modals
    bShowModalNew = false;
    type;
    recordId;


    // Will go to the previous page.
    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
    }

    // Will go to the next page.
    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
    }

    // Move the page to required destination.
    handlePagi(event) {
        this.pageNumber = event.detail;
    }
    
    // Will set the page number to one whenever changing checkbox in paginator.
    handleChangeSize(event)
    {
        this.pageSize = event.detail;
        this.pageNumber = 1;
        refreshApex(this.wiredActivities);
    }

    // Will get the selecter row count.
    get selLength() {
        return this.selectedRowsIds.length;
    }

    // Will refresh the datatable.
    handleRefresh() {
        refreshApex(this.wiredActivities);
    }

    // Contains row actions on the datatable.
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'edit':
                this.editRowDetails(row);
                break;
            default:
        }
    }

    // Handles single delete of records from the datatable.
    deleteRow(row) {
        this.selectedRowsIds.push(row.Id);
        this.handleDelete();
    }

    // For editing records. It will open modal.
    editRowDetails(row) {
        this.bShowModalNew = true;
        this.type = 'Edit';
        this.recordId = row.Id;
    }

    // For creating New records. It will open modal.
    handleNew() {
        this.bShowModalNew = true;
        this.type = 'New';
    }

    // put the selected rows in a array.
    handleSelectedRows(event) {
        this.selectedRowsIds = event.detail.selectedRows.map(row => {
            return row.Id;
        });

    }

    // Will close the modal after saving records and after clicking cross on modal.
    handleClose() {
        this.bShowModalNew = false;
    }

    // Handles all kinds of deletion of record weather grouped or single.
    handleDelete() {
        deleteSelected({
            'idLi': this.selectedRowsIds,
            'getObject': this.tabValue
        }).then(() => {
            refreshApex(this.wiredActivities);
            this.selectedRows = [];
            this.selectedRowsIds = [];
        }).catch();
    }

    // Retrives the data from the apex class for the datatable and paginator.
    @wire(getRecordsMethods, { getObject: '$tabValue', pageNumber: '$pageNumber', pageSize: '$pageSize' })
    wiredRecords(value) {
        this.wiredActivities = value;
        const { data, error } = value;
        if (data) {
            this.data = data.records;
            this.pageSize = data.pageSize;
            this.pageNumber = data.pageNumber;
            this.totalItemCount = data.totalItemCount;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    // Changes the tabvalue whenever we change the tabs.
    getTab(event) {
        this.tabValue = event.target.value;
    }
}