# OpenRCT2 Soft Guest Cap Inspector

I made this plugin because I want to know bonus value from each ride but
[Sadret's Soft Guest cap Calculator](https://github.com/Sadret/openrct2-soft-guest-cap-calculator) only provide
total value. So, I combine with
[Basssiiie's Park Rating Inspector](https://github.com/Sadret/openrct2-soft-guest-cap-calculator).

Note: Park with Harder Guest Generation doesn't work properly, because some field that use in calculation doesn't get
exposed to plugins.

![img](https://raw.githubusercontent.com/beam41/openrct2-soft-guest-cap-inspector/main/resources/Screenshot.png)

Table can be sort by clicking column header.

## Installation

1. Download the latest version of the plugin from
   the [Releases page](https://github.com/beam41/openrct2-soft-guest-cap-inspector/releases/tag/v0.1).
2. To install it, put the downloaded `*.js` file into your `/OpenRCT2/plugin` folder.

- Easiest way to find the OpenRCT2-folder is by launching the OpenRCT2 game, click and hold on the red toolbox in the
  main menu, and select "Open custom content folder".
- Otherwise this folder is commonly found in `C:/Users/<YOUR NAME>/Documents/OpenRCT2/plugin` on Windows.
- If you already had this plugin installed before, you can safely overwrite the old file.

3. Once the file is there, it should show up ingame in the dropdown menu under the map icon.

## Thanks

- [wisnia74's Typescript Modding Template](https://github.com/wisnia74/openrct2-typescript-mod-template) - My bundler of
  choice can't bundle to es5,So I learn how to set up rollup from this template.

- [Basssiiie's FlexUI](https://github.com/Basssiiie/OpenRCT2-FlexUI) for easy to use UI library.
