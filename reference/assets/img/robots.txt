<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/hyperknow_logo.svg" />
    <link rel="apple-touch-icon" href="/hyperknow_logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hyperknow</title>

    <!-- Satoshi: the primary Latin UI face, so it is fetched normally rather
         than deferred — 4KB of CSS, in parallel with the app bundle. -->
    <link rel="stylesheet" href="/font/Satoshi_Complete/Fonts/WEB/css/satoshi.css" />
    <link rel="stylesheet" href="/font/EB_Garamond/eb-garamond.css" />

    <!--
      MiSans (CJK) — self-hosted, see desktop/scripts/prepare-fonts.mjs.
      Loaded non-blockingly: `rel="preload"` fetches at low priority without
      holding up first paint, then the onload handler promotes it to a real
      stylesheet. Chinese text paints immediately in PingFang SC / Microsoft
      YaHei (the next entries in every font stack) and swaps to MiSans when the
      sheet lands. This used to be a blocking <link> to cdn.jsdelivr.net, which
      is unreachable often enough inside mainland China to hold the whole page
      at a white screen until the request timed out.
    -->
    <link
      rel="preload"
      as="style"
      href="/fonts/misans/misans.css"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript><link rel="stylesheet" href="/fonts/misans/misans.css" /></noscript>

    <!-- Decorative display faces (ticket titles, Japanese sample copy). Same
         non-blocking treatment: ChillDuanHeiSong alone is a 1.5MB unsliced CJK
         file, which has no business holding up first paint. -->
    <link
      rel="preload"
      as="style"
      href="/font/ChillDuanHeiSong/chill-duanhei-song.css"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <link
      rel="preload"
      as="style"
      href="/font/Sawarabi_Mincho/sawarabi-mincho.css"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript>
      <link rel="stylesheet" href="/font/ChillDuanHeiSong/chill-duanhei-song.css" />
      <link rel="stylesheet" href="/font/Sawarabi_Mincho/sawarabi-mincho.css" />
    </noscript>

    <style>
      /* First-paint shell. Replaced by the app on mount; without it a slow
         connection stares at a blank white document for the whole download. */
      #root:empty::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        width: 28px;
        height: 28px;
        margin: -14px 0 0 -14px;
        border: 2px solid rgba(0, 0, 0, 0.12);
        border-top-color: rgba(0, 0, 0, 0.45);
        border-radius: 50%;
        animation: hk-boot-spin 0.8s linear infinite;
      }
      @keyframes hk-boot-spin {
        to { transform: rotate(360deg); }
      }
    </style>
    <script type="module" crossorigin src="/assets/js/index-TjoB2Buo.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/css/index-WxmVESBe.css">
  </head>
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K2K5MTZD"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="root"></div>

    <!--
      Google Tag Manager, deferred until after load. googletagmanager.com is
      blocked in mainland China, so requesting it from <head> during startup
      cost those users a connection slot and a timeout before anything
      rendered. dataLayer is defined up front so events queued by the app
      before the tag arrives are not lost.
    -->
    <script>
      window.dataLayer = window.dataLayer || [];
      (function (w, d, i) {
        var inject = function () {
          w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          var s = d.createElement('script');
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtm.js?id=' + i;
          d.head.appendChild(s);
        };
        var schedule = function () {
          if (w.requestIdleCallback) w.requestIdleCallback(inject, { timeout: 4000 });
          else w.setTimeout(inject, 2000);
        };
        if (d.readyState === 'complete') schedule();
        else w.addEventListener('load', schedule);
      })(window, document, 'GTM-K2K5MTZD');
    </script>
  </body>
</html>
