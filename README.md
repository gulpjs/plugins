gulp plugins
============
#### ~ [http://gulpjs.com/plugins/](http://gulpjs.com/plugins/)

This app is a simple client-side app that allows one to browse and search gulp plugins.
It fetches data from [npmsearch](http://npmsearch.com/) with the keywords *gulpplugin* and *gulpfriendly*.
npmsearch also provides rankings for plugins(so we don't have to).

Built with [AngularJS](http://angularjs.org) and [gulp](http://gulpjs.com/)

## Blacklisting

To maintain quality in the plugin ecosystem, we sometimes "blacklist" plugins. Being blacklisted means we won't offer support for issues concerning the module and we will not recommend that people use it. You are free to publish anything you want on NPM, but our official plugin list is subject to filtering.

A plugin may be blacklisted for the following reasons:

1. Does not fit within the gulp paradigm
2. Flagrant duplicate of an existing plugin
3. Does not follow the plugin guidelines

If you feel that a plugin has been blacklisted incorrectly or you would like to add a plugin to the blacklist, use the issues page.

## Contributing

We welcome all contributors! But please read the notes:

### Project structure

To develop, run `npm install`. Everything that is needed both for the client and development will be installed
(other than gulp, but you probably have that installed through `npm install -g gulp`).

The app code is in app/, with index.html in assets/, javascript in js/, and css in css/.

One quirk of this is that the README for the gh-pages branch goes in assets (so it is preserved during deployment).

### Development and deployment

Several tasks are available from gulp for development and deployment:

- `gulp`: Builds the project on the master branch
- `gulp deploy`: Builds the project for production and deploys by pushing to the
[gh-pages](https://github.com/gulpjs/plugins/tree/gh-pages) branch.
An example output is [this](https://github.com/gulpjs/plugins/commit/fa4027f90a725d9caa7971fc00e1d3c4174d2026) commit.
This is safe as only people with push access to the repo can deploy(awesome!).
