/**
 * @description       : 
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-02-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   11-30-2020   ashish765082@gmail.com   Initial Version
**/
import { LightningElement, wire, track } from 'lwc';

import getRecordsMethods from '@salesforce/apex/getRecords.getRecordsMethods';
import deleteSelected from '@salesforce/apex/getRecords.deleteSelected';

import { deleteRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { refreshApex } from '@salesforce/apex';

import { NavigationMixin } from 'lightning/navigation';


const actions = [
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];
const accountColumns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Account Site', fieldName: 'Site' },
    { label: 'Account Source', fieldName: 'AccountSource' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency',
        cellAttributes: {
            alignment: 'left'
        }
    },
    { label: 'Type', fieldName: 'Type' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];
const leadColumns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Company', fieldName: 'Company' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency',
        cellAttributes: {
            alignment: 'left'
        }
    },
    { label: 'Type', fieldName: 'Type' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];
const opportunityColumns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Opportunity Amount', fieldName: 'Amount' },
    { label: 'Lead Source', fieldName: 'LeadSource' },
    { label: 'Expected Revenue', fieldName: 'ExpectedRevenue', type: 'currency',
        cellAttributes: {
            alignment: 'left'
        }
    },
    { label: 'Type', fieldName: 'Type' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];
const contactColumns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'MailingAddress', fieldName: 'MailingAddress' },
    { label: 'LeadSource', fieldName: 'LeadSource' },
    { label: 'Email', fieldName: 'Email', type: 'email',
        cellAttributes: {
            alignment: 'left'
        }
    },
    { label: 'Phone', fieldName: 'Phone' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];

export default class RecPage extends NavigationMixin(LightningElement) {

    //to keep the value of the current tab clicked
    @track tabValue = 'Account';

    selectedRows = [];
    selectedRowsIds;

    accountColumns = accountColumns;
    leadColumns = leadColumns;
    opportunityColumns = opportunityColumns;
    contactColumns = contactColumns;
    data = [];
    error;
    wiredActivities;


    pageSize = 10;
    @track pageNumber = 1;
    totalItemCount = 0;

    get pgSizes()
    {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '15', value: '15' },
            { label: '25', value: '25' }
        ];
    }
    
    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
    }
    
    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
    }
    
    handlePagi(event)
    {
        this.pageNumber = event.detail;
    }
    
    handleChangeSize(event)
    {
        this.pageSize = event.detail.value;
        this.pageNumber = 1;
        refreshApex(this.wiredActivities);
    }

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

    deleteRow(row) {
        deleteRecord(row.Id)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                refreshApex(this.wiredActivities);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    editRowDetails(row) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id,
                actionName: 'edit'}
        });
        refreshApex(this.wiredActivities);
    }


    handleNew(event)
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: event.target.value,
                actionName: 'new'
            }
        });
        refreshApex(this.wiredActivities);
    }

    handleSelectedRows(event)
    {
        this.selectedRowsIds = event.detail.selectedRows.map( row => {
            return row.Id;
        } );

    }

    handleDelete()
    {
        deleteSelected({
            'idLi':this.selectedRowsIds,
            'getObject':this.tabValue
        }).then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records deleted',
                    variant: 'success'
                })
            );
            refreshApex(this.wiredActivities);
            this.selectedRows = [];
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

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

    getTab(event)
    {
        this.tabValue = event.target.value;
    }
}