/**
 * @description       : 
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-16-2020
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

    // initializing columns for different datatables
    accountColumns = accountColumns;
    leadColumns = leadColumns;
    opportunityColumns = opportunityColumns;
    contactColumns = contactColumns;


    @track retrivedRecords = []; //it contains all the records.
    @track dataToDisplay = []; //data to be displayed in the table
    @track startingRecord = 1; //start record position per page
    @track endingRecord = 0; //end record position per page
    error;
    wiredActivities;

    //Variables for pagination
    pageSize = 10;
    pageNumber = 1;
    totalItemCount = 0;
    totalPages = 0;

    //Variables for modals
    bShowModalNew = false;
    type;
    recordId;


    // Will go to the previous page.
    handlePreviousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber = this.pageNumber - 1; //decrease page by 1
            this.displayRecordPerPage(this.pageNumber);
        }
    }

    // Will go to the next page.
    handleNextPage() {
        if((this.pageNumber<this.totalPages) && this.pageNumber !== this.totalPages){
            this.pageNumber = this.pageNumber + 1; //increase page by 1
            this.displayRecordPerPage(this.pageNumber);            
        }
    }

    // Move the page to required destination.
    handlePageButtonClick(event) {
        this.pageNumber = event.detail;
        this.totalPages = Math.ceil(this.totalItemCount / this.pageSize);
        this.displayRecordPerPage(this.pageNumber);
    }
    
    // Will set the page number to one whenever changing checkbox in paginator.
    handleChangePageSize(event)
    {
        this.pageSize = event.detail;
        this.pageNumber = 1;
        this.totalPages = Math.ceil(this.totalItemCount / this.pageSize);
        this.displayRecordPerPage(this.pageNumber);
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
            'listOfSelectedRecIds': this.selectedRowsIds,
            'objRecordToDel': this.tabValue
        }).then(() => {
            refreshApex(this.wiredActivities);
            this.selectedRows = [];
            this.selectedRowsIds = [];
        }).catch();
    }

    // Retrives the data from the apex class for the datatable and paginator.
    @wire(getRecordsMethods, { getObjectName: '$tabValue' })
    wiredRecords(value) {
        this.wiredActivities = value;
        const { data, error } = value;
        if (data) {
            this.retrivedRecords = data;
            this.totalItemCount = data.length;
            this.totalPages = Math.ceil(this.totalItemCount / this.pageSize);

            this.dataToDisplay = this.retrivedRecords.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize;

            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    //this method displays records page by page
    displayRecordPerPage(page){

        /*let's say for 2nd page, it will be => "Displaying 6 to 10 of 23 records. Page 2 of 5"
        page = 2; pageSize = 5; startingRecord = 5, endingRecord = 10
        so, slice(5,10) will give 5th to 9th records.
        */
        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);

        this.endingRecord = (this.endingRecord > this.totalItemCount) 
                            ? this.totalItemCount : this.endingRecord; 

        this.dataToDisplay = this.retrivedRecords.slice(this.startingRecord, this.endingRecord);

        //increment by 1 to display the startingRecord count, 
        //so for 2nd page, it will show "Displaying 6 to 10 of 23 records. Page 2 of 5"
        this.startingRecord = this.startingRecord + 1;
    } 

    // Changes the tabvalue whenever we change the tabs.
    getTab(event) {
        this.tabValue = event.target.value;
        this.selectedRows = [];
        this.selectedRowsIds = [];
    }
}