import Enlang from './entries/en-US';
import Falang from './entries/fa-IR';
import {addLocaleData} from 'react-intl';
import {reduxGetter} from 'src/utils/reduxGetter';
import _ from 'lodash';

const AppLocale = {
    en: Enlang,
    fa: Falang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.fa.data);

export default AppLocale;

export const formatMessage = id => {
    const locale = reduxGetter(
        state => state.getIn(['LanguageSwitcher', 'language', 'locale'])
    );

    const localeMessages = _.get(AppLocale, `${locale}.messages`, {});
    return localeMessages[id] ? localeMessages[id] : id;
};
