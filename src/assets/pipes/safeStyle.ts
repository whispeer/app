import { Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({name: 'safeUrl'})
export class SafeUrl {
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${style}`);
  }
}
