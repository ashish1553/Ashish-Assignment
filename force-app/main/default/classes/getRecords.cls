/**
 * @description       : 
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-01-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   11-30-2020   ashish765082@gmail.com   Initial Version
**/
public with sharing class getRecords {



    @AuraEnabled(Cacheable=true)
    public static recordLi getRecordsMethods( String getObject, Integer pageNumber, Integer pageSize){
        
        Integer offset = (pageNumber - 1) * pageSize;
        recordLi result = new recordLi();
        result.pageSize = pageSize;
        result.pageNumber = pageNumber;
        
        if ( getObject == 'Account' ) {
            result.records = Database.query(
                'SELECT Id, Name, Site, AnnualRevenue, AccountSource, Type FROM Account' +
                ' WITH SECURITY_ENFORCED' +
                ' ORDER BY Name LIMIT :pageSize OFFSET :offset'
            );
            result.totalItemCount = Database.countQuery(
                'SELECT count() FROM Account '
            );
        }
        else if ( getObject == 'Lead' ) {
            result.records = Database.query(
                'SELECT Id, Name, Company, AnnualRevenue, Email, Industry FROM Lead' +
                ' WITH SECURITY_ENFORCED' +
                ' ORDER BY Name LIMIT :pageSize OFFSET :offset'
            );
            result.totalItemCount = Database.countQuery(
                'SELECT count() FROM Lead '
            );
        }
        else if ( getObject == 'Opportunity' ){
            result.records = Database.query(
                'SELECT Id, Name, Amount, LeadSource, ExpectedRevenue, Type FROM Opportunity' +
                ' WITH SECURITY_ENFORCED' +
                ' ORDER BY Name LIMIT :pageSize OFFSET :offset'
            );
            result.totalItemCount = Database.countQuery(
                'SELECT count() FROM Opportunity '
            );
        }
        else if ( getObject == 'Contact' ) {
            result.records = Database.query(
                'SELECT Id, Name, Email, Phone, MailingAddress, LeadSource FROM Contact' +
                ' WITH SECURITY_ENFORCED' +
                ' ORDER BY Name LIMIT :pageSize OFFSET :offset'
            );
            result.totalItemCount = Database.countQuery(
                'SELECT count() FROM Contact '
            );
        }
        
        system.debug(result);

        return result;
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
