import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from '../../store';
import PublicRoutes from '../../router';
import { ThemeProvider } from 'styled-components';
import LocaleProvider  from 'antd/lib/locale-provider';
import { IntlProvider } from 'react-intl';
import themes from 'settings/themes/index';
import AppLocale from 'languageProvider/index';
import config, {
  getCurrentLanguage
} from 'containers/LanguageSwitcher/config';
import { themeConfig } from 'settings/index';
import Style from './style';

const currentAppLocale =
  AppLocale[getCurrentLanguage(config.defaultLanguage || 'persian').locale];

const DashApp = () => (
  <LocaleProvider locale={currentAppLocale.antd}>
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <Style>
          <Provider store={store}>
            <PublicRoutes history={history} />
          </Provider>
        </Style>
      </ThemeProvider>
    </IntlProvider>
  </LocaleProvider>
);


export default DashApp;
export { AppLocale };
