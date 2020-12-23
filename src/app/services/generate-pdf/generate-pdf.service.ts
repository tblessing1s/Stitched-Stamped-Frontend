import { Injectable } from '@angular/core';
import {
  DISPLAY_MONOGRAM,
  DISPLAY_MONOGRAM_COLUMNS,
  DISPLAY_SPECIAL_ORDER,
  DISPLAY_SPECIAL_ORDER_COLUMNS,
  LOGO_IMAGE
} from '../../constants/constants';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Monogram} from '../../models/monogram';
import {SpecialOrder} from '../../models/special-order';
import {Customer} from '../../models/customer';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {

  constructor() { }

  createPDF(customer: Customer, purchaseOrder: any, monogramDataSource: Monogram[], specialOrderDataSource: SpecialOrder[]) {
    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 30, 40, 120],
      content: [
        {
          image: LOGO_IMAGE,
          width: 75,
          height: 50,
          alignment: 'right'
        },
        {text: 'Customer Name: ' + customer.firstName + ' ' + customer.lastName, margin: [0, 15, 0, 0]},
        {text: 'Order Number: ' + purchaseOrder.id},
        {text: 'Order Date: ' + moment(purchaseOrder.create_ts).format('ll')},
        this.buildMonogramSection(monogramDataSource),
        this.buildSpecialOrderSection(specialOrderDataSource)
      ],
      footer: (currentPage, pageCount, pageSize) => {
        console.log(currentPage, pageCount, pageSize);
        if (currentPage === pageCount) {
          return [{
            text: 'By signing your name below, you are agreeing that the information above is correct and item\n' +
              ' custom item or items is non-refundable.', alignment: 'center', margin: [10, 0, 10, 60]
          },
            this.buildSignatureLine()];
        }
      }
    };
    pdfMake.createPdf(docDefinition).print();
  }

  private buildMonogramSection(monogramDataSource: Monogram[]) {
    if (monogramDataSource.length > 0) {
      return [{text: 'Monogram', bold: true, margin: [0, 20, 0, 10]},
        this.buildMonogramTable(monogramDataSource, DISPLAY_MONOGRAM)];
    }
  }

  private buildSpecialOrderSection(specialOrderDataSource: SpecialOrder[]) {
    if (specialOrderDataSource.length > 0) {
      return [{text: 'Special Order', bold: true, margin: [0, 20, 0, 10]},
        this.buildSpecialOrderTable(specialOrderDataSource, DISPLAY_SPECIAL_ORDER)];
    }
  }

  private buildSignatureLine() {
    return [{
      canvas: [{
        type: 'line',
        x1: 70,
        y1: 5,
        x2: 595 - 2 * 40,
        y2: 5,
        lineWidth: 1,
        margin: [10, 50, 10, 60],
        alignment: 'center'
      }]
    }];
  }

  private buildMonogramTable(monogramList: Monogram[], displayMonogram: string[]) {
    return {
      table: {
        headerRows: 1,
        body: this.buildMonogramTableBody(monogramList, displayMonogram)
      }
    };
  }

  private buildSpecialOrderTable(specialOrders: SpecialOrder[], displaySpecialOrder: string[]) {
    return {
      table: {
        headerRows: 1,
        body: this.buildSpecialOrderTableBody(specialOrders, displaySpecialOrder)
      }
    };
  }

  private buildMonogramTableBody(monograms: Monogram[], columns: string[]) {
    const body = [];
    body.push(this.formatColumns(columns));

    const monogramBody = monograms.map(monogram => {
      return {
        itemName: monogram.itemName,
        monogram: monogram.monogram,
        font: monogram.font === 'Other' ? monogram.otherFont : monogram.font,
        threadColor: monogram.threadColor,
        placement: monogram.placement === 'Other' ? monogram.otherPlacement : monogram.placement,
        designNotes: monogram.designNotes ? monogram.designNotes : ''
      };
    });

    this.buildBody(monogramBody, body, DISPLAY_MONOGRAM_COLUMNS, 4);
    return body;
  }

  private buildSpecialOrderTableBody(specialOrders: SpecialOrder[], columns: string[]) {
    const body = [];

    body.push(this.formatColumns(columns));

    const specialOrderBody = specialOrders.map(specialOrder => {
      return {
        itemName: specialOrder.itemName,
        brand: specialOrder.brand,
        size: specialOrder.size,
        itemColor: specialOrder.itemColor,
        designNotes: specialOrder.designNotes
      };
    });

    this.buildBody(specialOrderBody, body, DISPLAY_SPECIAL_ORDER_COLUMNS, 3);
    return body;
  }

  private formatColumns(columns: string[]) {
    const columnsFormatted = [];
    columns.forEach(column => {
      columnsFormatted.push({text: column, fillColor: '#ccc'});
    });
    return columnsFormatted;
  }

  private buildBody(orderTypeBody: any[], body: any[], displayColumns: string[], designNoteColSpan: number) {
    orderTypeBody.forEach(row => {
      const dataRow = [];
      const designNotesRow = [];
      console.log(row);

      displayColumns.forEach(column => {
        console.log(displayColumns, column, row[column]);
        column === 'designNotes' ?
          designNotesRow.push({text: 'Design Notes', fillColor: '#ccc'}, {text: row[column], colSpan: designNoteColSpan}) :
          dataRow.push(row[column]);
      });

      body.push(dataRow);
      if (row.designNotes !== '') {
        body.push(designNotesRow);
      }
    });
  }
}
