module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Chrome'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  browser_args: {
    "Chrome": [
      '--no-sandbox',
      '--headless',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-software-rasterizer',
      '--mute-audio',
      '--remote-debugging-port=9222',
      '--window-size=1440,900'
    ]
    // Chrome: {
    //
    //   ci: [
    //     // --no-sandbox is needed when running Chrome inside a container
    //     process.env.CI ? '--no-sandbox' : null,
    //     '--headless',
    //     '--disable-gpu',
    //     '--disable-dev-shm-usage',
    //     '--disable-software-rasterizer',
    //     '--mute-audio',
    //     '--remote-debugging-port=0',
    //     '--window-size=1440,900'
    //   ].filter(Boolean)
    // }
  }
};

// Set the same timezone with CI server
process.env.TZ = 'America/Los_Angeles';
