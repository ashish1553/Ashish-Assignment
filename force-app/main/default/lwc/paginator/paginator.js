/**
 * @description       : 
 * @author            : ashish765082@gmail.com
 * @group             : 
 * @last modified on  : 12-01-2020
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

    @api pagiNumber1 = 1;
    @api pagiNumber2 = 2;
    @api pagiNumber3 = 3;

    get currentPageNumber() {
        return this.totalItemCount === 0 ? 0 : this.pageNumber;
    }

    get isFirstPage() {
        return this.pageNumber === 1;
    }

    get isLastPage() {
        return this.pageNumber >= this.totalPages;
    }

    get totalPages() {
        return Math.ceil(this.totalItemCount / this.pageSize);
    }

    get variant1() {
        if( this.pagiNumber1 == this.pageNumber )
        {
            return "brand";
        }
        else
        {
            return "";
        }
    }
    get variant2() {
        if( this.pagiNumber2 == this.pageNumber )
        {
            return "brand";
        }
        else
        {
            return "";
        }
    }
    get variant3() {
        if( this.pagiNumber3 == this.pageNumber )
        {
            return "brand";
        }
        else
        {
            return "";
        }
    }

    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
        if ( this.pagiNumber1 != 1 ) {
            this.pagiNumber3 = this.pagiNumber2;
            this.pagiNumber2 = this.pagiNumber1;
            this.pagiNumber1--;
        }
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
        if ( !( this.pagiNumber3 == this.pageNumber ) ) {
            this.pagiNumber1 = this.pagiNumber2;
            this.pagiNumber2 = this.pagiNumber3;
            this.pagiNumber3++;
        }
    }

    handlePagi(event) {
        this.pageNumber = event.target.value;
        if (this.pageNumber == 1) {
            this.pagiNumber1 = 1;
            this.pagiNumber2 = 2;
            this.pagiNumber3 = 3;
        }
        else if (this.pageNumber == this.totalPages) {
            this.pagiNumber1 = this.totalPages - 2;
            this.pagiNumber2 = this.totalPages - 1;
            this.pagiNumber3 = this.totalPages;
        }
        else {
            this.pagiNumber1 = this.pageNumber - 1;
            this.pagiNumber2 = this.pageNumber;
            this.pagiNumber3 = this.pageNumber + 1;
        }
        this.dispatchEvent(new CustomEvent('pagi', {
            detail: this.pageNumber
        }));
    }

}