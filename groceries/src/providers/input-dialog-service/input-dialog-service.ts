
import { Injectable } from '@angular/core';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { AlertController, ModalController } from 'ionic-angular';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {
  modalPage;
  constructor(public dataService: GroceriesServiceProvider, public alertCtrl: AlertController, public modalCtrl : ModalController) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  public openModal(item?, index?) {
    console.log('Open');
    var data = {
      modalTitle: item ? 'Edit Item' : 'Add Item',
      modalMessage : item ? 'Please edit item' : 'Please enter item',
      name : item ? item.name : null,
      quantity : item ? item.quantity : null,
      _id : item ? item._id : null,
    };
    this.modalPage = this.modalCtrl.create('ModalPage', data);
    this.modalPage.onDidDismiss(returnedDataFromModal => {
      if(returnedDataFromModal!=undefined) {
        if(index !== undefined) {
          this.dataService.editItem(returnedDataFromModal, index);
        } else {
          this.dataService.addItem(returnedDataFromModal);
        }
      }
    });
    this.modalPage.present();
  }

  /*showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      title: item ? 'Edit Item' : 'Add Item',
      message: item ? "Please edit item" : 'Please enter item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: "Item Quantity",
          value: item ? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked', data);
            if (index !== undefined) {
              item.name = data.name;
              item.quantity = data.quantity;
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(data);
            }
          }
        }
      ]
    });
    prompt.present();
  }*/
}
