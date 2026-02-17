import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent, FlowNavigationFinishEvent } from 'lightning/flowSupport';

export default class FlowRecordButtons extends LightningElement {
    @api records = [];
    @api displayFieldApiName = 'Name';
    @api headerText;
    @api subHeaderText;
    @api buttonColor = '#0070d2';
    @api buttonTextColor = '#ffffff';

    @api availableActions = [];

    @api selectedRecord;
    @api selectedRecordId;

    get hasRecords() {
        return this.records && Array.isArray(this.records) && this.records.length > 0;
    }

    get hasHeader() {
        return this.headerText;
    }

    get hasSubHeader() {
        return this.subHeaderText;
    }

    get buttonItems() {
        if (!this.hasRecords) {
            return [];
        }
        const bgColor = this.buttonColor || '#0070d2';
        const txtColor = this.buttonTextColor || '#ffffff';
        const btnStyle = `background-color:${bgColor};color:${txtColor};border-color:${bgColor}`;

        return this.records.map(record => {
            const displayValue = this.getDisplayValue(record);
            return {
                key: record.Id,
                recordId: record.Id,
                displayValue,
                btnStyle,
                ariaLabel: displayValue
            };
        });
    }

    getDisplayValue(record) {
        if (!record || !this.displayFieldApiName) {
            return 'Unknown';
        }
        try {
            const value = record[this.displayFieldApiName];
            return value != null ? String(value) : 'N/A';
        } catch (error) {
            return 'Error';
        }
    }

    handleButtonClick(event) {
        const recordId = event.currentTarget.dataset.recordId;
        if (!recordId) {
            return;
        }

        const record = this.records.find(r => r.Id === recordId);

        this.dispatchEvent(
            new FlowAttributeChangeEvent('selectedRecord', record)
        );
        this.dispatchEvent(
            new FlowAttributeChangeEvent('selectedRecordId', recordId)
        );

        // Delay navigation to avoid race condition with attribute change events
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            if (this.availableActions.includes('NEXT')) {
                this.dispatchEvent(new FlowNavigationNextEvent());
            } else if (this.availableActions.includes('FINISH')) {
                this.dispatchEvent(new FlowNavigationFinishEvent());
            }
        }, 0);
    }
}
