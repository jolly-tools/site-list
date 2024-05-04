# Site List

A generator for a website that shows a list of sites with some common features. e.g. top javascript frameworks

## Bring your own data
Update the files under `/data` with your own:
- `site-config.json` - General settings for the site:
  - `name` - Name of your site. Appears in pages title
  - `title` - Text that appears as main site header (H1) in the main page. Accepts html tags
  - `subtitle` - Text that appears as subtitle (H2) in the main page. Accepts html tags
  - `linksRef` - Value that will be used when linking to external  URLs. E.g. If you point to example site, the link will look like this: `https://example.com?ref=<yourLinksRef>`
- `site-list.json` - Your curated list of sites. If you open source your site, you can allow users suggest new sites by creating a PR with an update to this file
- `categories.json` - List of categories. Icons should reference [line-awesome](https://icons8.com/line-awesome)

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Build the app for production
```bash
quasar build
```
