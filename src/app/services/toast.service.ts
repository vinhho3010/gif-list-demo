import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.preventDuplicates = true;
   }


  showSuccessToast(message: string) {
    this.toastr.findDuplicate('', message, true, false);
    this.toastr.success(message, '', {
      timeOut: 3000,
    });
  }

  showErrorToast(message: string) {
    this.toastr.findDuplicate('', message, true, false);
    this.toastr.error(message, '', {
      timeOut: 3000,
    });
  }

  showNoticeToast(message: string) {
    this.toastr.findDuplicate('', message, true, false);
    this.toastr.info(message, '', {
      timeOut: 3000,
    });
  }
}
