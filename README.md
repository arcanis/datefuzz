# Datefuzz

Datefuzz is a jQuery plugin which update automagically the fuzzy dates (X seconds ago etc) in your application.

## Features

* Ability to change the translation table
* Accepts custom steps (and custom text)
* Works out-of-the-box on Opera, Firefox, Chrome, IE, iOS
* **Does not leak**

If you add new datefuzz elements into your DOM, they will be fuzzified at the next update without more pain. And when you will remove these elements, they won't be called anymore. No user code required.

Oh, and if you don't use the auto-update ... then there won't be any timer on your web page. Can't really lower the footprint, right ?

## API

### $.datefuzz( option, value )
`option` can be any value among :

* **debug** (true / false), true means that datefuzz will warn you if you try to fuzzify a non-time element (default false)
* **interval** (integer), which contains the number of milliseconds between each update (default 1000)
* **selector**, which specify the Sizzle selector which will be automatically updated in the selected containers (default `.datefuzz`)
* **table**, which contains a translation table. Please see the source file for an example. Feel free to open pull requests for adding language tables to the repository
* **parser**, which is a function called to convert a date string into a javascript Date object. The default one is able to parse `YYYY-MM-DD hh:mm:ss` dates (assuming UTC timezone).

### $.datefuzz( container )
Adds a new datefuzz container (jQuery/DOM object or selector) to the update list. Datefuzz containers are used to fetch the elements needing a reprint.

When this function is called for the first time, it starts the automatic updates.

**Note :** if you want to make it easy, you can just add `$.datefuzz( 'body' )` somewhere and you're done.
**Note :** you don't have to add datefuzz elements themselves to the update list. It wouldn't work as expected.

### $.datefuzz( )
Force the fuzzification of managed datefuzz elements (the elements matching `selector` which are in one of the managed containers).

### $( ... ).datefuzz( )
Fuzzify the element even if it is not managed. However, it will not be automatically updated later (that's what `$.datefuzz` is meant for).

## Example

```html
<div id="my-fuzzy-container"></div>

<script>
    $.datefuzz( '#my-fuzzy-container' );
</script>

<script>
    window.setInterval( function ( ) {
        $( '<time/>' )

            // This class will allow the >time/< element to be updated automatically
            // because it will match the `selector` option of Datefuzz.
            .addClass( 'datefuzz' )

            // Note : the external dateFormat script is used here because javascript's Date
            // object is not compatible with the HTML5 Datetime property. What a shame :(
            .attr( 'datetime', dateFormat( new Date( ), dateFormat.masks.isoUtcDateTime ) )

            // Totally optional. Calling this allow to force the fuzzification rather than
            // waiting for the next update. You can call $.datefuzz() too, but it will update
            // every fuzzy date, which should be overkilled.
            .datefuzz( )

        .appendTo( '#my-fuzzy-container' );
    }, 1000 );
</script>
```

## License

    * -------------------------------------------------------------------------------
    * "THE BEER/PIZZA-WARE LICENSE" (Revision 42):
    * <nison.mael@gmail.com> wrote these files. As long as you retain this notice you
    * can do whatever you want with this stuff. If we meet some day, and you think
    * this stuff is worth it, you can buy me a beer or a pizza in return Maël Nison
    * -------------------------------------------------------------------------------
