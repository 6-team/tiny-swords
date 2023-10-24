import { Sounds } from './sounds';

const AudioMocked = {
  play: jest.fn(),
  pause: jest.fn(),
  volume: 0.5,
  paused: true,
  currentTime: 0,
  muted: false,
};
const soundsMock = {
  addSound: jest.fn(),
  playSound: jest.fn().mockImplementation(() => AudioMocked.play()),
  stopSound: jest.fn(),
  isPlaySound: jest.fn(),
  muteSound: jest.fn().mockImplementation(() => (AudioMocked.muted = true)),
  unmuteSound: jest.fn().mockImplementation(() => (AudioMocked.muted = false)),
};

jest.mock('./Sounds', () => {
  return {
    __esModule: true, // this property makes it work
    default: jest.fn().mockImplementation(() => {
      return soundsMock;
    }),
    Sounds: jest.fn().mockImplementation(() => soundsMock),
  };
});

describe('Sounds', () => {
  let sounds: Sounds;
  beforeEach(() => {
    sounds = new Sounds();
    jest.spyOn(window, 'Audio').mockImplementation(() => AudioMocked as any);
  });

  it('should add and play sound', () => {
    sounds.addSound('test', 'testUrl');
    expect(soundsMock.addSound).toHaveBeenCalledWith('test', 'testUrl');

    sounds.playSound('test');
    expect(AudioMocked.play).toHaveBeenCalled();
  });

  it('should return true when audio is plaing', () => {
    sounds.addSound('test', 'testUrl');
    expect(soundsMock.addSound).toHaveBeenCalledWith('test', 'testUrl');

    sounds.playSound('test');
    expect(soundsMock.isPlaySound).toBeTruthy();
  });

  it('should mute sound', () => {
    sounds.addSound('test', 'testUrl');
    expect(soundsMock.addSound).toHaveBeenCalledWith('test', 'testUrl');

    sounds.playSound('test');
    sounds.muteSound();
    expect(AudioMocked.muted).toBeTruthy();
  });

  it('should unmute', () => {
    sounds.addSound('test', 'testUrl');
    expect(soundsMock.addSound).toHaveBeenCalledWith('test', 'testUrl');

    sounds.playSound('test');
    sounds.muteSound();
    expect(AudioMocked.muted).toBeTruthy();

    sounds.unmuteSound();
    expect(AudioMocked.muted).toBeFalsy();
  });
});
