import {
    FormGroup,
    ValidationErrors,
} from '@angular/forms';
export function birthDateValidation(date :any): any {
    return (group: FormGroup): ValidationErrors => {
        const dateOfBirth = group.controls['birthDate'];
        if (dateOfBirth.value) {
            const dob = date.transform(dateOfBirth.value, 'yyyy');
            if ((new Date()).getFullYear() - dob < 18) {
                dateOfBirth.setErrors({minAge: true});
            } else {
                dateOfBirth.setErrors(null);
            }
        }
        return {};
    };
}

