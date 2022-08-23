#!/usr/bin/env bash
npm run build:lib
# cp -R ./lib/* ../sumaq-sites-site-skeleton/node_modules/@sumaq/html-components/lib
# cp -R ./lib/* ../../websites/www-hikeinethiopia-com/node_modules/@sumaq/html-components/lib
# cp -R ./lib/* ../../websites/www-bildraum-at/node_modules/@sumaq/html-components/lib
# cp -R ./lib/* ../../websites/demo-sumaqsites-com/node_modules/@sumaqsites/html-components/lib
rm -rf /home/eduardo/Workspace/sumaqsites/www-sumaqsites-com/node_modules/@sumaqsites/html-components/lib
mkdir -p /home/eduardo/Workspace/sumaqsites/www-sumaqsites-com/node_modules/@sumaqsites/html-components/lib
cp -R ./lib/* /home/eduardo/Workspace/sumaqsites/www-sumaqsites-com/node_modules/@sumaqsites/html-components/lib
