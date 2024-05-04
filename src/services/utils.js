import {Eta} from 'eta'
const eta = new Eta({
  tags: ["{{", "}}"],
  varName: "$$",
  functionHeader: "const site=$$.site"
})

/**
 * Filters items in the array, by the existence of keys in the object
 * Example:
 ```
 const array = [ {"slug": "revenue", "label": "Revenue", "icon": "las la-coins"},
 {"slug": "number_of_employees", "label": "Number of Employees", "icon": "las la-users"},
 {"slug": "market_share", "label": "Market Share", "icon": "las la-pizza-slice"}]
 const object = {revenue: 50, market_share: 30}
 filterArrayByKeys(array, 'slug', object)
 // returns: [ {"slug": "revenue", "label": "Revenue", "icon": "las la-coins"},
 //  {"slug": "market_share", "label": "Market Share", "icon": "las la-pizza-slice"}]
 ```
 * @param array
 * @param keyField
 * @param object
 */
export function filterArrayByKeys (array, keyField, object) {
  return array.filter(i => object.hasOwnProperty(i[keyField]))
}

/**
 *
 * @param {object} seoConfig - normally contains 'vars' key and additional meta tags template strings
 * @param {object} site - in case we're building seo tags for site page, we need the site object
 * @param {object} siteConfig - configuration from site-config.json
 */
export function buildMetaTags(seoConfig,{site, siteConfig, categories, $$}) {
  console.log('Building seo tags:', seoConfig)
  const tags = {}
  $$ = $$ || {
    siteConfig,
    site,
    categories,
    vars: {}
  }
  if (seoConfig.vars) {
    for (const v of Object.keys(seoConfig.vars)) {
      $$.vars[v] = eta.renderString(seoConfig.vars[v], $$)
    }
  }
  for (const m of Object.keys(seoConfig)) {
    if (m === 'vars') {
      continue
    }
    if (typeof seoConfig[m] === 'object') {
      tags[m] = buildMetaTags(seoConfig[m], {site, siteConfig, $$})
    } else {
      tags[m] = eta.renderString(seoConfig[m], $$)
    }
  }
  return tags
}
