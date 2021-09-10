// import { ValidationProvider } from 'vee-validate';
import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';
import {
  required, email, min, max, alpha_spaces as alphaSpaces,
  min_value as minVal, max_value as maxVal,
  confirmed, not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    // app.component('ValidationProvider', ValidationProvider);
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
    defineRule('required', required);
    defineRule('email', email);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('password_missmatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);
    defineRule('tos', required);

    configure({
      generateMessage: (ctx) => {
        const messeges = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alphaSpaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} has to be a valid email address.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
          country_excluded: 'Due to restrictions, we do not accept users for this location',
          password_missmatch: 'The password do not match.',
          tos: 'You must accept the Terms of Service',
        };
        const message = messeges[ctx.rule.name] ? messeges[ctx.rule.name] : `The field ${ctx.field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
