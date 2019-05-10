/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
import { Aurelia } from "aurelia-framework";
import environment from "./environment";
import { PLATFORM } from "aurelia-pal";
import * as Bluebird from "bluebird";
import {ValidationMessageProvider} from 'aurelia-validation';
import { I18N, TCustomAttribute } from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';


import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName("resources/index"))
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      let aliases = ['t', 'i18n'];
      // add aliases for 't' attribute
      TCustomAttribute.configureAliases(aliases);

      // register backend plugin
      instance.i18next.use(Backend);

      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
        },
        attributes: aliases,
        lng: 'en',
        fallbackLng: 'fr',
        ns: ['translation'],
        defaultNS: 'translation',
        debug: false
      });
    });

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }
  const i18n = aurelia.container.get(I18N);

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName("app")));

  ValidationMessageProvider.prototype.getMessage = function (key) {
    const translation = i18n.tr(`errorMessages.${key}`);
    return this.parser.parse(translation);
  };

  ValidationMessageProvider.prototype.getDisplayName = function (propertyName, displayName) {
    if (displayName !== null && displayName !== undefined) {
      return displayName;
    }
    return i18n.tr(propertyName);
  };
}
