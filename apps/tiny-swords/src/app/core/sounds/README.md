# Sounds

The `Sounds` class provides methods to handle sound operations in your JavaScript applications. It allows you to add, play, stop, check if a sound is playing, and mute/unmute all sounds.

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Methods](#methods)
- [Installation](#installation)

## Usage

### Creating a Sounds Instance

You can create a `Sounds` instance as follows:

```javascript
import { Sounds } from './sounds';

// Create a new instance of Sounds.
const sounds = new Sounds();
```

### Adding a Sound

You can add a new sound using the `addSound` method.

```javascript
sounds.addSound('click', 'click.mp3');
```

### Playing a Sound

You can play a sound using the `playSound` method.

```javascript
sounds.playSound('click');
```

### Mutting sounds

You can mute all sounds using the `muteSound` method.

```javascript
sounds.muteSound();
```

## Properties

- `_sounds` (private): A collection of sounds.

## Methods

- `addSound(name: string, url: string)`: Adds a new sound to the collection.
- `playSound(name: string, volume?: number)`: Plays a sound from the collection. You can also set the volume (between 0.0 and 1.0).
- `stopSound(name: string)`: Stops a sound from the collection.
- `isPlaySound(name: string)`: Checks if a particular sound is currently being played.
- `muteSound()`: Mutes all sounds in the collection.
- `unmuteSound()`: Unmutes all sounds in the collection.

## Installation

You can include the `Sounds` class in your project by importing it as shown in the usage examples.

## Note

This class requires the use of the `Audio` Web API which might not be available in all browsers. Please check the [browser compatibility of the Audio API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio#browser_compatibility) before using this class.

Please remember to host the sound files on a server or a place that can be accessed by the JavaScript file at runtime. Local files would not work due to the browser's same-origin policy.
