+++
title = "Hotkeys and Window Management on macOS"
slug = "hotkeys-window-management"
description = "Improve your hotkeys and window management on macOS with the help of Karabiner Elements and Raycast. Customize your own hotkeys and actions to make your workflow more efficient. Discover the benefits of these free applications, including the ability to replace the Caps Lock key with the Hyper Key, move windows to the sides, maximize windows, and create Quicklinks with aliases. Enhance your experience with a better hotkey setup." 
date = 2023-01-09
+++

I find window management one of the biggest weaknesses of macOS. However, it can be remedied with a bit of effort. You may have heard of applications such as [Magnet](https://magnet.crowdcafe.com/) or [Rectangle](https://rectangleapp.com/), but there is a better, free alternative in my opinion. Before discussing that, let's talk about hotkeys.

Imagine having a hotkey that could do anything you want. That would be great, right? With what I'm going to show you, you can customise your own hotkeys and actions. It has truly improved the way I use my MacBook.

## Goodbye Caps Lock, hello Hyper Key

I rarely use the Caps Lock. Occasionally, I'll type in all caps to shout at someone over text, but otherwise it's not very useful for me. I can just hold down Shift! I’ve replaced it with something called the **Hyper Key**. 

With the Hyper Key, you can combine it with any other key. It is unlikely to be assigned to any existing shortcuts, so you can use that hotkey anywhere on macOS.

## How do I get this Hyper Key thing?

To assign the Hyper Key, I use an application called Karabiner Elements. The link is [here](https://karabiner-elements.pqrs.org/).

The setup process can be overwhelming, as many things may pop up. Take your time and follow the instructions. Once it's running, let's set up something called **Rules**.

Simplified Explanation: When you press a key, it performs an action. This action is usually outputting a letter, symbol, or initiating a command (e.g. Control, Option, Command, Escape, etc.). With rules, we can customise that action! Below is a screenshot of the rules I use.

![Untitled](/blog/Karabiner-Rules.png)

## How do I add rules?

1. Open Karabiner Elements Settings from the menu bar.
2. Select 'Complex Modifications' on the side menu.
3. Press the 'Add rule' button.
4. Click the 'Import more rules from the Internet (Open a web browser)' button.
5. Search for `CAPS_LOCK to Hyper/Escape, Hyper + i/j/k/l Vim navigation and others`.
6. Press the 'import' button on the top result.
7. Enable `CAPS_LOCK to HYPER (SHIFT+COMMAND+OPTION+CONTROL) or ESCAPE (If Alone)`.
8. Search for `Disable WifiDiagnostics shortcuts (Free up Hyper-W)`.
9. Import and enable `Disable command+control+option+shift+, which triggers WiFi logging`.

If you've done it correctly, pressing Caps Lock won't cause the key to light up!

## How can I start using the Hyper Key?

You could assign it in applications you already use but I highly recommend you to use it in an application called Raycast. For those of you who are familiar to the Spotlight feature on macOS, it's essentially that but on steroids. It has clipboard history, window management, extensions, you can map hotkeys for any app, and so much more with the built in store. The link for Raycast is [here](https://www.raycast.com/).

After installing it, I recommend binding it with Hyper + Space. To open up Raycast settings you can toggle Raycast and then press Command + Comma or you can search for the settings with Raycast.

## Okay, what hotkeys should I use?

I'm not sure which applications you use, but here are some of my hotkeys. I have the entire bottom row free, except for Hyper + C, which centres my focused window.

| Hotkey | Action |
| --- | --- |
| Hyper + Space | Open Raycast |
| Hyper + W | Open Arc |
| Hyper + S | Open Spotify |
| Hyper + A | Open iTerm2 |
| Hyper + N | Open Notion |
| Hyper + M | Open Messages |
| Hyper + B | Open Sublime Text |
| Hyper + V | Open Anki |
| Hyper + X | Open Mail |
| Hyper + Z | Open Todoist |
| Control + Enter | Toggle Bitwarden Shortcut in Raycast |

## Did you forget about Window Management?

No, here it is! Raycast can also manage my windows. I find this even faster than the typical window snapping that Windows has! Super powerful stuff.

![Untitled](/blog/Window-Hotkeys.png)

The amount of customisation you can do in Raycast is impressive. It's definitely worth checking out if you can. There's a learning curve with the hotkeys, but once you get used to them, life becomes much easier.

## Minimal Setup Suggestion

As a starting point, I would set up:

- Hyper + Space to toggle Raycast
- Hyper + Arrow Keys to move windows to the sides
- Hyper + Enter to maximise windows
- Create a "Quicklink" to "Search Google" with an alias of "gs" or any other short name.

If you enter "gs" into Raycast and press Space, you can make a quick Google search and it’ll open in your default browser.

Once you start experimenting, you'll find what works for you. The hotkeys I showed are what work for me; feel free to use them as inspiration. If you need any help, don't hesitate to reach out to me via email or text if you have my number!

V 😊