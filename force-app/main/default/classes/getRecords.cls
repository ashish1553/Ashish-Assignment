/**
 * @description       : This class is used for getting data for lightning datatable.
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-16-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   11-30-2020   ashish765082@gmail.com   Initial Version
**/
public with sharing class getRecords {


    // This method will return required data according to the object given in the parameter get Object.
    @AuraEnabled(Cacheable=true)
    public static List<SObject> getRecordsMethods( String getObjectName ){

        List<SObject> result = new List<SObject>();

        if ( getObjectName == 'Account' ) {
            result = Database.query(
                'SELECT Id, Name, Site, AnnualRevenue, AccountSource, Type FROM Account' +
                ' WITH SECURITY_ENFORCED' +
                ' ORDER BY Name'
            );
        }
        else if ( getObjectName == 'Lead' ) {
            result = Database.query(
                'SELECT Id, Name, Company, AnnualRevenue, Email, Industry FROM Lead' +
                ' WITH SECURITY_ENFORCED' +
                ' ORDER BY Name'
            );
        }
        else if ( getObjectName == 'Opportunity' ){
            result = Database.query(
                'SELECT Id, Name, Amount, CloseDate, StageName, Type FROM Opportunity' +
                ' WITH SECURITY_ENFORCED' +
                ' ORDER BY Name'
            );
        }
        else if ( getObjectName == 'Contact' ) {
            result = Database.query(
                'SELECT Id, Name, Email, Phone, Birthdate, LeadSource FROM Contact' +
                ' WITH SECURITY_ENFORCED' +
                ' ORDER BY Name'
            );
        }

        return result;
    }

}
