import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
export const locales = ['en','fr'];
export const defaultLocale = 'en';
 
export default getRequestConfig(async ({locale}) => {
 
  return {
    messages: (await import(`@/app/[locale]/messages/${locale}.json`)).default
  };
});