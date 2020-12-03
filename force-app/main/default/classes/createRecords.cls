/**
 * @description       : This class is only for test data creation
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-03-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-01-2020   ashish765082@gmail.com   Initial Version
**/
public with sharing class createRecords {

    public static void createAccounts()
    {
        List<Account> accLi = new List<Account>();
        for ( Integer i=0; i<75; i++ ) {
            Account acc = new Account();
            acc.Name = 'Test Account ' + i;
            acc.Type = 'Prospect';
            acc.AnnualRevenue = 50000 + i;
            acc.AccountSource = 'Web';
            acc.Site = 'Account Site' + i;
            accLi.add(acc);
        }
        insert accLi;
    }
    public static void createContact()
    {
        List<Contact> conLi = new List<Contact>();
        for ( Integer i=0; i<75; i++ ) {
            Contact con = new Contact();
            con.FirstName = 'Test';
            con.LastName = ' Contact ' + i;
            con.Email = 'ashish765082@gmail.com';
            con.Phone = '7003919781';
            conLi.add(con);
        }
        insert conLi;
    }
    public static void createOpportunity()
    {
        List<Opportunity> oppLi = new List<Opportunity>();
        for ( Integer i=0; i<75; i++ ) {
            Opportunity opp = new Opportunity();
            opp.Name = 'Test Opportunity ' + i;
            opp.StageName = 'Prospecting';
            Date dat = date.newinstance(1960, 2, 17);
            opp.CloseDate = dat;
            oppLi.add(opp);
        }
        insert oppLi;
    }
    public static void createLead()
    {
        List<Lead> leadLi = new List<Lead>();
        for ( Integer i=0; i<75; i++ ) {
            Lead lead = new Lead();
            lead.FirstName = 'Test';
            lead.LastName = ' Lead ' + i;
            lead.Company = 'test Company';
            leadLi.add(lead);
        }
        insert leadLi;
    }
}