#!/usr/bin/env bash
npm run build:lib
# cp -R ./lib/* ../sumaq-sites-site-skeleton/node_modules/@sumaq/html-components/lib
# cp -R ./lib/* ../../websites/www-hikeinethiopia-com/node_modules/@sumaq/html-components/lib
# cp -R ./lib/* ../../websites/www-bildraum-at/node_modules/@sumaq/html-components/lib
# cp -R ./lib/* ../../websites/demo-sumaqsites-com/node_modules/@sumaqsites/html-components/lib
rm -rf ../../websites/www-sumaqsites-com/node_modules/@sumaqsites/html-components/lib
mkdir -p ../../websites/www-sumaqsites-com/node_modules/@sumaqsites/html-components/lib
cp -R ./lib/* ../../websites/www-sumaqsites-com/node_modules/@sumaqsites/html-components/lib
