/**
 * @description       : This class is used for getting data for lightning datatable.
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-03-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   11-30-2020   ashish765082@gmail.com   Initial Version
**/
public with sharing class getRecords {


    // This method will return required data according to the object given in the parameter get Object.
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
                'SELECT Id, Name, Amount, CloseDate, StageName, Type FROM Opportunity' +
                ' WITH SECURITY_ENFORCED' +
                ' ORDER BY Name LIMIT :pageSize OFFSET :offset'
            );
            result.totalItemCount = Database.countQuery(
                'SELECT count() FROM Opportunity '
            );
        }
        else if ( getObject == 'Contact' ) {
            result.records = Database.query(
                'SELECT Id, Name, Email, Phone, Birthdate, LeadSource FROM Contact' +
                ' WITH SECURITY_ENFORCED' +
                ' ORDER BY Name LIMIT :pageSize OFFSET :offset'
            );
            result.totalItemCount = Database.countQuery(
                'SELECT count() FROM Contact '
            );
        }

        return result;
    }

}
