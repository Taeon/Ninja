# Ninja

**N**INJA **I**s **N**ot a **J**query **A**lternative. Geddit? Except it is. Sort of.

## What NINJA is

Ninja is intended to be a very small (as in, small file size -- <3.5KB minified, <1.3KB GZipped) stand-in for jQuery, when all you need is some of what it can do -- like DOM manipulation or event handling.

I created it because I wanted to create JavScript libraries that didn't require jQuery, but I often found myself frustrated at having to use JavaScript's verbose syntax. So I wanted to write

```javascript
$( '.button' ).on( 'click', function(){...} );
```

...but instead I had to write

```javascript
document.querySelector( '.button' ).addEventListener( 'click', function(){...} );
```

Not only is that very laborious, it's also very inefficient if you're doing it a lot. So I found myself creating a bunch of helper functions to save time...and then just thought "why not collect them together in one place and make them work like jQuery?".

If you start using NINJA and then later discover that for some reason you need some function from jQuery that NINJA doesn't provide, that's not a problem. Because the syntax is the same, you can just swap out NINJA, add jQuery and off you go -- no code changes required.

## What NINJA is **not**

So NINJA uses jQuery's syntax, but it provides only a very small subset of jQuery's functionality. It is not intended as a like-for-like replacement for jQuery (if you're looking 'jQuery-but-smaller', try [Zepto](https://github.com/madrobby/zepto)) and it will never become that.

## Supported syntax and methods

### Selectors

NINJA uses the same selector syntax as jQuery, so pretty much anything you can do with a jQuery selector, you can do with NINJA. More specifically, it's relies on Javascript's native ```querySelectorAll()``` function -- there are reportedly some inconsistencies between the two ([for example...](https://developer.rackspace.com/blog/using-querySelector-on-elements/)).

I've also heard it said that there are differences between browser implementations (which jQuery fixes). I haven't yet come across any, however.

### Functions

At the moment, NINJA supports the following functions:

- Call a function on document ready

```javascript
$( function(){ alert( 'Hello world!' ); } );
```

- Create a DOM element:

```javascript
var element = $( '<div>Hello World!</div>' );
```

- Add a class

```javascript
$( '.some-class' ).addClass( 'another-class' );
```

- Remove a class

```javascript
$( '.some-class' ).removeClass( 'another-class' );
```

- Has a class?

```javascript
if( $( '.some-class' ).hasClass( 'another-class' ) ){...}
```

- Append

```javascript
$( '#some-element' ).append( '#another-element' );
```
- Prepend

```javascript
$( '#some-element' ).prepend( '#another-element' );
```
- Insert before

```javascript
$( '#some-element' ).insertBefore( '#another-element' );
```
- Insert after

```javascript
$( '#some-element' ).insertAfter( '#another-element' );
```

- Remove

```javascript
$( '#some-element' ).remove();
```

- Each

```javascript
$( '#some-element' ).each( function(){...} );
```

- Add event listener

```javascript
$( '#some-element' ).on( 'click', function(){...} );
```

- Remove event listener

```javascript
$( '#some-element' ).off( 'click', function(){...} );
```

- Proxy

```javascript
var func = $.proxy( function(){...}, this );
```

- Is array

```javascript
if( $.isArray( myArray ) ){...}
```
