import freq from 'midi-freq';

function createAudioContext() {
  return new AudioContext();
}

function makeSound(audioCtx, hZ = 440, oscType = 'sine', gainL = 0.2) {
  if (!audioCtx || audioCtx.state === 'closed') {
    return;
  }

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.type = oscType;
  osc.frequency.setValueAtTime(hZ, audioCtx.currentTime);

  gainNode.gain.linearRampToValueAtTime(gainL, audioCtx.currentTime);

  osc.start(0);
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
}

function getMidiDevices() {
  var devices = [];

  return navigator.requestMIDIAccess().then(access => {
    access.inputs.forEach(device => {
      devices.push(device);
    });

    return devices;
  });
}

function parseMidiMessage({ data }) {
  const [command, note, velocity] = data;
  const play = command !== 128;
  const hZ = freq(440, note);

  return { hZ, play, velocity };
}

function onMidiMessage(onPlay) {
  return midiMessage => {
    const { hZ, play, velocity } = parseMidiMessage(midiMessage);
    onPlay({ hZ, play, velocity, midiMessage });
  };
}

function addMidiEventListeners(devices, onPlay) {
  devices.forEach(device => {
    device.onmidimessage = message => {
      onMidiMessage(onPlay)(message);
    };
  });
}

export {
  addMidiEventListeners,
  createAudioContext,
  makeSound,
  getMidiDevices,
  onMidiMessage,
  parseMidiMessage,
};
