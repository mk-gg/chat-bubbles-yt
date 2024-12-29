import React, { useEffect } from 'react';
import { useChatBubble } from '../providers/ChatBubbleProvider';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { RefreshCw, Volume2, Github, ChevronDown, Save, Upload } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const fontOptions = [
  'Inter', 'DM Sans', 'Satoshi', 'Mona Sans', 'Hubot Sans', 'Public Sans', 'Switzer', 
  'Geist Sans', 'Space Grotesk', 'Figtree', 'Source Sans Pro', 'Manrope', 'Be Vietnam Pro', 
  'Fira Sans', 'Poppins', 'Raleway', 'Muli', 'Work Sans', 'Helvetica', 'Roboto', 'Montserrat', 
  'Lato', 'San Francisco', 'Lexend', 'Supreme', 'Hind', 'Outfit', 'General Sans', 'Open Sans', 
  'HK Grotesk', 'Nacelle'
];

export const Sidebar: React.FC = () => {
  const {
    colors,
    textSize,
    disappearTime,
    isKeyboardSoundEnabled,
    keyboardSoundVolume,
    selectedSoundPack,
    setColors,
    setTextSize,
    setDisappearTime,
    toggleKeyboardSound,
    setKeyboardSoundVolume,
    setSelectedSoundPack,
    availableSoundPacks,
    setAvailableSoundPacks,
    isSoundPackLoading,
    maxBubbleWidth,
    setMaxBubbleWidth,
    fontFamily,
    setFontFamily,
    isBottomAligned,
    setIsBottomAligned,
    showPreviewDivider,
    setShowPreviewDivider,
    previewGap,
    setPreviewGap,
    previewDividerColor,
    useCustomDividerColor,
    setPreviewDividerColor,
    setUseCustomDividerColor,
    minPreviewHeight,
    setMinPreviewHeight,
    inputBackgroundColor,
    setInputBackgroundColor,
    saveSettings,
    loadSettings,
    previewStartsAtTop,
    setPreviewStartsAtTop,
  } = useChatBubble();

  useEffect(() => {
    const loadSoundPacks = async () => {
      try {
        const soundPacksModule = await import('../assets/soundpacks');
        const packs = Object.keys(soundPacksModule.default);
        setAvailableSoundPacks(packs);
        if (packs.length > 0 && !packs.includes(selectedSoundPack)) {
          setSelectedSoundPack(packs[0]);
        }
      } catch (error) {
        console.error('Error loading sound packs:', error);
      }
    };

    loadSoundPacks();
  }, [setAvailableSoundPacks, setSelectedSoundPack, selectedSoundPack]);

  const resetColors = () => {
    setColors({
      bubbleColor: "#e5e7eb",
      backgroundColor: "#A0D683",
      textColor: "#1f2937",
    });
    setTextSize(20);
    setInputBackgroundColor("#ffffff");
  };

  return (
    <div className="bg-gray-100 w-64 p-4 overflow-y-auto flex flex-col h-full font-sans text-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Settings</h2>
      <div className="space-y-4 flex-grow">
        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium">
            Message Settings
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            <div>
              <Label htmlFor="disappearTime" className="text-xs font-medium text-gray-700">Disappear Time</Label>
              <Slider
                id="disappearTime"
                min={1}
                max={30}
                step={1}
                value={[disappearTime]}
                onValueChange={(value) => setDisappearTime(value[0])}
                className="mt-1"
              />
              <span className="text-xs text-gray-500">{disappearTime} seconds</span>
            </div>
            <div>
              <Label htmlFor="textSize" className="text-xs font-medium text-gray-700">Text Size</Label>
              <Slider
                id="textSize"
                min={10}
                max={24}
                step={1}
                value={[textSize]}
                onValueChange={(value) => setTextSize(value[0])}
                className="mt-1"
              />
              <span className="text-xs text-gray-500">{textSize}px</span>
            </div>
            <div>
              <Label htmlFor="maxBubbleWidth" className="text-xs font-medium text-gray-700">Max Bubble Width</Label>
              <Slider
                id="maxBubbleWidth"
                min={100}
                max={500}
                step={10}
                value={[maxBubbleWidth]}
                onValueChange={(value) => setMaxBubbleWidth(value[0])}
                className="mt-1"
              />
              <span className="text-xs text-gray-500">{maxBubbleWidth}px</span>
            </div>
            <div>
              <Label htmlFor="previewGap" className="text-xs font-medium text-gray-700">Preview Gap</Label>
              <Slider
                id="previewGap"
                min={0}
                max={64}
                step={4}
                value={[previewGap]}
                onValueChange={(value) => setPreviewGap(value[0])}
                className="mt-1"
              />
              <span className="text-xs text-gray-500">{previewGap}px</span>
            </div>
            <div>
              <Label htmlFor="minPreviewHeight" className="text-xs font-medium text-gray-700">Min Preview Height</Label>
              <Slider
                id="minPreviewHeight"
                min={0}
                max={200}
                step={4}
                value={[minPreviewHeight]}
                onValueChange={(value) => setMinPreviewHeight(value[0])}
                className="mt-1"
              />
              <span className="text-xs text-gray-500">{minPreviewHeight}px</span>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="useCustomDividerColor" className="text-xs font-medium text-gray-700">
                Custom Divider Color
              </Label>
              <Switch
                id="useCustomDividerColor"
                checked={useCustomDividerColor}
                onCheckedChange={setUseCustomDividerColor}
              />
            </div>
            {useCustomDividerColor && (
              <div>
                <Label className="text-xs font-medium text-gray-700">Divider Color</Label>
                <ColorPicker
                  color={previewDividerColor}
                  onChange={(color) => setPreviewDividerColor(color)}
                  label="Choose color"
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <Label htmlFor="previewStartsAtTop" className="text-xs font-medium text-gray-700">
                Preview Starts at Top
              </Label>
              <Switch
                id="previewStartsAtTop"
                checked={previewStartsAtTop}
                onCheckedChange={setPreviewStartsAtTop}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium">
            Appearance
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            <div>
              <Label htmlFor="fontFamily" className="text-xs font-medium text-gray-700">Font Family</Label>
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-700">Bubble Color</Label>
              <ColorPicker
                color={colors.bubbleColor}
                onChange={(color) => setColors({ bubbleColor: color })}
                label="Choose color"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-700">Background Color</Label>
              <ColorPicker
                color={colors.backgroundColor}
                onChange={(color) => setColors({ backgroundColor: color })}
                label="Choose color"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-700">Text Color</Label>
              <ColorPicker
                color={colors.textColor}
                onChange={(color) => setColors({ textColor: color })}
                label="Choose color"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-700">Input Background Color</Label>
              <ColorPicker
                color={inputBackgroundColor}
                onChange={(color) => setInputBackgroundColor(color)}
                label="Choose color"
              />
            </div>
            <Button onClick={resetColors} variant="outline" size="sm" className="w-full">
              <RefreshCw className="mr-2 h-3 w-3" />
              Reset Colors & Size
            </Button>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium">
            Keyboard Sound
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="keyboardSound" className="text-xs font-medium text-gray-700">Enable Sound</Label>
              <Switch
                id="keyboardSound"
                checked={isKeyboardSoundEnabled}
                onCheckedChange={toggleKeyboardSound}
              />
            </div>
            {isKeyboardSoundEnabled && (
              <>
                <div>
                  <Label htmlFor="keyboardVolume" className="flex items-center text-xs font-medium text-gray-700">
                    <Volume2 className="w-3 h-3 mr-1" />
                    Volume
                  </Label>
                  <Slider
                    id="keyboardVolume"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[keyboardSoundVolume]}
                    onValueChange={(value) => setKeyboardSoundVolume(value[0])}
                    className="mt-1"
                  />
                  <span className="text-xs text-gray-500">{Math.round(keyboardSoundVolume * 100)}%</span>
                </div>
                <div>
                  <Label htmlFor="soundPack" className="text-xs font-medium text-gray-700">Sound Pack</Label>
                  <Select
                    value={selectedSoundPack}
                    onValueChange={setSelectedSoundPack}
                    disabled={isSoundPackLoading}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select a sound pack" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSoundPacks.map((pack) => (
                        <SelectItem key={pack} value={pack}>
                          {pack}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isSoundPackLoading && (
                    <p className="text-xs text-muted-foreground mt-1">Loading sound pack...</p>
                  )}
                </div>
              </>
            )}
          </CollapsibleContent>
        </Collapsible>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bottomAlign" className="text-xs font-medium text-gray-700">
              Bottom-aligned Messages
            </Label>
            <Switch
              id="bottomAlign"
              checked={isBottomAligned}
              onCheckedChange={setIsBottomAligned}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showPreviewDivider" className="text-xs font-medium text-gray-700">
              Show Preview Divider
            </Label>
            <Switch
              id="showPreviewDivider"
              checked={showPreviewDivider}
              onCheckedChange={setShowPreviewDivider}
            />
          </div>
        </div>
      </div>
      <div className="mt-auto pt-4 space-y-2">
        <Button variant="outline" size="sm" className="w-full" onClick={saveSettings}>
          <Save className="mr-2 h-3 w-3" />
          Save Settings
        </Button>
        <Button variant="outline" size="sm" className="w-full" onClick={loadSettings}>
          <Upload className="mr-2 h-3 w-3" />
          Load Settings
        </Button>
        <a
        href="https://github.com/mk-gg/chat-bubbles-yt" 
        target="_blank" 
        rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm" className="w-full">
            <Github className="mr-2 h-3 w-3" />
            View on GitHub
          </Button>
        </a>
      </div>
    </div>
  );
};

