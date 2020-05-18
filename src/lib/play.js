import {
  addMidiEventListeners,
  createAudioContext,
  makeSound,
  getMidiDevices,
} from './midi';

function handleMidiMessage(audioContext, { hZ, play, oscType }) {
  if (play) {
    makeSound(audioContext, hZ, oscType);
  }
}

function play(onPlay) {
  const audioContext = createAudioContext();

  getMidiDevices().then(devices => {
    addMidiEventListeners(devices, message => {
      handleMidiMessage(audioContext, message);
      onPlay(message);
    });
  });

  return true;
}

export default play;
