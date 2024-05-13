---
title: "PulseAudio Sound Control"
description: "I run the `pactl` command to change the profile for my Blue Tooth card. Here are the commands I use to list the available cards, list the cards with more details, show the active profiles, and change the profile for the Blue Tooth card."
pubDate: "2024-03-11"
tags: ["Audio", "CLI", "Linux", "PulseAudio"]
---

    $ man pactl |head -n5

    pactl(1)

    NAME
          pactl - Control a running PulseAudio sound server

It seems that setting the following in the PulseAudio config file does not work on my system (Manjaro):

    # /etc/pulse/default.pa
    # https://unix.stackexchange.com/questions/462670/set-default-profile-for-pulseaudio
    .ifexists bluez_card.FC_A8_9A_C6_87_BD
    pactl set-card-profile bluez_card.FC_A8_9A_C6_87_BD a2dp_sink
    .endif

So, I list the available cards:

    $ pactl list short cards

    0  alsa_card.pci-0000_01_00.1      module-alsa-card.c
    1  alsa_card.usb-webcamvendor_Nexi module-alsa-card.c
    2  alsa_card.pci-0000_00_1f.3      module-alsa-card.c
    4  bluez_card.FC_A8_9A_C6_87_BD    module-bluez5-device.c

List cards with more details:

    $ pactl list cards

    Card #4

    Name: bluez_card.FC_A8_9A_C6_87_BD
    Driver: module-bluez5-device.c
    Owner Module: 30

    Properties:
      device.description = "JBL Charge 3"
      device.string = "FC:A8:9A:C6:87:BD"
      device.api = "bluez"
      device.class = "sound"
      device.bus = "bluetooth"
      device.form_factor = "speaker"
      bluez.path = "/org/bluez/hci0/dev_FC_A8_9A_C6_87_BD"
      bluez.class = "0x240414"
      bluez.alias = "JBL Charge 3"
      device.icon_name = "audio-speakers-bluetooth"
      bluetooth.codec = "sbc"

    Profiles:
      a2dp_sink: High Fidelity Playback (A2DP Sink) (sinks: 1, sources: 0, priority: 40, available: yes)
      handsfree_head_unit: Handsfree Head Unit (HFP) (sinks: 1, sources: 1, priority: 30, available: yes)
      off: Off (sinks: 0, sources: 0, priority: 0, available: yes)

    Active Profile: handsfree_head_unit

    Ports:
      speaker-output: Speaker (type: Speaker, priority: 0, latency offset: 0 usec, available)
        Part of profile(s): a2dp_sink, handsfree_head_unit
      speaker-input: Bluetooth Input (type: Bluetooth, priority: 0, latency offset: 0 usec, availability unknown)
        Part of profile(s): handsfree_head_unit

Show active profiles:

    $ pactl list cards | grep 'Active Profile'

    Active Profile: output:hdmi-stereo
    Active Profile: input:mono-fallback
    Active Profile: off
    Active Profile: handsfree_head_unit

Change the profile for the Blue Tooth card:

    $ pactl set-card-profile bluez_card.FC_A8_9A_C6_87_BD a2dp_sink

Show active profile again, notice the new profile:

    $ pactl list cards | grep 'Active Profile'

    Active Profile: output:hdmi-stereo
    Active Profile: input:mono-fallback
    Active Profile: off
    Active Profile: a2dp_sink
