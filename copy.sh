#!/usr/bin/env bash
gulp build:lib
cp -R ./lib/* ../sumaq-site-builder/node_modules/@sumaq/html-components/lib
cp -R ./lib/* ../../websites/www-hikeinethiopia-com/node_modules/@sumaq/html-components/lib
cp -R ./lib/* ../../websites/www-bildraum-at/node_modules/@sumaq/html-components/lib
