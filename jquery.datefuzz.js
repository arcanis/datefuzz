( function ( $ ) {
    var containers = $();
    var chrono     = null;

    var relative = function ( n, str ) {
        return n >= 0 ? str + ' ago' : 'in ' + str;
    };

    var plural = function ( a ) {
        return a != 1 ? 's' : '';
    };

    var table = {
               1000 : function ( n, a ) { return relative( n, a + ' second' + plural( a ) ); },
              60000 : function ( n, a ) { return relative( n, a + ' minute' + plural( a ) ); },
            3600000 : function ( n, a ) { return relative( n, a + ' hour'   + plural( a ) ); },
           86400000 : function ( n, a ) { return relative( n, a + ' day'    + plural( a ) ); },
          604800000 : function ( n, a ) { return relative( n, a + ' week'   + plural( a ) ); },
         2419200000 : function ( n, a ) { return relative( n, a + ' month'  + plural( a ) ); },
        29030400000 : function ( n, a ) { return relative( n, a + ' year'   + plural( a ) ); }
    };

    var options = {
          debug : false,
       interval : 1000,
       selector : '.-datefuzz',
          table : table
    };

    var iterate = function ( ) {
        window.clearTimeout( chrono );
        chrono = window.setTimeout( iterate, options.interval );

        $( options.selector, containers ).datefuzz( );
    };

    $.datefuzz = function ( container, value ) {
        if ( arguments.length >= 2 ) {
            if ( ! Object.prototype.hasOwnProperty.call( options, container ) ) {
                options.debug && console.log( 'Setting invalid property "' + container + '"' );
            } else {
                options[ container ] = value;
            }
        } else if ( typeof container === 'object' && ! ( container instanceof $ ) ) {
            for ( var key in container ) {
                if ( Object.prototype.hasOwnProperty.call( container, key ) ) {
                    $.datefuzz( key, container[ key ] );
                }
            }
        } else {
            if ( arguments.length >= 1 ) {
                containers = containers.add( container );
            }

            iterate( );
        }

        return this;
    };

    $.fn.datefuzz = function ( ) {
        var nowmsec = Date.now( );

        this.each( function ( ) {
            if ( this.tagName.toLowerCase( ) != 'time' ) {
                options.debug && console.log( 'Warning : calling datefuzz on a non-time tag' );
            } else {
                var datetime = new Date( $( this ).attr( 'datetime' ) );
                var pastmsec = datetime.getTime( );

                var diffmsec = nowmsec - pastmsec;

                var bestFit = null;
                for ( var unit in options.table ) {
                    if ( Object.prototype.hasOwnProperty.call( table, unit ) ) {
                        unit = parseInt( unit, 10 );
                        if ( ! isNaN( unit ) && ( bestFit === null || ( unit > bestFit && Math.floor( diffmsec / unit ) >= 1 ) ) ) {
                            bestFit = unit;
                        }
                    }
                }

                if ( bestFit !== null ) {
                    var value = Math.floor( diffmsec / bestFit );
                    $( this ).text( table[ bestFit ]( value, Math.abs( value ) ) );
                }
            }
        } );

        return this;
    };
} )( jQuery );
