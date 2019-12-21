import React from 'react';
import ReactDOM from 'react-dom';

import { flatten } from 'flat';
import { IntlProvider } from "react-intl";
import lang_en from './assets/i18n/messages/en.json';
import lang_zh from './assets/i18n/messages/zh.json';

import ListPage from './components/ListPage';

const messages = {
  'en': flatten(lang_en, { safe: true }),
  'zh': flatten(lang_zh, { safe: true })
}

ReactDOM.render(
  <IntlProvider locale={'zh-CN'} messages={messages.zh}>
    <ListPage />
  </IntlProvider>,
  document.getElementById('root')
);
