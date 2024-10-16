export const createReviveAdserverZone = (webUrl, zoneId) => {
  // Validate input
  if (!webUrl || !zoneId) {
    console.error("Both webUrl and zoneId are required.");
    return;
  }

  // Define the ad server URL based on the protocol
  var m3_u =
    location.protocol == "https:"
      ? "https://revive.defendertz.com/delivery/ajs.php"
      : "http://revive.defendertz.com/delivery/ajs.php";

  // Generate a random number for cache-busting
  var m3_r = Math.floor(Math.random() * 99999999999);

  // Create the script tag
  var scriptTag =
    "<script type='text/javascript'><!--//<![CDATA[\n" +
    "   var m3_u = '" +
    m3_u +
    "';\n" +
    "   var m3_r = " +
    m3_r +
    ";\n" +
    "   if (!document.MAX_used) document.MAX_used = ',';\n" +
    "   document.write(\"<scr+ipt type='text/javascript' src='\" + m3_u;\n" +
    '   document.write("?zoneid=' +
    zoneId +
    '");\n' +
    "   document.write('&amp;cb=' + m3_r);\n" +
    "   if (document.MAX_used != ',') document.write('&amp;exclude=' + document.MAX_used);\n" +
    "   document.write(document.charset ? '&amp;charset=' + document.charset : (document.characterSet ? '&amp;charset=' + document.characterSet : ''));\n" +
    "   document.write('&amp;loc=' + escape(window.location));\n" +
    "   if (document.referrer) document.write('&amp;referer=' + escape(document.referrer));\n" +
    "   if (document.context) document.write('&context=' + escape(document.context));\n" +
    '   document.write("\'><\\/scr+ipt>");\n' +
    "//]]>--></script>";

  // Insert the script tag into the document
  document.write(scriptTag);

  // Add a noscript fallback
  var noscriptTag =
    "<noscript><a href='https://revive.defendertz.com/delivery/ck.php?n=aa3c4139&amp;cb=" +
    m3_r +
    "' target='_blank'>" +
    "<img src='https://revive.defendertz.com/delivery/avw.php?zoneid=" +
    zoneId +
    "&amp;cb=" +
    m3_r +
    "&amp;n=aa3c4139' border='0' alt='' /></a></noscript>";

  // Insert the noscript tag into the document
  document.write(noscriptTag);
};
