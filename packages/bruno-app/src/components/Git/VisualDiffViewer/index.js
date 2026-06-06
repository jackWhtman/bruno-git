import React from 'react';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import VisualDiffUrlBar from './VisualDiffUrlBar';
import VisualDiffParams from './VisualDiffParams';
import VisualDiffHeaders from './VisualDiffHeaders';
import VisualDiffAuth from './VisualDiffAuth';
import VisualDiffBody from './VisualDiffBody';
import VisualDiffContent from './VisualDiffContent/index';

const diffSectionDataPaths = {
  url: ['request.url', 'request.method'],
  params: 'request.params',
  headers: 'request.headers',
  auth: 'request.auth',
  body: 'request.body'
};

const sectionHasChanges = (sectionKey, oldData, newData) => {
  if (sectionKey === 'body') {
    const oldBody = get(oldData, 'request.body', {});
    const newBody = get(newData, 'request.body', {});
    if (oldBody.mode !== newBody.mode) return true;
    const mode = oldBody.mode || newBody.mode;
    if (!mode || mode === 'none') return false;
    return !isEqual(oldBody[mode], newBody[mode]);
  }

  if (sectionKey === 'auth') {
    const oldAuth = get(oldData, 'request.auth', {});
    const newAuth = get(newData, 'request.auth', {});
    if (oldAuth.mode !== newAuth.mode) return true;
    const mode = oldAuth.mode || newAuth.mode;
    if (!mode || mode === 'none') return false;
    const oldConfig = oldAuth[mode] || {};
    const newConfig = newAuth[mode] || {};

    if (mode === 'oauth2') {
      const grantType = oldConfig.grantType || newConfig.grantType;
      const commonFields = ['grantType', 'scope', 'state'];
      const grantTypeFields = {
        authorization_code: [...commonFields, 'authorizationUrl', 'accessTokenUrl', 'refreshTokenUrl', 'callbackUrl', 'clientId', 'clientSecret'],
        implicit: [...commonFields, 'authorizationUrl', 'callbackUrl'],
        password: [...commonFields, 'accessTokenUrl', 'refreshTokenUrl', 'clientId', 'clientSecret'],
        client_credentials: [...commonFields, 'accessTokenUrl', 'clientId', 'clientSecret']
      };
      const fields = grantTypeFields[grantType] || commonFields;
      return fields.some((field) => !isEqual(oldConfig[field], newConfig[field]));
    }

    const specFields = {
      basic: ['username', 'password'],
      bearer: ['token'],
      apikey: ['key', 'value', 'placement'],
      digest: ['username', 'password']
    };
    const fields = specFields[mode];
    if (fields) {
      return fields.some((field) => !isEqual(oldConfig[field], newConfig[field]));
    }
    return !isEqual(oldConfig, newConfig);
  }

  const paths = diffSectionDataPaths[sectionKey];
  if (Array.isArray(paths)) {
    return paths.some((path) => !isEqual(get(oldData, path), get(newData, path)));
  }
  return !isEqual(get(oldData, paths), get(newData, paths));
};

const diffHasContent = {
  url: (data) => data?.request?.url || data?.request?.method,
  params: (data) => data?.request?.params && data.request.params.length > 0,
  headers: (data) => data?.request?.headers && data.request.headers.length > 0,
  auth: (data) => data?.request?.auth && data.request.auth.mode && data.request.auth.mode !== 'none',
  body: (data) => {
    if (!data?.request?.body) return false;
    const mode = data.request.body.mode;
    if (!mode || mode === 'none') return false;
    return data.request.body.json || data.request.body.text || data.request.body.xml
      || data.request.body.graphql || data.request.body.formUrlEncoded?.length > 0
      || data.request.body.multipartForm?.length > 0;
  }
};

const diffSections = [
  { key: 'url', title: 'URL', Component: VisualDiffUrlBar, hasContent: diffHasContent.url },
  { key: 'params', title: 'Parameters', Component: VisualDiffParams, hasContent: diffHasContent.params },
  { key: 'headers', title: 'Headers', Component: VisualDiffHeaders, hasContent: diffHasContent.headers },
  { key: 'auth', title: 'Authentication', Component: VisualDiffAuth, hasContent: diffHasContent.auth },
  { key: 'body', title: 'Body', Component: VisualDiffBody, hasContent: diffHasContent.body }
];

const VisualDiffViewer = ({ oldData, newData, leftLabel = 'Before', rightLabel = 'After' }) => {
  return (
    <VisualDiffContent
      oldData={oldData}
      newData={newData}
      sections={diffSections}
      sectionHasChanges={sectionHasChanges}
      oldLabel={leftLabel}
      newLabel={rightLabel}
      hideUnchanged={true}
    />
  );
};

export default VisualDiffViewer;
