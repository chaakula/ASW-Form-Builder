import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from 'src/app/layout/common/constants';
import { EditParagraphComponent } from 'src/app/layout/basic-controls/edit-controls/edit-paragraph/edit-paragraph.component';
import { ConfirmDialogComponent } from 'src/app/layout/shared-components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'asw-paragraph',
    templateUrl: './paragraph.component.html'
})
export class ParagraphComponent {

    constants: any = Constants;
    /**
     * Paragraph control
     */
    @Input() control: any;

    /**
     * Paragraph control index to help update or delete button from drop area
     */
    @Input() controlIndex: number;
	@Input() isPreviewTemplate: boolean = true;
	
    @Output() paragraphUpdateEvent = new EventEmitter<{control: any, index: number}>();
    @Output() paragraphDeleteEvent = new EventEmitter<number>();

    constructor(public dialog: MatDialog) { }
    
    /**
     * 
     * @param control 
     * @param controlIndex 
     */
  	deleteParagraphDialog(control: any, controlIndex: number): void {
		let dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '350px',
			data: { name: control.label, message: this.constants.messages.waringMessage }
		});
		dialogRef.afterClosed().subscribe(result => {            
			if(result != undefined) {
                this.paragraphDeleteEvent.emit(controlIndex);
			}
		});
	}

	editParagraphDialog(control: any, controlIndex: number): void {
		let dialogRef = this.dialog.open(EditParagraphComponent, {
			disableClose: true,
			width: '744px',
			data: control
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result != undefined) {
				this.paragraphUpdateEvent.emit({control: result, index: controlIndex});
			}
		});
	}
}
