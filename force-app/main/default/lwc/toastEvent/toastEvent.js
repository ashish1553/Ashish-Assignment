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

export default class ToastEvent extends LightningElement {

    @api msgType;
    @api message;


    get isSuccess(){
        return this.msgType == 'success';
    }

    get isError(){
        return this.msgType == 'error';
    }
}