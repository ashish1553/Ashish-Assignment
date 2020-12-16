/**
 * @description       : This will handle the functionality of the pagination.
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-16-2020
 * @last modified by  : ashish765082@gmail.com
 * Modifications Log 
 * Ver   Date         Author                   Modification
 * 1.0   12-01-2020   ashish765082@gmail.com   Initial Version
**/
import { LightningElement, api } from 'lwc';

export default class Paginator extends LightningElement {
    /** The current page number. */
    @api pageNumber;
    
    /** The number of items on a page. */
    @api pageSize;
    
    /** The total number of items in the list. */
    @api totalItemCount;
    
    // Give the total pages.
    @api totalPages

    // These variable will change according to the page number we are on, So I have defined variables for that.
    @api pageButtonNumber1;
    @api pageButtonNumber2;
    @api pageButtonNumber3;

    // Initializing the variables when component loaded.
    connectedCallback() {
        if (this.pageNumber == 1) {
            this.pageButtonNumber1 = 1;
            this.pageButtonNumber2 = 2;
            this.pageButtonNumber3 = 3;
        }
    }

    // Give the page number of the current page.
    get currentPageNumber() {
        return this.totalItemCount === 0 ? 0 : this.pageNumber;
    }

    // Will check weather first page or not.
    get isFirstPage() {
        return this.pageNumber === 1;
    }

    // check weather last page or not.
    get isLastPage() {
        return this.pageNumber >= this.totalPages;
    }

    // Below three variant method is for higlighting the page number we are on right now.
    get buttonToGlow1() {
        if (this.pageButtonNumber1 == this.currentPageNumber) {
            return "brand";
        }
        else {
            return "";
        }
    }
    get buttonToGlow2() {
        if (this.pageButtonNumber2 == this.currentPageNumber) {
            return "brand";
        }
        else {
            return "";
        }
    }
    get buttonToGlow3() {
        if (this.pageButtonNumber3 == this.currentPageNumber) {
            return "brand";
        }
        else {
            return "";
        }
    }

    // this variable will give option for the checkbox we are using for the number of records we want to display.
    get pgSizes() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '15', value: '15' },
            { label: '25', value: '25' }
        ];
    }

    // This method will handle the clicking of left button and will reduce the page number
    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
        if (this.pageButtonNumber1 > 1) {
            this.pageButtonNumber3 = this.pageButtonNumber2;
            this.pageButtonNumber2 = this.pageButtonNumber1;
            this.pageButtonNumber1--;
        }
    }

    // This method will handle the clicking of right button and will increase the page number.
    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
        if ( !(this.pageButtonNumber3 == this.totalPages) ) {
            this.pageButtonNumber1 = this.pageButtonNumber2;
            this.pageButtonNumber2 = this.pageButtonNumber3;
            this.pageButtonNumber3++;
        }
    }

    // This button will handle the clicking of the page jump button and set the page number according to the button.
    handlePageButtonClick(event) {
        this.dispatchEvent(new CustomEvent('pagebuttonclick', {
            detail: event.target.value
        }));
        if (event.target.value == 1) {
            this.pageButtonNumber1 = 1;
            this.pageButtonNumber2 = 2;
            this.pageButtonNumber3 = 3;
        }
        else if (event.target.value >= this.totalPages) {
            this.pageButtonNumber1 = this.totalPages - 2;
            this.pageButtonNumber2 = this.totalPages - 1;
            this.pageButtonNumber3 = this.totalPages;
        }
        else {
            this.pageButtonNumber1 = event.target.value - 1;
            this.pageButtonNumber2 = event.target.value;
            this.pageButtonNumber3 = event.target.value + 1;
        }
    }

    // Set the page number when changing the checkboxes.
    handleChangeSize(event) {
        this.dispatchEvent(new CustomEvent('changepagesize', {
            detail: event.detail.value
        }))
        this.pageButtonNumber1 = 1;
        this.pageButtonNumber2 = 2;
        this.pageButtonNumber3 = 3;
    }

}