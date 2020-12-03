/**
 * @description       : 
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-03-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-02-2020   ashish765082@gmail.com   Initial Version
**/
import { LightningElement, api } from 'lwc';

export default class ToastEvent extends LightningElement {

    @api msgType;
    @api message;

    @api toast = 'demo-only toast';


    get isSuccess(){
        return this.msgType == 'Success';
    }

    get isError(){
        return this.msgType == 'Error';
    }

    get toastVisibility(){
        setTimeout(() => {
            this.toast = this.toast + ' toast--visible';
        },3000);
        return this.toast;
    }

    // success = {
    //     heading: 'Success',
    //     message: this.message,
    //     outerDiv: 'demo-only',
    //     divClass: 'slds-notify slds-notify_toast slds-theme_success',
    //     spanClass: 'slds-icon_container slds-icon-utility-success slds-m-right_small slds-no-flex slds-align-top',
    //     link: '/assets/icons/utility-sprite/svg/symbols.svg#success'
    // }



}