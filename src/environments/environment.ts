// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // firebase: {
  //   projectId: 'bepositive-blood',
  //   appId: '1:913285372579:web:7d6dbc1352c7841932bd16',
  //   storageBucket: 'bepositive-blood.appspot.com',
  //   apiKey: 'AIzaSyAzXHaRMvqcaRxjfAz5KIDjLpHtGUKRoOc',
  //   authDomain: 'bepositive-blood.firebaseapp.com',
  //   messagingSenderId: '913285372579',
  //   measurementId: 'G-F30MQ97J30',
  // },
  production: false,
   firebaseConfig : {
    apiKey: "AIzaSyAzXHaRMvqcaRxjfAz5KIDjLpHtGUKRoOc",
  authDomain: "bepositive-blood.firebaseapp.com",
  projectId: "bepositive-blood",
  storageBucket: "bepositive-blood.appspot.com",
  messagingSenderId: "913285372579",
  appId: "1:913285372579:web:7d6dbc1352c7841932bd16",
  measurementId: "G-F30MQ97J30"
  },
  mapsKey:"AIzaSyA5Tu8FW1RyrQJTE34qpEngUbbe8_V_2ts",
  CountryJson: [
    { name: 'Pakistan', dial_code: '+92', code: 'PK' },
    { name: 'Albania', dial_code: '+35', code: 'AL' },
    { name: 'Algeria', dial_code: '+213', code: 'DZ' },
    { name: 'AmericanSamoa', dial_code: '+1 684', code: 'AS' },
    { name: 'Andorra', dial_code: '+376', code: 'AD' },
    { name: 'Angola', dial_code: '+244', code: 'AO' },
    { name: 'Anguilla', dial_code: '+1 264', code: 'AI' },
    { name: 'Antigua and Barbuda', dial_code: '+1268', code: 'AG' },
    { name: 'Argentina', dial_code: '+54', code: 'AR' },
    { name: 'Armenia', dial_code: '+374', code: 'AM' },
    { name: 'Aruba', dial_code: '+297', code: 'AW' },
    ]
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
