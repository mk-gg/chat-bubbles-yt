import React, { useEffect, useRef, useCallback } from 'react';
import { useChatBubble } from '../providers/ChatBubbleProvider';

interface KeyConfig {
  [key: string]: [number, number];
}

interface SoundConfig {
  id: string;
  name: string;
  key_define_type: string;
  includes_numpad: boolean;
  sound: string;
  defines: KeyConfig;
}

const keycodesRemap = (defines: KeyConfig): KeyConfig => {
  return { ...defines };
};

export const KeyboardSoundPlayer: React.FC = () => {
  const { 
    isKeyboardSoundEnabled, 
    keyboardSoundVolume, 
    selectedSoundPack, 
    setSoundPackLoading 
  } = useChatBubble();
  const [config, setConfig] = React.useState<SoundConfig | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundBufferRef = useRef<AudioBuffer | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const loadSoundPack = useCallback(async () => {
    if (!isKeyboardSoundEnabled) return;

    setSoundPackLoading(true);
    try {
      const soundPacksModule = await import('../assets/soundpacks');
      const selectedPack = soundPacksModule.default[selectedSoundPack];
      if (selectedPack) {
        setConfig(selectedPack.config);

        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        if (!gainNodeRef.current) {
          gainNodeRef.current = audioContextRef.current.createGain();
          gainNodeRef.current.connect(audioContextRef.current.destination);
        }

        const response = await fetch(selectedPack.sound);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        soundBufferRef.current = audioBuffer;
      }
    } catch (error) {
      console.error('Error loading sound pack:', error);
    } finally {
      setSoundPackLoading(false);
    }
  }, [isKeyboardSoundEnabled, selectedSoundPack, setSoundPackLoading]);

  useEffect(() => {
    loadSoundPack();
  }, [loadSoundPack]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(keyboardSoundVolume, audioContextRef.current?.currentTime || 0);
    }
  }, [keyboardSoundVolume]);

  const playSound = useCallback((start: number, duration: number) => {
    if (!audioContextRef.current || !soundBufferRef.current || !gainNodeRef.current || !isKeyboardSoundEnabled) return;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = soundBufferRef.current;
    source.connect(gainNodeRef.current);

    source.start(0, start / 1000, duration / 1000);
  }, [isKeyboardSoundEnabled]);

  const handleKeyEvent = useCallback((event: KeyboardEvent) => {
    if (!config) return;

    let key = event.code;
    const isKeyUp = event.type === 'keyup';

    const keyMap: { [key: string]: string } = {
      'Escape': '1', 'F1': '59', 'F2': '60', 'F3': '61', 'F4': '62', 'F5': '63', 'F6': '64',
      'F7': '65', 'F8': '66', 'F9': '67', 'F10': '68', 'F11': '87', 'F12': '88',
      'Backquote': '41', 'Digit1': '2', 'Digit2': '3', 'Digit3': '4', 'Digit4': '5',
      'Digit5': '6', 'Digit6': '7', 'Digit7': '8', 'Digit8': '9', 'Digit9': '10', 'Digit0': '11',
      'Minus': '12', 'Equal': '13', 'Backspace': '14',
      'Tab': '15', 'KeyQ': '16', 'KeyW': '17', 'KeyE': '18', 'KeyR': '19', 'KeyT': '20',
      'KeyY': '21', 'KeyU': '22', 'KeyI': '23', 'KeyO': '24', 'KeyP': '25',
      'BracketLeft': '26', 'BracketRight': '27', 'Enter': '28',
      'ControlLeft': '29', 'KeyA': '30', 'KeyS': '31', 'KeyD': '32', 'KeyF': '33', 'KeyG': '34',
      'KeyH': '35', 'KeyJ': '36', 'KeyK': '37', 'KeyL': '38',
      'Semicolon': '39', 'Quote': '40', 'Backslash': '43',
      'ShiftLeft': '42', 'KeyZ': '44', 'KeyX': '45', 'KeyC': '46', 'KeyV': '47', 'KeyB': '48',
      'KeyN': '49', 'KeyM': '50', 'Comma': '51', 'Period': '52', 'Slash': '53', 'ShiftRight': '54',
      'AltLeft': '56', 'Space': '57', 'CapsLock': '58', 'AltRight': '3640',
      'ControlRight': '3613', 'MetaLeft': '3675', 'MetaRight': '3676', 'ContextMenu': '3677',
      'ArrowUp': '57416', 'ArrowLeft': '57419', 'ArrowRight': '57421', 'ArrowDown': '57424',
      'Insert': '3666', 'Delete': '3667', 'Home': '3655', 'End': '3663', 'PageUp': '3657', 'PageDown': '3665',
      'PrintScreen': '3639', 'ScrollLock': '70', 'Pause': '3653',
      'NumLock': '69', 'NumpadDivide': '3637', 'NumpadMultiply': '55', 'NumpadSubtract': '74',
      'NumpadAdd': '78', 'NumpadEnter': '3612', 'NumpadDecimal': '83',
      'Numpad1': '79', 'Numpad2': '80', 'Numpad3': '81', 'Numpad4': '75',
      'Numpad5': '76', 'Numpad6': '77', 'Numpad7': '71', 'Numpad8': '72', 'Numpad9': '73', 'Numpad0': '82'
    };

    if (keyMap[key]) {
      key = keyMap[key];
    }

    if (isKeyUp) {
      key = `${key}-up`;
    }

    const remappedConfig = keycodesRemap(config.defines);
    let [start, duration] = remappedConfig[key] || [0, 0];

    // Fallback mechanism
    if (start === 0 && duration === 0) {
      const fallbackKeys = Object.keys(remappedConfig).filter(k => 
        (isKeyUp ? k.endsWith('-up') : !k.endsWith('-up'))
      );
      if (fallbackKeys.length > 0) {
        const randomFallback = fallbackKeys[Math.floor(Math.random() * fallbackKeys.length)];
        [start, duration] = remappedConfig[randomFallback];
      }
    }

    if (start && duration) {
      playSound(start, duration);
    }
  }, [config, playSound]);

  useEffect(() => {
    if (isKeyboardSoundEnabled) {
      window.addEventListener('keydown', handleKeyEvent);
      window.addEventListener('keyup', handleKeyEvent);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyEvent);
      window.removeEventListener('keyup', handleKeyEvent);
    };
  }, [isKeyboardSoundEnabled, handleKeyEvent]);

  return null;
};

