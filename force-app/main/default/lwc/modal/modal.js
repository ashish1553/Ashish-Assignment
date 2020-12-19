/**
 * @description       : This contains all the logic behind the modal functionality.
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-19-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-02-2020   ashish765082@gmail.com   Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';

//Importing Apex methods
import createNewRec from '@salesforce/apex/RecordHandler.createNewRec';
import getFieldSetMember from '@salesforce/apex/GetFormDynamically.getFieldSetMember';

export default class Modal extends LightningElement {


    @api type;              // For keeping weather it is edit object modal or new object modal.
    @api recId;             // For keeping the record Id if it is edit object modal.
    @api objectApiName;     // For keeping the object API name of the processing record.

    // this is for storing fields Array.
    @track dataFields;

    // this object is for refreshing the apex whenever we change tab
    wiredActivities;

    fieldsRendered = false;

    // this object I have created for passing the data for the record to the server side. 
    saveObj = {
        ObjectApiName: '',
        Account: {},
        Lead: {},
        Opportunity: {},
        Contact: {}
    };

    @wire(getFieldSetMember, { objectName: '$objectApiName', fieldSetName: 'Datatable_Field_Set' })
    wiredRecs({ data, error }) {
        if (data) {
            this.dataFields = data;
        }
        else if (error) {
            console.log(error);
        }
    }

    // To check weather it is edit form or new form.
    get isNew() {
        return this.type == 'New';
    }

    // To check weather it is edit form or new form.
    get isEdit() {
        return this.type == 'Edit';
    }

    // This method is for refreshing the apex datatable after creating, updating and deleting the record.
    handleRefresh() {
        this.dispatchEvent(new CustomEvent('refresh'));
    }

    // This method is for closing the modal on clicking cancel button, cross button or after creating and editing the record. 
    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    // This method handles the edit and creating record functionality according to the object we are dealing with.
    handleSubmit(event) {
        event.preventDefault();

        this.saveObj.ObjectApiName = this.objectApiName;
        this.dataFields.forEach(element => {
            if( element == 'Name' && ( this.objectApiName == 'Contact' || this.objectApiName == 'Lead' ))
            {
                this.saveObj[this.objectApiName]['FirstName'] = event.detail.fields.FirstName;
                this.saveObj[this.objectApiName]['LastName'] = event.detail.fields.LastName;
            }
            else{
                this.saveObj[this.objectApiName][element] = event.detail.fields[element];
            }
        });
        // If it is edit form it will add Id to the record. This will help to update the record
        if (this.isEdit) {
            this.saveObj[this.objectApiName]['Id'] = this.recId;
        }
        console.log(this.saveObj);
        createNewRec({ objToEditOrCreate: this.saveObj })
            .then(() => {
                this.saveObj[this.objectApiName] = {};
                this.saveObj.ObjectApiName = '';
                this.handleRefresh();
                this.handleClose();
            })
            .catch((error) => {
                console.log(error);
            });

    }

}

