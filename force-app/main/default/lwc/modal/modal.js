/**
 * @description       : This contains all the logic behind the modal functionality.
 *                      Here I have first imported all kinds of object fields first.
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-16-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-02-2020   ashish765082@gmail.com   Initial Version
**/
import { LightningElement, api } from 'lwc';

//Importing Apex methods
import createNewRec from '@salesforce/apex/RecordHandler.createNewRec';

//Importing Account object field data.
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_SITE_FIELD from '@salesforce/schema/Account.Site';
import ACCOUNT_SOURCE_FIELD from '@salesforce/schema/Account.AccountSource';
import ACCOUNT_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
const ACCOUNT_FIELDS = [ACCOUNT_NAME_FIELD, ACCOUNT_SITE_FIELD, ACCOUNT_SOURCE_FIELD, ACCOUNT_REVENUE_FIELD, ACCOUNT_TYPE_FIELD];

//Importing Contact object field data.
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import CONTACT_BIRTHDATE_FIELD from '@salesforce/schema/Contact.Birthdate';
import CONTACT_LEADSOURCE_FIELD from '@salesforce/schema/Contact.LeadSource';
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
const CONTACT_FIELDS = [CONTACT_NAME_FIELD, CONTACT_BIRTHDATE_FIELD, CONTACT_LEADSOURCE_FIELD, CONTACT_EMAIL_FIELD, CONTACT_PHONE_FIELD];

//Importing Lead object field data.
import LEAD_NAME_FIELD from '@salesforce/schema/Lead.Name';
import LEAD_COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import LEAD_EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import LEAD_REVENUE_FIELD from '@salesforce/schema/Lead.AnnualRevenue';
import LEAD_INDUSTRY_FIELD from '@salesforce/schema/Lead.Industry';
const LEAD_FIELDS = [LEAD_NAME_FIELD, LEAD_COMPANY_FIELD, LEAD_EMAIL_FIELD, LEAD_REVENUE_FIELD, LEAD_INDUSTRY_FIELD];

//Importing Opportunity object field data.
import OPPORTUNITY_NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import OPPORTUNITY_AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import OPPORTUNITY_STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import OPPORTUNITY_CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import OPPORTUNITY_TYPE_FIELD from '@salesforce/schema/Opportunity.Type';
const OPPORTUNITY_FIELDS = [OPPORTUNITY_NAME_FIELD, OPPORTUNITY_AMOUNT_FIELD, OPPORTUNITY_STAGE_FIELD, OPPORTUNITY_CLOSEDATE_FIELD, OPPORTUNITY_TYPE_FIELD];


export default class Modal extends LightningElement {


    @api type;              // For keeping weather it is edit object modal or new object modal.
    @api recId;             // For keeping the record Id if it is edit object modal.
    @api objectApiName;     // For keeping the object API name of the processing record.

    // this is for storing fields Array.
    myFields;

    // this object I have created for passing the data for the record to the server side. 
    saveObj = {
        ObjectApiName: '',
        RecordId: '',
        Mode: '',
        Account: {},
        Lead: {},
        Opportunity: {},
        Contact: {}
    };

    // Initialised myFields according to the object we are dealing with.
    connectedCallback() {
        if (this.objectApiName == 'Account') {
            this.myFields = ACCOUNT_FIELDS;
        }
        else if (this.objectApiName == 'Lead') {
            this.myFields = LEAD_FIELDS;
        }
        else if (this.objectApiName == 'Contact') {
            this.myFields = CONTACT_FIELDS;
        }
        else if (this.objectApiName == 'Opportunity') {
            this.myFields = OPPORTUNITY_FIELDS;
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
        if (this.objectApiName == 'Account') {
            // Inserting object api name
            this.saveObj.ObjectApiName = 'Account';
            this.saveObj.Account['Name'] = event.detail.fields.Name;
            this.saveObj.Account['Site'] = event.detail.fields.Site;
            this.saveObj.Account['AccountSource'] = event.detail.fields.AccountSource;
            this.saveObj.Account['AnnualRevenue'] = event.detail.fields.AnnualRevenue;
            this.saveObj.Account['Type'] = event.detail.fields.Type;
            // Checking weather it is edit form or not.
            if (this.isEdit) {
                this.saveObj.Account['Id'] = this.recId;
            }

            createNewRec({ objToEditOrCreate: this.saveObj })
                .then(() => {
                    this.saveObj.Account = {};
                    this.saveObj.RecordId = '';
                    this.handleRefresh();
                    this.handleClose();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else if (this.objectApiName == 'Contact') {
            // Inserting object api name
            this.saveObj.ObjectApiName = 'Contact';
            this.saveObj.Contact['FirstName'] = event.detail.fields.FirstName;
            this.saveObj.Contact['LastName'] = event.detail.fields.LastName;
            this.saveObj.Contact['LeadSource'] = event.detail.fields.LeadSource;
            this.saveObj.Contact['Birthdate'] = event.detail.fields.Birthdate;
            this.saveObj.Contact['Email'] = event.detail.fields.Email;
            this.saveObj.Contact['Phone'] = event.detail.fields.Phone;
            // Checking weather it is edit form or not.
            if (this.isEdit) {
                this.saveObj.Contact['Id'] = this.recId;
            }

            createNewRec({ objToEditOrCreate: this.saveObj })
                .then(() => {
                    this.saveObj.Contact = {};
                    this.saveObj.RecordId = '';
                    this.handleRefresh();
                    this.handleClose();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else if (this.objectApiName == 'Lead') {
            // Inserting object api name
            this.saveObj.ObjectApiName = 'Lead';
            this.saveObj.Lead['FirstName'] = event.detail.fields.FirstName;
            this.saveObj.Lead['LastName'] = event.detail.fields.LastName;
            this.saveObj.Lead['Company'] = event.detail.fields.Company;
            this.saveObj.Lead['AnnualRevenue'] = event.detail.fields.AnnualRevenue;
            this.saveObj.Lead['Email'] = event.detail.fields.Email;
            this.saveObj.Lead['Industry'] = event.detail.fields.Industry;
            // Checking weather it is edit form or not.
            if (this.isEdit) {
                this.saveObj.Lead['Id'] = this.recId;
            }

            createNewRec({ objToEditOrCreate: this.saveObj })
                .then(() => {
                    this.saveObj.Lead = {};
                    this.saveObj.RecordId = '';
                    this.handleRefresh();
                    this.handleClose();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else if (this.objectApiName == 'Opportunity') {
            // Inserting object api name
            this.saveObj.ObjectApiName = 'Opportunity';
            this.saveObj.Opportunity['Name'] = event.detail.fields.Name;
            this.saveObj.Opportunity['Amount'] = event.detail.fields.Amount;
            this.saveObj.Opportunity['StageName'] = event.detail.fields.StageName;
            this.saveObj.Opportunity['CloseDate'] = event.detail.fields.CloseDate;
            this.saveObj.Opportunity['Type'] = event.detail.fields.Type;
            // Checking weather it is edit form or not.
            if (this.isEdit) {
                this.saveObj.Opportunity['Id'] = this.recId;
            }

            createNewRec({ objToEditOrCreate: this.saveObj })
                .then(() => {
                    this.saveObj.Opportunity = {};
                    this.saveObj.RecordId = '';
                    this.handleRefresh();
                    this.handleClose();
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }
    
}

