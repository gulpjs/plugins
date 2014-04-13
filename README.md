gulp plugins
============
#### ~ [http://gulpjs.com/plugins/](http://gulpjs.com/plugins/)

This app is a simple client-side app that allows one to browse and search gulp plugins.
It fetches data from [npmsearch](http://npmsearch.com/) with the keywords *gulpplugin* and *gulpfriendly*.
npmsearch also provides rankings for plugins(so we don't have to).

Built with [AngularJS](http://angularjs.org),
using [brunch](http://brunch.io/), [gulp](http://gulpjs.com/)(surprise!), and [grunt](http://gruntjs.com/).

Note that you can flag plugins for adding to blacklist or removing from blacklist in the app itself.
Press the red label to remove from blacklist, or hover over the plugin and press the flag to add to blacklist.
In the issues, there are labels for removing and adding to blacklist.

## Blacklisting

To maintain quality in the plugin ecosystem, we sometimes blacklist plugins. A plugin may be blacklisted for the following reasons:

1. Does not fit within the gulp paradigm
2. Flagrant duplicate of an existing plugin
3. Does not follow the plugin guidelines

If you feel that a plugin has been blacklisted incorrectly or you would like to add a plugin to the blacklist, use the issues page.

## Contributing

We welcome all contributors! But please read the notes:

### Project structure
To develop, run `npm install` and `bower install`.
Everything that is needed both for the client and development will be installed
(other than gulp, but you probably have that installed through `npm install -g gulp`).
This does use several build systems, grunt, gulp, and brunch.
Brunch handles all of the app minification, concatenation, and development work,
grunt is just for deployment, and gulp is for tying it all together.

As per brunch standards, all the app code is in app/, with index.html in assets/, javascript in js/, and css in css/.
One quirk of this is that the README for the gh-pages branch goes in assets(so it is preserved during deployment).

### Development and deployment
Several tasks are available from gulp for development and deployment:

- `gulp dev`: starts a brunch server on localhost:3333.
Start editing files and see the page reload automatically, pretty cool.
- `gulp deploy`: Courtesy of [grunt-gh-pages](https://github.com/tschaub/grunt-gh-pages),
builds the project for production and deploys by pushing to the
[gh-pages](https://github.com/gulpjs/plugins/tree/gh-pages) branch.
An example output is [this](https://github.com/gulpjs/plugins/commit/fa4027f90a725d9caa7971fc00e1d3c4174d2026) commit.
This is safe as only people with push access to the repo can deploy(awesome!).

If you wish to learn more about brunch(which is instrumental to development), check [the brunch website](http://brunch.io/).
