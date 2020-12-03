/**
 * @description       : This class is used for creating and deleting records.
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-03-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-03-2020   ashish765082@gmail.com   Initial Version
**/
public with sharing class RecordHandler {
    
    @AuraEnabled
    public static void createNewRec( ObjectWrapper objWrap )
    {
        system.debug(objWrap);
        SObject rec;
        if (objWrap.ObjectApiName == 'Account') {
            rec = objWrap.Account;
        } else if (objWrap.ObjectApiName == 'Lead') {
            rec = objWrap.Lead;
        } else if (objWrap.ObjectApiName == 'Contact') {
            rec = objWrap.Contact;
        } else if (objWrap.ObjectApiName == 'Opportunity') {
            rec = objWrap.Opportunity;
        }
        system.debug(rec);
        upsert rec;
    }

    @AuraEnabled
    public static List<String> deleteSelected(List<String> idLi, String getObject){

        if (getObject == 'Account') {
            List<SObject> recs = Database.query('SELECT Id FROM Account WHERE Id IN :idLi');        
            delete recs;
        } else if (getObject == 'Lead') {
            List<SObject> recs = Database.query('SELECT Id FROM Lead WHERE Id IN :idLi');        
            delete recs;
        } else if (getObject == 'Opportunity') {
            List<SObject> recs = Database.query('SELECT Id FROM Opportunity WHERE Id IN :idLi');        
            delete recs;
        } else if (getObject == 'Contact'){
            List<SObject> recs = Database.query('SELECT Id FROM Contact WHERE Id IN :idLi');        
            delete recs;
        }
        
        return idLi;
    }
}
