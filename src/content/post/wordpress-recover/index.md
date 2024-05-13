---
title: How to reset Wordpress password without e-mail or phpMyAdmin
pubDate: "2023-09-13T00:00:00Z"
heroImage: '/blog-placeholder-5.jpg'
description: "I forgot my Wordpress password and I don't have SMTP services operational on my server at the moment so I had update my user password field manually. Here's how I did it."
# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: 'Image credit: [**wikipedia.org**](https://en.wikipedia.org/wiki/WordPress.com#/media/File:WordPress_blue_logo.svg)'
  focal_point: ""
  placement: 2
  preview_only: false

tags:
- Wordpress
- Password
---

My system {{< fontawesome linux >}}
: {{< fontawesome desktop-solid >}} [Lenovo Legion T5] x86_64 Grub 2 Kernel 5.13 Manjaro Qonos 21.1 KDE 5.88 Plasma 5.23

## Contents

## Hash

First I used the [Python] [REPL] to get the encrypted version of my chosen
password:


```bash
$ python
```
```python
Python 3.11.3 (main, Jun  5 2023, 09:32:32) [GCC 13.1.1 20230429] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import hashlib
>>> hashlib.md5("secret!password".encode("utf-8")).hexdigest()
'5302217ea3e30b37da361dd3f441ba2d'
```

## Database

Then next thing I did was to login to my database client and update the user
password using SQL:

```bash
$ sudo mysql -uroot -p
```
```mysql
> use mybigdatabase;
> update wp_users set user_pass="5302217ea3e30b37da361dd3f441ba2d" where id=1;
```

_Note that I already knew that my user Id was 1._

## Login

Now I can login to my account with my password:

    secret!password


[Python]:               https://www.python.org/
[REPL]:                 https://codewith.mu/en/tutorials/1.2/repl
