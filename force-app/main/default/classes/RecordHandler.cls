/**
 * @description       : This class is used for creating and deleting records.
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-19-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-03-2020   ashish765082@gmail.com   Initial Version
**/
public with sharing class RecordHandler {
    
    @AuraEnabled
    public static void createNewRec( ObjectWrapper objToEditOrCreate )
    {
        system.debug(objToEditOrCreate);
        SObject rec;
        if (objToEditOrCreate.ObjectApiName == 'Account') {
            rec = objToEditOrCreate.Account;
        } else if (objToEditOrCreate.ObjectApiName == 'Lead') {
            rec = objToEditOrCreate.Lead;
        } else if (objToEditOrCreate.ObjectApiName == 'Contact') {
            rec = objToEditOrCreate.Contact;
        } else if (objToEditOrCreate.ObjectApiName == 'Opportunity') {
            rec = objToEditOrCreate.Opportunity;
        }
        system.debug(rec);
        // here I have upserted the record because this method is used for both creating and updating the record
        // If record will contain Id then it will update else it will create a new record
        upsert rec;
    }

}
