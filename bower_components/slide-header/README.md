Slide Header
==============

A modern modular header for your site

##[demo](http://samccone.github.io/slide-header/demo/index)

####Using with angular
* include both the directive and slide-header.js file on your site
* add 'slide-header' as a dependency.
* add an attribute on one of your nodes of `slide-header`
* profit!

####API

```js
var slideHeader = new SlideHeader(document.querySelectory('header'), {options});

//with jquery
var slideHeader = new SlideHeader($('header')[0], {options});
```

#### Options

```js
mouseTrigger: <true / false> //default true
```

#### API
```js
.destroy()    //removes all events and shows the header
.showHeader()
.hideHeader()
```


####Developing

```npm install```

```cake build```
