/**
 * @description       : This class is for taking the data form the client side in a object. I have used this for parsing.
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-19-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-03-2020   ashish765082@gmail.com   Initial Version
**/
public with sharing class ObjectWrapper {
    
    @AuraEnabled
    public String ObjectApiName { get; set; }
    
    @AuraEnabled 
    public Account Account { get; set; }

    @AuraEnabled 
    public Contact Contact { get; set; }

    @AuraEnabled 
    public Lead Lead { get; set; }

    @AuraEnabled 
    public Opportunity Opportunity { get; set; }
}
