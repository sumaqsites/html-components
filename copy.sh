#!/usr/bin/env bash
gulp build:lib
# cp -R ./lib/* ../sumaq-sites-site-skeleton/node_modules/@sumaq/html-components/lib
# cp -R ./lib/* ../../websites/www-hikeinethiopia-com/node_modules/@sumaq/html-components/lib
# cp -R ./lib/* ../../websites/www-bildraum-at/node_modules/@sumaq/html-components/lib
# cp -R ./lib/* ../../websites/demo-sumaqsites-com/node_modules/@sumaqsites/html-components/lib
cp -R ./lib/* ../../websites/www-sumaqsites-at/node_modules/@sumaqsites/html-components/lib
