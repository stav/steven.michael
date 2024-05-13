---
title: "Node"
pubDate: "2017-06-05"
description: "Node.js commands"
heroImage: '/blog-placeholder-5.jpg'
---

## Packages

#### `ncu` - npm-check-updates dependencies to the latest versions

```shell
$ ncu
Checking site/package.json
[====================] 2/2 100%
 express      ^4.9.0  →  ^4.17.1
 nodemon      ^2.0.3  →  ^2.0.4
Run ncu -u to upgrade package.json
```

```shell
$ ncu -u
Upgrading site/package.json
[====================] 2/2 100%
 express      ^4.9.0  →  ^4.17.1
 nodemon      ^2.0.3  →  ^2.0.4
Run npm install to install new versions.
```

#### `yarn` - package manager

How to update `package.json` after yarn updates:

```shell
$ yarn upgrade --latest
$ npm install
```
