import Handlebars from 'handlebars'
import {
  blured,
  source,
  sourceSet,
  isResponsive,
  isSimple,
  isDefault,
  isBase,
  helperMissing,
  blockHelperMissing
} from '@scripts/helpers'

// Atoms
import author from '~atoms/author/author.html'
import copyright from '~atoms/copyright/copyright.html'
import dataNotFound from '~atoms/data-not-found/data-not-found.html'
import goDown from '~atoms/go-down/go-down.html'
import goUp from '~atoms/go-up/go-up.html'
import image from '~atoms/image/image.html'
import imageResponsive from '~atoms/image/_image-responsive.html'
import imageSimple from '~atoms/image/_image-simple.html'
import imageBase from '~atoms/image/_image-base.html'
import typewriter from '~atoms/typewriter/typewriter.html'
import brand from '~atoms/brand/brand.html'
import menuIcon from '~atoms/menu-icon/menu-icon.html'

// Molecules
import carousel from '~molecules/carousel/carousel.html'
import language from '~molecules/language/language.html'
import menubar from '~molecules/menubar/menubar.html'
import gallery from '~molecules/gallery/gallery.html'
import socialNetworks from '~molecules/social-networks/social-networks.html'
import wordcloud from '~molecules/wordcloud/wordcloud.html'

// Organisms
import comingSoon from '~organisms/coming-soon/coming-soon.html'
import errorPage from '~organisms/error-page/error-page.html'
import hero from '~organisms/hero/hero.html'
import navbar from '~organisms/navbar/navbar.html'

// Atoms
Handlebars.registerPartial('author', author)
Handlebars.registerPartial('copyright', copyright)
Handlebars.registerPartial('dataNotFound', dataNotFound)
Handlebars.registerPartial('goDown', goDown)
Handlebars.registerPartial('goUp', goUp)
Handlebars.registerPartial('image', image)
Handlebars.registerPartial('imageResponsive', imageResponsive)
Handlebars.registerPartial('imageSimple', imageSimple)
Handlebars.registerPartial('imageBase', imageBase)
Handlebars.registerPartial('typewriter', typewriter)
Handlebars.registerPartial('brand', brand)
Handlebars.registerPartial('menuIcon', menuIcon)

// Molecules
Handlebars.registerPartial('carousel', carousel)
Handlebars.registerPartial('language', language)
Handlebars.registerPartial('menubar', menubar)
Handlebars.registerPartial('gallery', gallery)
Handlebars.registerPartial('socialNetworks', socialNetworks)
Handlebars.registerPartial('wordcloud', wordcloud)

// Organisms
Handlebars.registerPartial('comingSoon', comingSoon)
Handlebars.registerPartial('errorPage', errorPage)
Handlebars.registerPartial('hero', hero)
Handlebars.registerPartial('navbar', navbar)

/**
 * Helpers
 */
Handlebars.registerHelper('blured', blured)
Handlebars.registerHelper('source', source)
Handlebars.registerHelper('sourceSet', sourceSet)
Handlebars.registerHelper('isResponsive', isResponsive)
Handlebars.registerHelper('isSimple', isSimple)
Handlebars.registerHelper('isDefault', isDefault)
Handlebars.registerHelper('isBase', isBase)
Handlebars.registerHelper('helperMissing', helperMissing)
Handlebars.registerHelper('blockHelperMissing', blockHelperMissing)

export { Handlebars }
export default Handlebars
