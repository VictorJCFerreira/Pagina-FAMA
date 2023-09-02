export function toast(message: string, duration = 2000){
    const toast = document.createElement('ion-toast')
    toast.message = message
    toast.duration = duration
    toast.position = 'middle';

    // Create the toast controller
    const toastController = document.querySelector('ion-toast-controller');
  
    if (toastController) {
      toastController.appendChild(toast);
      return toast.present();
    } else {
      console.error('Ion-toast-controller not found');
      return Promise.reject('Ion-toast-controller not found');
    }
  }