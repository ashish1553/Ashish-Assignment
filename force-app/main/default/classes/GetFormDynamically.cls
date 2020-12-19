/**
 * @description       : This class I have created for taking the the list of fields dynamically according to object API name for the modal form
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-19-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-18-2020   ashish765082@gmail.com   Initial Version
**/
public with sharing class GetFormDynamically {
    
    // This method will fetch the list of fields according to the field set name and object api name
    @AuraEnabled (cacheable=true)
    public static List<String> getFieldSetMember(String objectName , String fieldSetName){
        
        // this list will contain the list of field api name
        List<String> fieldAPINameList = new List<String>();
        Schema.SObjectType sObj = Schema.getGlobalDescribe().get(objectName);

        for(Schema.FieldSetMember fieldMember : sObj.getDescribe().fieldSets.getMap().get(fieldSetName).getFields()){
            String fieldAPIName;
            fieldAPIName = fieldMember.getFieldPath();
            fieldAPINameList.add(fieldAPIName);
        }
        
        return fieldAPINameList;
    }

}
