import {AbstractControl, ValidationErrors} from '@angular/forms';
import {reject, resolve} from 'q';

export class CityFormValidation {
    //използваме validatorFn модела, за да направим функцията cannotContainNumbers валидираща
    //слагаме static, за да можем да достъпваме cannotContainNumbers отвън
    static cannotContainNumbers(control: AbstractControl): ValidationErrors | null {
        if (/\d/.test(control.value as string)) {
            return {
                cannotContainNumbers: true
            };
        }

        return null;
    }

    //Пускаме валидация към server
    static shouldBeCity(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                if (control.value === 'Sofia') {
                    resolve({
                        shouldBeCity: true
                    });
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }
}
