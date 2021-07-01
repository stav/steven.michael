---
title: What to do after installing openSUSE Leap 15.1
date: "2020-02-08T00:00:00Z"
draft: false
featured: false

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: 'Image credit: [**suse.com**](https://www.suse.com/assets/img/social-platforms-suse-logo.png)'
  focal_point: ""
  placement: 2
  preview_only: false

tags:
- Suse
- Linux
---

> _This guide serves as a reminder for me when I go to install [SUSE] again.
I am not going to show how to install it, that is available all over the net.
What I will describe is what I did after install to get my workstation back up
and running with what I need to do JavaScript and Python development._

My system {{< fontawesome suse >}}
: Asus x86_64 Grub2 Kernel 4.12 openSUSE Leap 15.1 KDE 5.55 Plasma 5.12

{{% toc %}}

## Pre-Install

Note: You are going to have to backup your current files to another partition
like I did or you could use an external drive or USB stick.  I keep my console
files in a GitHub repo, see [Bash](#bash) below.

The main things I backed up were:

* `~/bin/`
* `~/.config/sublime-text-3/Packages/User/`
* `~/.hgrc`
* `~/.s3cfg`
* `~/.gitconfig`
* `~/.scrapinghub.yml`

## Install

    enable sshd
    open ssh port

## Post-Install

Here is my list of things I had to do to after the install to get up and
running with a fresh SUSE.

    $ cat /etc/os-release
    PRETTY_NAME="openSUSE Leap 15.1"

### Update

First update SUSE with any recent security fixes

    $ sudo zypper refresh
    $ sudo zypper update

### Hostname

    $ sudo vim /etc/hostname
    varan

    $ sudo vim /etc/hosts
    127.0.0.1       localhost
    127.0.0.1       varan
    104.237.140.142 cowboy

### {{< fontawesome terminal >}} Konsole

*do not show menu by default*

### {{< fontawesome hashtag >}}! Scripts

Restore `~/bin/`

### {{< fontawesome chart-area >}} System Monitor

Came pre-installed with KDE System Monitor (ksysguard 5.12.8)

### {{< fontawesome firefox-browser >}} Firefox

Use dark theme

    about:addons -> Themes

Update search engine to Duck Duck Go:

    about:preferences#search -> Default Search Engine

Do not warn when closing multiple tabs:

    about:config

    Search: "browser.tabs.warn"

        browser.tabs.warnOnClose `false`
        browser.tabs.warnOnCloseOtherTabs `false`

### {{< fontawesome key >}} Keys

Install ssh keys

#### Generate

https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

    $ ssh-keygen -t rsa -b 4096 -C "stav@varan"
    $ eval "$(ssh-agent -s)"
    $ ssh-add ~/.ssh/id_rsa
    $ cat ~/.ssh/id_rsa.pub | ssh stav@cowboy 'cat >> ~/.ssh/authorized_keys'

Manually copy contents of `~/.ssh/id_rsa.pub` to GitHub & Bitbucket.

#### GitHub {{< fontawesome github-alt >}}

* https://github.com/settings/keys
* https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account

#### BitBucket {{< fontawesome bitbucket >}}

* https://bitbucket.org/account/user/stav/ssh-keys/

#### Cowboy {{< fontawesome hat-cowboy-side >}}

Authorize user in VPN:

    $ cat ~/.ssh/id_rsa.pub | ssh stav@cowboy 'cat >> ~/.ssh/authorized_keys'

Setup git repos:

    $ /srv/git/almeroth.git$ git init --bare

### {{< fontawesome sitemap >}} Hugo

It's good to update this document as I'm installing.

#### Clone Repository

    $ git clone git@github.com:stav/steven.michael.git ~/Public
    $ git submodule update --init --recursive

#### Instal Hugo Extended Version

The Academic theme needs the *extended version*.

If you run Hugo but get an error like this:

    $ hugo
    Building sites ERROR: failed to transform resource:
    TOCSS: failed to transform "main_parsed.scss" (text/x-scss):
    this feature is not available in your current Hugo version,
    see https://goo.gl/YMrWcn

then you need the extended version.

Download and extract the [Hugo extended version],
see Assets (`hugo_extended_0.64.0_Linux-64bit.tar.gz`).

    $ sudo cp /home/stav/Downloads/hugo /usr/local/bin

### {{< fontawesome edit >}} Sublime Text

[Sublime Text] is an excellent editor.

#### Install

    $ sudo rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg
    $ sudo zypper addrepo -g -f https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo
    $ sudo zypper update
    $ sudo zypper install sublime-text

#### License

Add under help menu.

    ----- BEGIN LICENSE -----
    Steven Almeroth
    Single User License
    EA7E-... 104B
    ------ END LICENSE ------

#### Package Control

You want Package Control from wbond.

##### Install Package Control

Command Pallate (``shft-ctrl-p``) -> Install Package Control

#### Install packages

Restore the following file from your backup and Package Control will
automatically install all missing packages:

* `~/.config/sublime-text-3/Packages/User/Package Control.sublime-settings`

        "installed_packages":
        [
            "Anaconda",
            "GitGutter",
            "Hugofy",
            "INI",
            "Package Control",
            "Pretty JSON",
            "Python Pretty Print",
            "Theme - SoDaReloaded",
            "TrailingSpaces",
            "Vue Syntax Highlight"
        ]

Then restart SublimeText.

#### Copy Files

Copy remaining backup files to `~/.config/sublime-text-3/Packages/User/`

Do not copy these:

* `User/Package Control.cache/`
* `User/Package Control.last-run`
* `User/Package Control.merged-ca-bundle`
* `User/Package Control.user-ca-bundle`

### {{< fontawesome code-branch >}} Sublime Merge

I also now use [Sublime Merge] from the same people.

#### Install

    $ sudo rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg
    $ sudo zypper addrepo -g -f https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo
    $ sudo zypper install sublime-merge

### {{< fontawesome code >}} Development

    sudo zypper in git-core meld
    sudo ln -s /usr/bin/python3 /usr/bin/python

### {{< fontawesome file-video >}} Codecs

    sudo zypper addrepo -f http://packman.inode.at/suse/openSUSE_Leap_15.1/ packman
    sudo zypper addrepo -f http://opensuse-guide.org/repo/openSUSE_Leap_15.1/ dvd
    sudo zypper install --allow-vendor-change ffmpeg lame gstreamer-plugins-bad gstreamer-plugins-ugly gstreamer-plugins-ugly-orig-addon gstreamer-plugins-libav libavdevice56 libavdevice58 libdvdcss2 vlc-codecs
    sudo zypper dup --allow-vendor-change --from http://packman.inode.at/suse/openSUSE_Leap_15.1/

### {{< fontawesome terminal >}} Bash

    $ git clone git@github.com:stav/dotbash.git ~/.bash

#### Install bash_it

    $ git clone --depth=1 https://github.com/Bash-it/bash-it.git ~/.bash_it
    $ ~/.bash_it/install.sh  # keep existing `.bashrc` and append templates (y)

##### Install Powerline theme

https://github.com/Bash-it/bash-it/tree/master/themes/powerline

    $ mkdir ~/Public/powerline
    $ cd ~/Public/powerline
    $ git clone --depth=1 https://github.com/powerline/fonts.git
    $ ./fonts/install.sh
    $ wget https://github.com/powerline/powerline/raw/develop/font/PowerlineSymbols.otf
    $ wget https://github.com/powerline/powerline/raw/develop/font/10-powerline-symbols.conf
    $ mv PowerlineSymbols.otf ~/.local/share/fonts/
    $ fc-cache -vf ~/.local/share/fonts/
    $ mkdir -p ~/.config/fontconfig/conf.d/
    $ mv 10-powerline-symbols.conf ~/.config/fontconfig/conf.d/

Close all Terminal instances

#### Copy files

    .bash_projects
    .bash-it.bash
    .bashrc

#### Link files for editor reference

    stav@thelatae:~$ ll .bash_links/
    .bash-it.bash -> /home/stav/.bash-it.bash
    .bash_projects -> /home/stav/.bash_projects
    .bashrc -> /home/stav/.bashrc

### {{< fontawesome star >}} Snap

    $ sudo zypper addrepo --refresh https://download.opensuse.org/repositories/system:/snappy/openSUSE_Leap_15.0 snappy
    $ sudo zypper --gpg-auto-import-keys refresh
    $ sudo zypper dup --from snappy
    $ sudo zypper install snapd
    $ sudo systemctl enable snapd
    $ sudo systemctl start snapd
    $ sudo snap install snap-store

### {{< fontawesome play-circle >}} Applications

    $ sudo zypper install gimp mpv
    $ sudo snap install brave bluemail telegram-desktop

### {{< fontawesome node-js >}} Node

We don't install from vendor packages because they are only on version 10 and we want 12.

#### Install `nvm` {{< fontawesome window-restore >}}

    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash

Now use `nvm` to install node:

    $ nvm ls-remote |grep Latest
         v4.9.1   (Latest LTS: Argon)
        v6.17.1   (Latest LTS: Boron)
        v8.17.0   (Latest LTS: Carbon)
       v10.19.0   (Latest LTS: Dubnium)
       v12.15.0   (Latest LTS: Erbium)

    $ nvm install 12.15.0
    Downloading and installing node v12.15.0

    $ node -v
    v12.15.0

    $ npm version
    {
      npm: '6.13.4',
      ares: '1.15.0',
      brotli: '1.0.7',
      cldr: '35.1',
      http_parser: '2.9.3',
      icu: '64.2',
      llhttp: '2.0.4',
      modules: '72',
      napi: '5',
      nghttp2: '1.40.0',
      node: '12.15.0',
      openssl: '1.1.1d',
      tz: '2019c',
      unicode: '12.1',
      uv: '1.33.1',
      v8: '7.7.299.13-node.16',
      zlib: '1.2.11'
    }

{{< fontawesome linux >}}

## Previous Installs

I previously installed some other stuff:

* [Ubuntu 19.10](/post/ubuntu-1910/)
* [Ubuntu 19.04](/post/ubuntu-1904/)
* [Ubuntu 18.10](/post/ubuntu-1810/)
* [Ubuntu 17.10](/post/ubuntu-1710/)
* [Ubuntu 17.04](/post/ubuntu-1704/)
* [Ubuntu 16.04](/post/ubuntu-1604/)


[SUSE]:                  https://www.suse.com/products/desktop/
[Sublime Text]:          https://www.sublimetext.com/
[Sublime Merge]:         https://www.sublimemerge.com/docs/linux_repositories#zypper
[Hugo extended version]: https://github.com/gohugoio/hugo/releases
