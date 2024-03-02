---
pubDate: 2020-06-01
title: "How to Install the latest Firefox on Suse"
heroImage: '/blog-placeholder-5.jpg'
tags: ["SUSE", "Linux"]
---

## Contents

## Update

Update the current system.

`$ sudo zypper refresh`

```shell
Repository 'MEGAsync' is up to date.
Repository 'Packman Repository' is up to date.
Repository 'openSUSE-Leap-15.1-1' is up to date.
Repository 'Online updates for openSUSE Leap:15.1 (standard)' is up to date.
Repository 'Non-OSS Repository' is up to date.
Repository 'Main Repository' is up to date.
Repository 'Main Update Repository' is up to date.
Repository 'Update Repository (Non-Oss)' is up to date.
Repository 'snappy' is up to date.
Repository 'Sublime Text - x86_64 - Stable' is up to date.
All repositories have been refreshed.
```

`$ sudo zypper update`

```shell
Loading repository data...
Reading installed packages...
Nothing to do.
```

## Repo

Add the new repository.

`$ sudo zypper addrepo http://widehat.opensuse.org/repositories/mozilla/openSUSE_Leap_15.1/ mozilla`

## Recommends

Install new recommended packages (*install-new-recommends*).

`$ sudo zypper inr`

```shell
Loading repository data...
Reading installed packages...
Resolving package dependencies...
The following 5 NEW packages are going to be installed:
  MozillaFirefox-translations-common inxi perl-Cpanel-JSON-XS perl-XML-Dumper sensors
Checking for file conflicts: .........................................................................................[done]
(1/5) Installing: perl-Cpanel-JSON-XS-4.02-lp151.2.3.x86_64 ..........................................................[done]
(2/5) Installing: perl-XML-Dumper-0.81-lp151.2.1.x86_64 ..............................................................[done]
(3/5) Installing: MozillaFirefox-translations-common-68.8.0-lp151.2.45.1.x86_64 ......................................[done]
(4/5) Installing: sensors-3.5.0-lp151.4.3.1.x86_64 ...................................................................[done]
(5/5) Installing: inxi-3.1.00-lp151.3.6.1.noarch .....................................................................[done]
```

## Allow Vendor Change

Allow installs to change the locked-in vendor.

`$ sudo zypper dup --allow-vendor-change`

```shell
Loading repository data...
Reading installed packages...
Warning: You are about to do a distribution upgrade with all enabled repositories. Make sure these repositories are compatible before you continue. See 'man zypper' for more information about this command.
Computing distribution upgrade...

The following 10 packages are going to be upgraded:
  MozillaThunderbird kmozillahelper libfreebl3 libfreebl3-hmac libsoftokn3 libsoftokn3-hmac mozilla-nspr mozilla-nss
  mozilla-nss-certs youtube-dl-bash-completion

The following 10 packages are going to be downgraded:
  ffmpeg-3 libavcodec57 libavdevice57 libavfilter6 libavformat57 libavresample3 libavutil55 libpostproc54 libswresample2
  libswscale4

The following 10 packages are going to change vendor:
  MozillaThunderbird          openSUSE -> obs://build.opensuse.org/mozilla
  kmozillahelper              openSUSE -> obs://build.opensuse.org/mozilla
  libfreebl3                  openSUSE -> obs://build.opensuse.org/mozilla
  libfreebl3-hmac             openSUSE -> obs://build.opensuse.org/mozilla
  libsoftokn3                 openSUSE -> obs://build.opensuse.org/mozilla
  libsoftokn3-hmac            openSUSE -> obs://build.opensuse.org/mozilla
  mozilla-nspr                openSUSE -> obs://build.opensuse.org/mozilla
  mozilla-nss                 openSUSE -> obs://build.opensuse.org/mozilla
  mozilla-nss-certs           openSUSE -> obs://build.opensuse.org/mozilla
  youtube-dl-bash-completion  openSUSE -> http://packman.links2linux.de

10 packages to upgrade, 10 to downgrade, 10  to change vendor.
Overall download size: 57.8 MiB. Already cached: 0 B. After the operation, additional 176.2 KiB will be used.
Continue? [y/n/v/...? shows all options] (y):

Checking for file conflicts: .........................................................................................[done]
( 1/20) Installing: youtube-dl-bash-completion-2020.05.29-pm151.1.1.noarch ...........................................[done]
( 2/20) Installing: libavutil55-3.4.5-pm151.4.5.x86_64 ...............................................................[done]
( 3/20) Installing: libswscale4-3.4.5-pm151.4.5.x86_64 ...............................................................[done]
( 4/20) Installing: libswresample2-3.4.5-pm151.4.5.x86_64 ............................................................[done]
( 5/20) Installing: libpostproc54-3.4.5-pm151.4.5.x86_64 .............................................................[done]
( 6/20) Installing: libavresample3-3.4.5-pm151.4.5.x86_64 ............................................................[done]
( 7/20) Installing: libavcodec57-3.4.5-pm151.4.5.x86_64 ..............................................................[done]
( 8/20) Installing: libavformat57-3.4.5-pm151.4.5.x86_64 .............................................................[done]
( 9/20) Installing: libavfilter6-3.4.5-pm151.4.5.x86_64 ..............................................................[done]
(10/20) Installing: libavdevice57-3.4.5-pm151.4.5.x86_64 .............................................................[done]
(11/20) Installing: ffmpeg-3-3.4.5-pm151.4.5.x86_64 ..................................................................[done]
(12/20) Installing: libfreebl3-3.52.1-lp151.1.1.x86_64 ...............................................................[done]
(13/20) Installing: mozilla-nspr-4.25-lp151.1.1.x86_64 ...............................................................[done]
(14/20) Installing: libfreebl3-hmac-3.52.1-lp151.1.1.x86_64 ..........................................................[done]
(15/20) Installing: mozilla-nss-certs-3.52.1-lp151.1.1.x86_64 ........................................................[done]
(16/20) Installing: libsoftokn3-3.52.1-lp151.1.1.x86_64 ..............................................................[done]
(17/20) Installing: mozilla-nss-3.52.1-lp151.1.1.x86_64 ..............................................................[done]
(18/20) Installing: libsoftokn3-hmac-3.52.1-lp151.1.1.x86_64 .........................................................[done]
(19/20) Installing: MozillaThunderbird-68.8.1-lp151.1.1.x86_64 .......................................................[done]
(20/20) Installing: kmozillahelper-5.0.5-lp151.12.1.x86_64 ...........................................................[done]
```

## Install Firefox

`$ zypper install MozillaFirefox`

Taken from [addictivetips.com].


[addictivetips.com]: https://www.addictivetips.com/ubuntu-linux-tips/install-firefox-release-version-on-opensuse-leap/
