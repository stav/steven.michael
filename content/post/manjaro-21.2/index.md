---
title: What to do after installing Manjaro Qonos 21.2
date: "2021-12-01T00:00:00Z"
draft: false
featured: false

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: 'Image credit: [**alternative.me**](https://alternative.me/media/256/manjaro-linux-icon-kcq66qcllp5d6xqk-c.png)'
  focal_point: ""
  placement: 2
  preview_only: false

tags:
- Arch
- Linux
- Manjaro
---

> _This guide serves as a reminder for me when I go to install [Manjaro] again.
I will describe what I did after install to get my workstation back up and running 
with what I need to do JavaScript / TypeScript development._

My system {{< fontawesome linux >}}
: {{< fontawesome desktop-solid >}} [Lenovo Legion T5] x86_64 Grub 2 Kernel 5.13 Manjaro Qonos 21.1 KDE 5.88 Plasma 5.23

{{% toc %}}

## Pre-Install

Note: You are going to have to backup your current files to another partition
like I did or you could use an external drive or USB stick.  I keep my console
files in a GitHub repo, see [Bash](#bash) below.

The main things I backed up were:

* `~/.local/bin/`
* `~/.config/sublime-text/Packages/User/`
* `~/.gitconfig`

## Post-Install

Here is my list of things I did to get up and running with a fresh Manjaro.

```bash
cat /etc/lsb-release
```
    DISTRIB_ID=ManjaroLinux
    DISTRIB_RELEASE=21.2.0
    DISTRIB_CODENAME=Qonos

### Update

First update the local mirror and system packages

```bash
sudo pacman-mirrors --fasttrack
```
```bash
sudo pacman -Syu
```

### Firewall

The firewall is super easy to setup for minimal protection

```bash
sudo pacman -S --needed gufw
```

Then just run the GUI

```bash
gufw
```

### System Configuration

#### Graphics Card {{< fontawesome digital-tachograph-solid >}}

Install proprietary video drivers (Nvidia)

```bash
systemsettings5 msm_mhwd
```

#### Date and Time {{< fontawesome clock-solid >}}

Set date and time automatically

```bash
systemsettings5 clock
```

#### Package Management {{< fontawesome shipping-fast-solid >}}

```bash
sudo systemctl enable --now snapd.service
```

##### Yay

```bash
sudo pacman -S --needed yay
```
```bash
yay -Y --gendb && yay -Syu --devel
```
 
Uncomment Color option in /etc/pacman.conf

#### System Monitor {{< fontawesome chart-area >}}

```bash
sudo pacman -S --needed ksysguard
```
```bash
ksysguard --version
```
```plaintext
ksysguard 5.22.0
```

#### Reduce Swappiness {{< fontawesome retweet-solid >}}

Good if you have an SSD (hard drive)

_I have 32G memory so I need to be swapping seldomly_

```bash
sudo su
```
```bash-session
echo "vm.swappiness=10" > /etc/sysctl.d/100-manjaro.conf
```
```bash-session
exit
```

#### Setup Block Cleaning Job  {{< fontawesome th-solid >}}

Good if you have an SSD (hard drive)

```bash
systemctl list-timers -all
```
     NEXT                        LEFT          LAST                        PASSED    UNIT                         ACTIVATES                 >
     Mon 2021-11-29 18:46:32 EST 5min left     n/a                         n/a       systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.ser>
     Tue 2021-11-30 00:00:00 EST 5h 18min left Mon 2021-11-29 17:43:41 EST 57min ago logrotate.timer              logrotate.service
     Tue 2021-11-30 00:00:00 EST 5h 18min left Mon 2021-11-29 17:43:41 EST 57min ago man-db.timer                 man-db.service
     Tue 2021-11-30 00:00:00 EST 5h 18min left Mon 2021-11-29 17:43:41 EST 57min ago pkgfile-update.timer         pkgfile-update.service
     Tue 2021-11-30 00:00:00 EST 5h 18min left Mon 2021-11-29 17:43:41 EST 57min ago shadow.timer                 shadow.service
     Thu 2021-12-02 10:39:52 EST 2 days left   Mon 2021-11-29 17:43:41 EST 57min ago pamac-mirrorlist.timer       pamac-mirrorlist.service
     Sat 2021-12-04 15:00:00 EST 4 days left   Mon 2021-11-29 17:43:41 EST 57min ago pamac-cleancache.timer       pamac-cleancache.service

```bash
systemctl status fstrim.timer
```
     ○ fstrim.timer - Discard unused blocks once a week
          Loaded: loaded (/usr/lib/systemd/system/fstrim.timer; disabled; vendor preset: disabled)
          Active: inactive (dead)

```bash
sudo systemctl enable fstrim.timer
```
     Created symlink /etc/systemd/system/timers.target.wants/fstrim.timer → /usr/lib/systemd/system/fstrim.timer.

```bash
systemctl status fstrim.timer
```
     ○ fstrim.timer - Discard unused blocks once a week
          Loaded: loaded (/usr/lib/systemd/system/fstrim.timer; enabled; vendor preset: disabled)
          Active: inactive (dead)

```bash
systemctl status fstrim.timer
```
     ● fstrim.timer - Discard unused blocks once a week
          Loaded: loaded (/usr/lib/systemd/system/fstrim.timer; enabled; vendor preset: disabled)
          Active: active (waiting) since Mon 2021-11-29 18:47:13 EST; 9s ago
         Trigger: Mon 2021-12-06 01:30:45 EST; 6 days left

#### Hosts {{< fontawesome file-solid >}}

```bash
sudo hostnamectl set-hostname legion
```

```bash
sudo vim /etc/hosts
```
```plaintext
127.0.0.1       localhost
127.0.0.1       legion
104.237.140.142 cowboy
```

### {{< fontawesome hashtag >}}! Scripts

Restore `~/.local/bin/`

### {{< fontawesome firefox-browser >}} Firefox

Use dark theme

    about:addons -> Themes

Update search engine to Duck Duck Go:

    about:preferences#search -> Default Search Engine

Do not warn when closing multiple tabs:

    about:config -> Search: browser.tabs.warn

    browser.tabs.warnOnClose false
    browser.tabs.warnOnCloseOtherTabs false

Add-ons

* _Dark Reader_ by Alexander Shutau
* _Traquility Reader_ by arunk


### {{< fontawesome key >}} Keys

Install ssh keys

#### Generate {{< fontawesome plus-square-solid >}}

https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

```bash
ssh-keygen -t ed25519 -C "stav@legion"
```
```bash
eval "$(ssh-agent -s)"
```
```bash
ssh-add ~/.ssh/id_ed255192
```

#### Add to remotes

Manually copy contents of `~/.ssh/id_ed255192.pub` to GitHub & Bitbucket.

##### GitHub {{< fontawesome github-alt >}}

* https://github.com/settings/keys
* https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account

##### BitBucket {{< fontawesome bitbucket >}}

* https://bitbucket.org/account/user/stav/ssh-keys/

##### Cowboy {{< fontawesome hat-cowboy-side >}}

Enable password login on remote host

https://cloud.linode.com/linodes COWBOY LISH

    cowboy$ sed -iE 's/^PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
    cowboy$ sudo systemctl restart sshd

 Authorize key

```bash
cat ~/.ssh/id_ed25519.pub | ssh cowboy 'cat >> ~/.ssh/authorized_keys'
```

Disable password login on remote host

    cowboy$ sed -iE 's/^PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
    cowboy$ sudo systemctl restart sshd

### {{< fontawesome terminal >}} Bash

```bash
git clone git@github.com:stav/dotbash.git ~/.bash
```

#### Install bash_it

    $ git clone --depth=1 https://github.com/Bash-it/bash-it.git ~/.bash_it
    $ ~/.bash_it/install.sh  # keep existing `.bashrc` and append templates (y)

##### Install Powerline theme

https://github.com/Bash-it/bash-it/tree/master/themes/powerline

    mkdir ~/Public/powerline
    cd ~/Public/powerline
    git clone --depth=1 https://github.com/powerline/fonts.git
    ./fonts/install.sh
    wget https://github.com/powerline/powerline/raw/develop/font/PowerlineSymbols.otf
    wget https://github.com/powerline/powerline/raw/develop/font/10-powerline-symbols.conf
    mv PowerlineSymbols.otf ~/.local/share/fonts/
    fc-cache -vf ~/.local/share/fonts/
    mkdir -p ~/.config/fontconfig/conf.d/
    mv 10-powerline-symbols.conf ~/.config/fontconfig/conf.d/

Close all Terminal instances

#### Copy files

    .bash_projects
    .bash-it.bash
    .bashrc

#### Link files for editor reference

```bash
ls .bash_links/
```
    .bash_links/.bash-it.bash -> ~/.bash-it.bash
    .bash_links/.bash_projects -> ~/.bash_projects
    .bash_links/.bashrc -> ~/.bashrc

### {{< fontawesome sitemap >}} Hugo

It's good to update this document as I'm installing.

#### Clone Repository

```bash
git clone git@github.com:stav/steven.michael.git ~/Public/stav/steven.michael
```
```bash
cd ~/Public/stav/steven.michael
```
```bash
git submodule update --init --recursive
```

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

```bash
cp ~/Downloads/hugo_extended_0.89.4_Linux-64bit/hugo ~/.local/bin/
```

#### Install Golang

```bash
sudo pacman -S --needed go
```

### {{< fontawesome edit >}} Sublime

[Sublime Text] is an excellent editor and [Sublime Merge] is good enough now
that I hardly ever use the command line anymore for Git anymore.

#### Install

```bash
curl -O https://download.sublimetext.com/sublimehq-pub.gpg && sudo pacman-key --add sublimehq-pub.gpg && sudo pacman-key --lsign-key 8A8F901A && rm sublimehq-pub.gpg
```
```bash
echo -e "\n[sublime-text]\nServer = https://download.sublimetext.com/arch/stable/x86_64" | sudo tee -a /etc/pacman.conf
```
```bash
sudo pacman -Syu --needed sublime-text sublime-merge
```

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

* `~/.config/sublime-text/Packages/User/Package Control.sublime-settings`

then restart SublimeText.

#### Copy Files

Copy remaining backup files to `~/.config/sublime-text/Packages/User/`

Do not copy these:

* `User/Package Control.cache/`
* `User/Package Control.last-run`
* `User/Package Control.merged-ca-bundle`
* `User/Package Control.user-ca-bundle`

### {{< fontawesome code >}} Development

```bash
sudo pacman -S --needed base-devel git meld
```

### {{< fontawesome play-circle >}} Applications

```bash
sudo pacman -S --needed gimp mpv
```

### {{< fontawesome star >}} Productivity

```bash
sudo pacman -S --needed vim tree
```

### {{< fontawesome node-js >}} Node

We will use the Node Version Manager (`nvm`) to install specific versions as needed
so first we just install the base packages

#### Install dependencies {{< fontawesome window-restore >}}

```bash
sudo pamac install nodejs npm nvm
```

#### Use `nvm` to install `node`

I needed to run a setup script to get `nvm` to run:

```bash
source /usr/share/nvm/init-nvm.sh
```

Let's see what versions we can install:

```bash
nvm ls-remote |grep Latest
```
         v4.9.1   (Latest LTS: Argon)
        v6.17.1   (Latest LTS: Boron)
        v8.17.0   (Latest LTS: Carbon)
       v10.24.1   (Latest LTS: Dubnium)
       v12.22.7   (Latest LTS: Erbium)
       v14.18.2   (Latest LTS: Fermium)
       v16.13.1   (Latest LTS: Gallium)

```bash
nvm install 16
```
```plaintext
Now using node v16.13.1 (npm v8.1.2)
```

#### Install package managers

```bash
corepack enable
```

#### Update `yarn`

```bash
yarn set version stable
```

#### Install `pnpm`

```bash
corepack prepare pnpm@6.22.2 --activate
```

{{< fontawesome linux >}}

## Previous Installs

I previously installed some other stuff:

* [SUSE 15.1](/post/suse-15.1/)
* [Ubuntu 19.10](/post/ubuntu-1910/)
* [Ubuntu 19.04](/post/ubuntu-1904/)
* [Ubuntu 18.10](/post/ubuntu-1810/)
* [Ubuntu 17.10](/post/ubuntu-1710/)
* [Ubuntu 17.04](/post/ubuntu-1704/)
* [Ubuntu 16.04](/post/ubuntu-1604/)


[Manjaro]:               https://manjaro.org/support/firststeps/
[Sublime Text]:          https://www.sublimetext.com/
[Sublime Merge]:         https://www.sublimemerge.com/
[Hugo extended version]: https://github.com/gohugoio/hugo/releases
[Lenovo Legion T5]:      https://psref.lenovo.com/Detail/Legion/Lenovo_Legion_T5_26IOB6?M=90RS001LUS
