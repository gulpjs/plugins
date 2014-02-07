@SlideHeader = class SlideHeader
  constructor: (selector, options) ->
    @last       = 0
    @shown      = true
    @height     = selector.getBoundingClientRect().height
    @supports3d = selector.style["transform"]? or
                  selector.style["-webkit-transform"]? or
                  selector.style["-moz-transform"]?

    @options =
      speed:        options?.speed  || "300ms"
      selector:     selector
      mouseTrigger: options?.mouseTrigger || true

    @setStyle()

    window.onscroll    = @onScroll
    window.onmousemove = @mouseMove if @options.mouseTrigger

  destroy: ->
    @showHeader()
    window.onmousemove = null
    window.onscroll    = null

  setStyle: ->
    style                   = @options.selector.style
    style.position          = "fixed"
    style.top               = "0px"
    style.left              = "0px"
    style.transition        = "transform #{@options.speed}, top #{@options.speed}"
    style.webkitTransition  = "-webkit-transform #{@options.speed}, top #{@options.speed}"
    style.mozTransition     = "-moz-transform #{@options.speed}, top #{@options.speed}"

  mouseMove: (e) =>
    return if @shown
    @showHeader() if e.pageY - window.pageYOffset < @height * 1.4

  onScroll: (e) =>
    return if @last + 100 > (new Date).getTime() or window.pageYOffset < 0
    @last = (new Date).getTime()

    if window.pageYOffset > @scrollYPosition
      @hideHeader()
    else
      @showHeader()

    @scrollYPosition  = window.pageYOffset

  hideHeader: ->
    return if !@shown
    @shown = false

    style = @options.selector.style

    if @supports3d
      style["transform"]          =  "translate3d(0, -#{@height}px, 0)"
      style["-webkit-transform"]  =  "translate3d(0, -#{@height}px, 0)"
      style["-moz-transform"]     =  "translate3d(0, -#{@height}px, 0)"
    else
      @options.selector.style.top = "-#{@height}px"

  showHeader: ->
    return if @shown
    @shown = true

    style = @options.selector.style

    if @supports3d
      style["transform"]          =  "translate3d(0, 0px, 0)"
      style["-webkit-transform"]  =  "translate3d(0, 0px, 0)"
      style["-moz-transform"]     =  "translate3d(0, 0px, 0)"
    else
      @options.selector.style.top = "0"