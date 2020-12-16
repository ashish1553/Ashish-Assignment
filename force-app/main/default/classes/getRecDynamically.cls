/**
 * @description       : This class is for fetching and deleting records dynamically
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-16-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-16-2020   ashish765082@gmail.com   Initial Version
**/
public with sharing class getRecDynamically {

    // This is a wrapper class for displaying the results
    public class ResultWrapper {
        
        // this list will contain list of records
        @AuraEnabled
        public list<SObject> lstSObject;

        // this list will contain list of fields according to the object selected
        @AuraEnabled
        public list<FieldsWrapper> lstFields;
        
        // constructor for initializing
        public ResultWrapper(list<SObject> lstSObject, list<FieldsWrapper> lstFields) {
            
            this.lstSObject = lstSObject;
            this.lstFields  = lstFields;
        }
    }
    
    // This is a wrapper method for keeping the fields data
    public class FieldsWrapper {
        
        // this will contain field api name
        @AuraEnabled
        public String fieldPath { get;set; }

        // this will contain field label
        @AuraEnabled
        public String label     { get;set; }

        // this will contain the type of field
        @AuraEnabled
        public String type      { get; set; }
        
        public FieldsWrapper(String fieldPath, String strLabel, String strType) {
            this.fieldPath = fieldPath;
            this.label = strLabel;
            this.type = strType;
        }
    }
    
    // This method will get the fields according to the selected object and also will fetch the records
    // Here I have used Field Sets to retrive the desired fields.
    @AuraEnabled (Cacheable=true)
    public static ResultWrapper  fetchObject( String strSObjectName, String strFieldsetName)
    {
        // Initialized variables
        Set<String> setFieldsToQuery = new set<String>();
        List<FieldsWrapper> lstFieldsetWrapper = new List<FieldsWrapper>();
        Map<String, String> mapfiledpathlael = new Map<String, String>();
        
        // This loop will fetch the desired fields according to the selected object and will put them into the FieldWrapper class.
        for(Schema.FieldSetMember fieldSetMemberObj : readFieldSet(strFieldsetName, strSObjectName)) {            
            setFieldsToQuery.add(fieldSetMemberObj.getFieldPath().toLowerCase());
            mapfiledpathlael.put(String.valueOf(fieldSetMemberObj.getType()), fieldSetMemberObj.getFieldPath());
            lstFieldsetWrapper.add(new FieldsWrapper(fieldSetMemberObj.getFieldPath(), fieldSetMemberObj.getLabel(),String.valueOf(fieldSetMemberObj.getType())));
        }

        // Here I have built a query to fetch the records dynamically
        String queryString = 'Select  id, ';
        setFieldsToQuery.remove('id');
        queryString += String.join( new List<String>(setFieldsToQuery), ',');
        queryString.removeEnd(',');
        queryString += ' FROM ' + strSObjectName;
        queryString += ' ORDER BY Name';

        // Dynamically fetching records
        list<SObject> lstSObject = Database.query(queryString);

        // Returned the results
        return new ResultWrapper(lstSObject,lstFieldsetWrapper);
    }
    
    // Fetching Object fields using schema class
    private static List<Schema.FieldSetMember> readFieldSet(String fieldSetName, String ObjectName) {
        Map<String, Schema.SObjectType> GlobalDescribeMap = Schema.getGlobalDescribe(); 
        Schema.SObjectType SObjectTypeObj = GlobalDescribeMap.get(ObjectName);
        Schema.DescribeSObjectResult DescribeSObjectResultObj = SObjectTypeObj.getDescribe();
        Schema.FieldSet fieldSetObj = DescribeSObjectResultObj.FieldSets.getMap().get(fieldSetName);
        return fieldSetObj.getFields(); 
    }
    
    // This method will delete single as well as multiple records.
    @AuraEnabled
    public static boolean deleteRecord(List<Id> recIds) {
        Database.delete(recIds);
        return true;
    }
}
