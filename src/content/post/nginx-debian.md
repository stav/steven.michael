---
pubDate: 2020-10-09
title: "How to Set Response Headers in Nginx on Debian"
description: "Using the Nginx `add_header` directive can lead to duplicate header entries. Here's how to fix it."
heroImage: '/blog-placeholder-5.jpg'
tags: ["Debian", "Linux", "Nginx"]
---

## Contents

## Add Header

Consider the following configuration file:

```nginx
server {
    ...
    location = /ok {
        add_header Content-Type application/json;
        return 200 '{"result":"ok"}';
    }
}
```

For me this resulted in the following response:

```shell
$ curl -iI https://api.primesite.dev/ok
HTTP/1.1 200 OK
Date: Sat, 10 Oct 2020 03:40:20 GMT
Content-Type: application/octet-stream
Content-Type: application/json
Content-Length: 15
```

Notice the duplicate `Content-Type` headers above.  The first one with the value
of "application/octet-stream" comes from my main `nginx.conf` file:

    default_type application/octet-stream;

But why are those headers duplicated? That's a problem and especially confusing
since the [documentation] says headers are inherited from other levels only if the
current level (location in my case) does not contain the directive, which it does!

> There could be several add_header directives. These directives are inherited
> from the previous configuration level if and only if there are no add_header
> directives defined on the current level.

## Headers More

There is a module called [ngx_headers_more] that can be easily installed to help untangle the mess that
Nginx headers can become.

My system is Debian 10:

```shell
$ cat /etc/os-release |grep PRETTY
PRETTY_NAME="Debian GNU/Linux 10 (buster)"
```

Here's what I did to install it:

```shell
$ sudo apt-get install libnginx-mod-http-headers-more-filter
```

And that added the file:

    /etc/nginx/modules-enabled/50-mod-http-headers-more-filter.conf

which is already in an included folder from `nginx.conf`:

    include /etc/nginx/modules-enabled/*.conf;

## Virtual Host

So all I had to do in my site config was to add the custom headers directive
and reload the server config:

```nginx
server {
    ...
    location = /ok {
        more_set_headers 'Content-Type: application/json';
        return 200 '{"result":"ok"}';
    }
}
```

```shell
$ sudo systemctl reload nginx.service
```

Now it works fine, no more dupes:

```shell
$ curl -iI https://api.primesite.dev/ok
HTTP/1.1 200 OK
Date: Sat, 10 Oct 2020 04:16:20 GMT
Content-Type: application/json
Content-Length: 15
```








[documentation]: http://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header
[ngx_headers_more]: https://www.nginx.com/products/nginx/modules/headers-more/
