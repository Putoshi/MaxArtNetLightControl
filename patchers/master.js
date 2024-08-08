let Max;
let isMax = true;
try {
  Max = require("max-api");
} catch (e) {
  isMax = false;
}
const CONST_PARAM = require('./module/Const');
const DateCl = require('./module/Date');

const Debug = {
  log: (msg) => {
    if (isMax) {
      Max.post(`${DateCl.dateToFormatString(new Date(), '%MM%/%DD% %HH%:%mm%:%ss%')} : ${msg}`);
    } else {
      console.log(msg);
    }
  }
};

const is_windows = process.platform === 'win32';
const is_mac = process.platform === 'darwin';
const is_linux = process.platform === 'linux';

Debug.log(`isMax: ${isMax}`);

const artnet = require('artnet')({
  host: CONST_PARAM.DMX_IP
});

if (isMax) Max.outlet("NODE_STARTED");

if (isMax) {
  Max.addHandler(Max.MESSAGE_TYPES.ALL, async (...args) => {
    // Debug.log(args);
    switch (args[1]) {
      case 'dmx':
        // artnet.set(3, args[2]);
        // Debug.log(`ch: ${args[2]} ${args[3]} ${args[4]} ${args[5]} ${args[6]} ${args[7]} ${args[8]} ${args[9]}`);
        var chdata = [
          args[4],
          0,
          0,
          0,
          args[5],
          args[6],
          args[7],
          args[8],
          args[9],
          args[10]
        ];
        // args[2], // ARTNET_UNIVERSE
        // args[3], // ARTNET_START_CHANNEL
        artnet.set(args[2], args[3], chdata);
        break;

      case 'dmxmini':
        // artnet.set(3, args[2]);
        // Debug.log(`ch: ${args[2]} ${args[3]} ${args[4]} ${args[5]} ${args[6]} ${args[7]} ${args[8]} ${args[9]}`);
        var chdata = [
          args[4],
          args[5],
          args[6],
          args[7],
          args[8],
          args[9],
          args[10],
          0
        ];
        // args[2], // ARTNET_UNIVERSE
        // args[3], // ARTNET_START_CHANNEL
        artnet.set(args[2], args[3], chdata);
        break;

      case 'dmxdimmer':
        var chdata = [
          args[4],
          args[5],
          args[6],
          args[7],
          args[8]
        ];
        artnet.set(args[2], args[3], chdata);
        break;

    }

  });
}
