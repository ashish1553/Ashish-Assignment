/**
 * @description       : This will handle the functionality of the pagination.
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-03-2020
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

    // These variable will change according to the page number we are on, So I have defined variables for that.
    @api pagiNumber1;
    @api pagiNumber2;
    @api pagiNumber3;

    // Initializing the variables when component loaded.
    connectedCallback() {
        if (this.pageNumber == 1) {
            this.pagiNumber1 = 1;
            this.pagiNumber2 = 2;
            this.pagiNumber3 = 3;
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

    // Give the total pages.
    get totalPages() {
        return Math.ceil(this.totalItemCount / this.pageSize);
    }

    // Below three variant method is for higlighting the page number we are on right now.
    get variant1() {
        if (this.pagiNumber1 == this.currentPageNumber) {
            return "brand";
        }
        else {
            return "";
        }
    }
    get variant2() {
        if (this.pagiNumber2 == this.currentPageNumber) {
            return "brand";
        }
        else {
            return "";
        }
    }
    get variant3() {
        if (this.pagiNumber3 == this.currentPageNumber) {
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
        if (this.pagiNumber1 != 1) {
            this.pagiNumber3 = this.pagiNumber2;
            this.pagiNumber2 = this.pagiNumber1;
            this.pagiNumber1--;
        }
    }

    // This method will handle the clicking of right button and will increase the page number.
    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
        if (!(this.pagiNumber3 == this.pageNumber)) {
            this.pagiNumber1 = this.pagiNumber2;
            this.pagiNumber2 = this.pagiNumber3;
            this.pagiNumber3++;
        }
    }

    // This button will handle the clicking of the page jump button and set the page number according to the button.
    handlePagi(event) {
        this.dispatchEvent(new CustomEvent('pagi', {
            detail: event.target.value
        }));
        if (event.target.value == 1) {
            this.pagiNumber1 = 1;
            this.pagiNumber2 = 2;
            this.pagiNumber3 = 3;
        }
        else if (event.target.value == this.totalPages) {
            this.pagiNumber1 = this.totalPages - 2;
            this.pagiNumber2 = this.totalPages - 1;
            this.pagiNumber3 = this.totalPages;
        }
        else {
            this.pagiNumber1 = event.target.value - 1;
            this.pagiNumber2 = event.target.value;
            this.pagiNumber3 = event.target.value + 1;
        }
    }

    // Set the page number when changing the checkboxes.
    handleChangeSize(event) {
        this.dispatchEvent(new CustomEvent('changesize', {
            detail: event.detail.value
        }))
        this.pagiNumber1 = 1;
        this.pagiNumber2 = 2;
        this.pagiNumber3 = 3;
    }

}