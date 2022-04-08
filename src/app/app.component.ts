import { Component } from '@angular/core';
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { AppService, inventory } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inventory.Web';
  rowData: any;
  kernalRowData: any;
  inventory: boolean = false;
  noInventory: boolean = false;
  inventorySelectionValue = '1';
  public inventoryData: any;
  public requestedKernals: any;
  public inventoryList = [
    {
      label: '1', value: '1'
    },
    {
      label: '2', value: '2'
    },
    {
      label: '3', value: '3'
    }
  ]
  private onDestroy$ = new Subject<void>();



  columnDefs = [{ field: "id" }, { field: "name" }, { field: "kernels" }];

  kernalcolumnDefs = [{ field: "id" }, { field: "inventoryId" }, { field: "requestedKernels" }]

  constructor(private appService: AppService) { }
  ngOnInit(): void {

    this.loadInventory();
  }

  private loadInventory(): void {
    this.appService.GetInventory().subscribe((resp) => {

      this.rowData = resp.inventory;
      this.kernalRowData = resp.requests
    });
  }

  fetchRequestKernals(inputValue: string) {
    if (inputValue) {
      this.appService
        .GetInventoryById(Number(this.inventorySelectionValue), Number(inputValue))
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((_) => {
          if (_ == true) {
            this.noInventory = false;
            this.inventory = true;
          } else {
            this.inventory = false;
            this.noInventory = true;
          }
        });
    } else {
      alert("Enter input value");
    }
  }

}


