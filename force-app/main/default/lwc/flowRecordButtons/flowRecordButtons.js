import { LightningElement, api, track } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent, FlowNavigationFinishEvent } from 'lightning/flowSupport';

export default class FlowRecordButtons extends LightningElement {
    @api records = [];
    @api displayFieldApiName = 'Name';
    @api headerText;
    @api subHeaderText;
    @api buttonColor = '#0070d2';
    @api buttonTextColor = '#ffffff';
    @api buttonColorFieldApiName;
    @api showSearch = false;
    @api searchPlaceholder = 'Search...';
    @api mode = 'auto'; // 'auto' | 'single' | 'multi'

    @api availableActions = [];

    // auto + single outputs
    @api selectedRecord;
    @api selectedRecordId;

    // multi outputs
    @api selectedRecords = [];
    @api selectedRecordIds;

    @track _selectedIds = [];
    _singleSelectedId = null;
    searchTerm = '';

    get hasRecords() {
        return this.records && Array.isArray(this.records) && this.records.length > 0;
    }

    get hasHeader() {
        return this.headerText;
    }

    get hasSubHeader() {
        return this.subHeaderText;
    }

    get hasSearch() {
        return this.showSearch && this.hasRecords;
    }

    get isAutoMode() {
        return !this.mode || this.mode === 'auto';
    }

    get isSingleMode() {
        return this.mode === 'single';
    }

    get isMultiMode() {
        return this.mode === 'multi';
    }

    get buttonItems() {
        if (!this.hasRecords) {
            return [];
        }
        const txtColor = this.buttonTextColor || '#ffffff';
        const term = this.searchTerm ? this.searchTerm.toLowerCase().trim() : '';

        return this.records.map(record => {
            const displayValue = this.getDisplayValue(record);
            const isDimmed = term.length > 0 && !displayValue.toLowerCase().includes(term);
            const isSelected = this.isMultiMode
                ? this._selectedIds.includes(record.Id)
                : (this.isSingleMode && this._singleSelectedId === record.Id);

            // Per-record color if a color field is specified, otherwise use the global buttonColor
            const bgColor = (this.buttonColorFieldApiName && record[this.buttonColorFieldApiName])
                ? record[this.buttonColorFieldApiName]
                : (this.buttonColor || '#0070d2');

            // Selected state: invert button colors
            const btnStyle = isSelected
                ? `background-color:${txtColor};color:${bgColor};border-color:${bgColor};font-weight:600`
                : `background-color:${bgColor};color:${txtColor};border-color:${bgColor}`;

            return {
                key: record.Id,
                recordId: record.Id,
                displayValue,
                btnStyle,
                btnClass: isDimmed ? 'record-btn dimmed' : 'record-btn',
                ariaLabel: displayValue
            };
        });
    }

    handleSearchChange(event) {
        this.searchTerm = event.target.value;
    }

    handleButtonClick(event) {
        const recordId = event.currentTarget.dataset.recordId;
        if (!recordId) {
            return;
        }

        const record = this.records.find(r => r.Id === recordId);

        if (this.isAutoMode) {
            this.dispatchEvent(new FlowAttributeChangeEvent('selectedRecord', record));
            this.dispatchEvent(new FlowAttributeChangeEvent('selectedRecordId', recordId));

            // Delay navigation to avoid race condition with attribute change events
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(() => {
                if (this.availableActions.includes('NEXT')) {
                    this.dispatchEvent(new FlowNavigationNextEvent());
                } else if (this.availableActions.includes('FINISH')) {
                    this.dispatchEvent(new FlowNavigationFinishEvent());
                }
            }, 0);
        } else if (this.isSingleMode) {
            if (this._singleSelectedId === recordId) {
                // Deselect
                this._singleSelectedId = null;
                this.dispatchEvent(new FlowAttributeChangeEvent('selectedRecord', null));
                this.dispatchEvent(new FlowAttributeChangeEvent('selectedRecordId', null));
            } else {
                this._singleSelectedId = recordId;
                this.dispatchEvent(new FlowAttributeChangeEvent('selectedRecord', record));
                this.dispatchEvent(new FlowAttributeChangeEvent('selectedRecordId', recordId));
            }
        } else if (this.isMultiMode) {
            if (this._selectedIds.includes(recordId)) {
                this._selectedIds = this._selectedIds.filter(id => id !== recordId);
            } else {
                this._selectedIds = [...this._selectedIds, recordId];
            }
            const selRecords = this.records.filter(r => this._selectedIds.includes(r.Id));
            this.dispatchEvent(new FlowAttributeChangeEvent('selectedRecords', selRecords));
            this.dispatchEvent(new FlowAttributeChangeEvent('selectedRecordIds', this._selectedIds.join(',')));
        }
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
}
