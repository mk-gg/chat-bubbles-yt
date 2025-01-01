import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Colors } from '../types';

interface ChatState {
  messages: Message[];
  colors: Colors;
  textSize: number;
  disappearTime: number;
  isKeyboardSoundEnabled: boolean;
  keyboardSoundVolume: number;
  selectedSoundPack: string;
  availableSoundPacks: string[];
  isSoundPackLoading: boolean;
  maxBubbleWidth: number;
  fontStyle: string;
  fontFamily: string;
  isBottomAligned: boolean;
  showPreviewDivider: boolean;
  previewGap: number;
  previewDividerColor: string;
  useCustomDividerColor: boolean;
  minPreviewHeight: number;
  inputBackgroundColor: string;
  previewStartsAtTop: boolean;
  addMessage: (text: string) => void;
  removeExpiredMessages: () => void;
  setColors: (colors: Partial<Colors>) => void;
  setTextSize: (size: number) => void;
  setDisappearTime: (time: number) => void;
  toggleKeyboardSound: () => void;
  setKeyboardSoundVolume: (volume: number) => void;
  setSelectedSoundPack: (pack: string) => void;
  setAvailableSoundPacks: (packs: string[]) => void;
  setSoundPackLoading: (isLoading: boolean) => void;
  setMaxBubbleWidth: (width: number) => void;
  setFontStyle: (style: string) => void;
  setFontFamily: (font: string) => void;
  setIsBottomAligned: (isBottom: boolean) => void;
  setShowPreviewDivider: (show: boolean) => void;
  setPreviewGap: (gap: number) => void;
  setPreviewDividerColor: (color: string) => void;
  setUseCustomDividerColor: (use: boolean) => void;
  setMinPreviewHeight: (height: number) => void;
  setInputBackgroundColor: (color: string) => void;
  setPreviewStartsAtTop: (startsAtTop: boolean) => void;
  saveSettings: () => void;
  loadSettings: () => void;
}

const defaultColors: Colors = {
  bubbleColor: "#e5e7eb",
  backgroundColor: "#A0D683",
  textColor: "#1f2937",
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [
        { id: 1, text: "Hello there!", createdAt: Date.now() },
        { id: 2, text: "Try customizing the colors, text size, and message disappear time in the sidebar.", createdAt: Date.now() },
        { id: 3, text: "You can also enable keyboard sounds and change the sound pack.", createdAt: Date.now() },
      ],
      colors: defaultColors,
      textSize: 20,
      disappearTime: 3, // Default to 3 seconds
      isKeyboardSoundEnabled: false,
      keyboardSoundVolume: 0.5,
      selectedSoundPack: 'pack1',
      availableSoundPacks: [],
      isSoundPackLoading: false,
      maxBubbleWidth: 300,
      fontStyle: 'sans-serif',
      fontFamily: 'Inter',
      isBottomAligned: true,
      showPreviewDivider: false,
      previewGap: 0,
      previewDividerColor: "#e5e7eb",
      useCustomDividerColor: false,
      minPreviewHeight: 120,
      inputBackgroundColor: "#ffffff",
      previewStartsAtTop: true,
      addMessage: (text) => set((state) => ({
        messages: [...state.messages, { id: Date.now(), text, createdAt: Date.now() }],
      })),
      removeExpiredMessages: () => set((state) => ({
        messages: state.messages.filter((msg) => Date.now() - msg.createdAt < state.disappearTime * 1000),
      })),
      setColors: (newColors) => set((state) => ({ colors: { ...state.colors, ...newColors } })),
      setTextSize: (size) => set({ textSize: size }),
      setDisappearTime: (time) => set({ disappearTime: time }),
      toggleKeyboardSound: () => set((state) => ({ isKeyboardSoundEnabled: !state.isKeyboardSoundEnabled })),
      setKeyboardSoundVolume: (volume) => set({ keyboardSoundVolume: volume }),
      setSelectedSoundPack: (pack) => set({ selectedSoundPack: pack }),
      setAvailableSoundPacks: (packs) => set({ availableSoundPacks: packs }),
      setSoundPackLoading: (isLoading) => set({ isSoundPackLoading: isLoading }),
      setMaxBubbleWidth: (width) => set({ maxBubbleWidth: width }),
      setFontStyle: (style) => set({ fontStyle: style }),
      setFontFamily: (font) => set({ fontFamily: font }),
      setIsBottomAligned: (isBottom) => set({ isBottomAligned: isBottom }),
      setShowPreviewDivider: (show) => set({ showPreviewDivider: show }),
      setPreviewGap: (gap) => set({ previewGap: gap }),
      setPreviewDividerColor: (color) => set({ previewDividerColor: color }),
      setUseCustomDividerColor: (use) => set({ useCustomDividerColor: use }),
      setMinPreviewHeight: (height) => set({ minPreviewHeight: height }),
      setInputBackgroundColor: (color) => set({ inputBackgroundColor: color }),
      setPreviewStartsAtTop: (startsAtTop) => set({ previewStartsAtTop: startsAtTop }),
      saveSettings: () => {
        const state = get();
        const settings = JSON.stringify({
          colors: state.colors,
          textSize: state.textSize,
          disappearTime: state.disappearTime,
          isKeyboardSoundEnabled: state.isKeyboardSoundEnabled,
          keyboardSoundVolume: state.keyboardSoundVolume,
          selectedSoundPack: state.selectedSoundPack,
          maxBubbleWidth: state.maxBubbleWidth,
          fontFamily: state.fontFamily,
          isBottomAligned: state.isBottomAligned,
          showPreviewDivider: state.showPreviewDivider,
          previewGap: state.previewGap,
          previewDividerColor: state.previewDividerColor,
          useCustomDividerColor: state.useCustomDividerColor,
          minPreviewHeight: state.minPreviewHeight,
          inputBackgroundColor: state.inputBackgroundColor,
          previewStartsAtTop: state.previewStartsAtTop,
        });
        localStorage.setItem('chatSettings', settings);
      },
      loadSettings: () => {
        const settings = localStorage.getItem('chatSettings');
        if (settings) {
          const parsedSettings = JSON.parse(settings);
          set(parsedSettings);
        }
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        colors: state.colors,
        textSize: state.textSize,
        disappearTime: state.disappearTime,
        isKeyboardSoundEnabled: state.isKeyboardSoundEnabled,
        keyboardSoundVolume: state.keyboardSoundVolume,
        selectedSoundPack: state.selectedSoundPack,
        maxBubbleWidth: state.maxBubbleWidth,
        fontFamily: state.fontFamily,
        isBottomAligned: state.isBottomAligned,
        showPreviewDivider: state.showPreviewDivider,
        previewGap: state.previewGap,
        previewDividerColor: state.previewDividerColor,
        useCustomDividerColor: state.useCustomDividerColor,
        minPreviewHeight: state.minPreviewHeight,
        inputBackgroundColor: state.inputBackgroundColor,
        previewStartsAtTop: state.previewStartsAtTop,
      }),
    }
  )
);

