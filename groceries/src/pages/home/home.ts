import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List";

  items = [];
  errorMessage: string;
  
  
  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController, 
    public dataService: GroceriesServiceProvider, 
    public inputDialogService: InputDialogServiceProvider, 
    public socialSharing: SocialSharing) {
      dataService.dataChanged$.subscribe((dataChanged: boolean) => {
        this.loadItems();
      });

  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error
      );
  }

  removeItem(id) {
    this.dataService.removeItem(id);
  }

  shareItem(item, index) {
    console.log("Sharing item: ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing item: ' + item.name + "...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item Name: " + item.name + " Quantity: " + item.quantity;
    let subject = "Shared via groceries app";
    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared successfully");
    }).catch((error) => {
      console.error("Error while sharing", error);
    });
  }

  addItem() {
    console.log("Adding item to list");
    this.inputDialogService.openModal();
  }

  editItem(item, index) {
    console.log("Edit item: ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing item: ' + index + "...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.openModal(item, index);
  }
  






}
