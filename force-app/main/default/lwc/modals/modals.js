/**
 * @description       : 
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-02-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-02-2020   ashish765082@gmail.com   Initial Version
**/
import { LightningElement, api } from 'lwc';

//Importing Account object data.
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_SITE_FIELD from '@salesforce/schema/Account.Site';
import ACCOUNT_SOURCE_FIELD from '@salesforce/schema/Account.AccountSource';
import ACCOUNT_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
const ACCOUNT_FIELDS = [ACCOUNT_NAME_FIELD, ACCOUNT_SITE_FIELD, ACCOUNT_SOURCE_FIELD, ACCOUNT_REVENUE_FIELD, ACCOUNT_TYPE_FIELD];

//Importing Contact object data.
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import CONTACT_MAILINGADDRESS_FIELD from '@salesforce/schema/Contact.MailingAddress';
import CONTACT_LEADSOURCE_FIELD from '@salesforce/schema/Contact.LeadSource';
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
const CONTACT_FIELDS = [CONTACT_NAME_FIELD, CONTACT_MAILINGADDRESS_FIELD, CONTACT_LEADSOURCE_FIELD, CONTACT_EMAIL_FIELD, CONTACT_PHONE_FIELD];

//Importing Lead object data.
import LEAD_NAME_FIELD from '@salesforce/schema/Lead.Name';
import LEAD_COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import LEAD_EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import LEAD_REVENUE_FIELD from '@salesforce/schema/Lead.AnnualRevenue';
import LEAD_INDUSTRY_FIELD from '@salesforce/schema/Lead.Industry';
const LEAD_FIELDS = [LEAD_NAME_FIELD, LEAD_COMPANY_FIELD, LEAD_EMAIL_FIELD, LEAD_REVENUE_FIELD, LEAD_INDUSTRY_FIELD];

//Importing Opportunity object data.
import OPPORTUNITY_NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import OPPORTUNITY_AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import OPPORTUNITY_LEADSOURCE_FIELD from '@salesforce/schema/Opportunity.LeadSource';
import OPPORTUNITY_REVENUE_FIELD from '@salesforce/schema/Opportunity.ExpectedRevenue';
import OPPORTUNITY_TYPE_FIELD from '@salesforce/schema/Opportunity.Type';
const OPPORTUNITY_FIELDS = [OPPORTUNITY_NAME_FIELD, OPPORTUNITY_AMOUNT_FIELD, OPPORTUNITY_LEADSOURCE_FIELD, OPPORTUNITY_REVENUE_FIELD, OPPORTUNITY_TYPE_FIELD];

export default class Modals extends LightningElement {

    @api objectApiName;
    @api type;
    @api recId;

    // this is for storing fields Array.
    myFields;

    // To check weather it is edit form or new form.
    get isNew()
    {
        return this.type == 'New';
    }

    // To check weather it is edit form or new form.
    get isEdit()
    {
        return this.type == 'Edit';
    }
    
    connectedCallback()
    {
        if(this.objectApiName == 'Account'){
            this.myFields = ACCOUNT_FIELDS;
        }
        else if(this.objectApiName == 'Lead'){
            this.myFields = LEAD_FIELDS;
        }
        else if(this.objectApiName == 'Contact'){
            this.myFields = CONTACT_FIELDS;
        }
        else if(this.objectApiName == 'Opportunity'){
            this.myFields = OPPORTUNITY_FIELDS;
        }
    }

    handleCreated()
    {
        this.dispatchEvent(new CustomEvent('refresh'))
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}