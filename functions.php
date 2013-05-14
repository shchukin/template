<?php

function getOS() {

    $useragent = $_SERVER['HTTP_USER_AGENT'];

    if ( ! stristr($useragent, 'Mobile' )
        && stristr($useragent, 'Windows' )
    )
        return 'windows';

    if (   stristr($useragent, 'Mobile' )
        && stristr($useragent, 'Windows' )
    )
        return 'wp';

    if ( ! stristr($useragent, 'Mobile' )
        && stristr($useragent, 'Mac OS' )
    )
        return 'mac';

    if (   stristr($useragent, 'Mobile' )
        && stristr($useragent, 'Mac OS' )
    )
        return 'iOS';

    if ( stristr($useragent, 'Android') )
        return 'android';
}

function getBrowser() {

    $useragent = $_SERVER['HTTP_USER_AGENT'];

    if ( stristr($useragent, 'Chrome'  ) ) return 'chrome';
    if ( stristr($useragent, 'Safari'  ) ) return 'safari';
    if ( stristr($useragent, 'Firefox' ) ) return 'firefox';
    if ( stristr($useragent, 'Opera'   ) ) return 'opera';
    if ( stristr($useragent, 'MSIE'    ) )
    {
        if ( stristr($useragent, 'MSIE 10' ) ) return 'ie ie10';
        if ( stristr($useragent, 'MSIE 9' ) )  return 'ie ie9';
        if ( stristr($useragent, 'MSIE 8' ) )  return 'ie ie8';
        if ( stristr($useragent, 'MSIE 7' ) )  return 'ie ie7';
    }
}

?>
