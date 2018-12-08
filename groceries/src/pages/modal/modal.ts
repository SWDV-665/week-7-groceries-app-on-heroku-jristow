import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  modalValues;
  name;
  quantity;
  listitems = [1,2,3,4,5,6,7,8,9,10];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    this.modalValues = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('Modal has been loaded');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public SaveModalData(data){
    this.viewCtrl.dismiss(data);
  }

}