---
title: "Unix"
pubDate: "2018-02-05"
description: "Simple commands that I don't use often enough to remember them"
heroImage: '/blog-placeholder-5.jpg'
---

## Contents

## Listeners

#### `netstat` - Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships

```shell
$ netstat -tunlp
Proto  Local         Foreign    State   PID/Program name
tcp    0.0.0.0:80    0.0.0.0:*  LISTEN  8731/nginx: master
tcp    0.0.0.0:21    0.0.0.0:*  LISTEN  5752/sshd
tcp    0.0.0.0:443   0.0.0.0:*  LISTEN  8731/nginx: master
tcp6   :::80         :::*       LISTEN  8731/nginx: master
tcp6   :::21         :::*       LISTEN  5752/sshd
tcp6   :::443        :::*       LISTEN  8731/nginx: master

$ netstat -tulp
Proto  Local Address Foreign    State   PID/Program name
tcp    0.0.0.0:http  0.0.0.0:*  LISTEN  8731/nginx: master
tcp    0.0.0.0:ssh   0.0.0.0:*  LISTEN  5752/sshd
tcp    0.0.0.0:https 0.0.0.0:*  LISTEN  8731/nginx: master
tcp6   [::]:http     [::]:*     LISTEN  8731/nginx: master
tcp6   [::]:ssh      [::]:*     LISTEN  5752/sshd
tcp6   [::]:https    [::]:*     LISTEN  8731/nginx: master
```

#### `ss` - another utility to investigate sockets

```shell
$ ss -atpu
Netid State  Local Address:Port  Peer Address:Port
tcp   LISTEN       0.0.0.0:http       0.0.0.0:*      (("nginx",pid=26743,fd=15),("nginx",pid=26626,fd=15))
tcp   ESTAB    237.140.142:ssh  112.85.42.188:31809  (("sshd",pid=4159,fd=3),("sshd",pid=4158,fd=3))
tcp   ESTAB    237.140.142:ssh   75.39.85.160:41431  (("sshd",pid=4133,fd=3),("sshd",pid=4127,fd=3))
tcp   LISTEN          [::]:http          [::]:*      (("nginx",pid=26743,fd=16),("nginx",pid=26626,fd=16))
tcp   LISTEN          [::]:ssh           [::]:*      (("sshd",pid=622,fd=4))
```

#### `file` - determine file type

```shell
$ file ~/Pictures/the-national-plan.jpg
JPEG image data, JFIF standard 1.01, resolution (DPI),
density 72x72, segment length 16, comment: "Created with GIMP",
progressive, precision 8, 994x797, frames 3
```

## IP

### Get your outside IP number

```shell
$ wget http://ipecho.net/plain -O - -q ; echo
75.39.85.160

$ curl ipecho.net/plain; echo
75.39.85.160

$ curl ifconfig.me
75.39.85.160

$ curl icanhazip.com
2600:1700:c010:c40::44

$ nslookup varan
Server:         192.168.1.254
Address:        192.168.1.254#53

Name:   varan.attlocal.net
Address: 192.168.1.138
Name:   varan.attlocal.net
Address: 2600:1700:c010:c40:5e76:d88f:16d3:d8a4
Name:   varan.attlocal.net
Address: 2600:1700:c010:c40:a151:413a:de1e:f6a8
Name:   varan.attlocal.net
Address: 2600:1700:c010:c40::44
Name:   varan.attlocal.net
Address: 2600:1700:c010:c40:d943:2bf6:2800:4ddf
Name:   varan.attlocal.net
Address: fe80::167c:2090:9293:38c7

$ host varan
varan.attlocal.net has address 192.168.1.138
varan.attlocal.net has IPv6 address 2600:1700:c010:c40:a151:413a:de1e:f6a8
varan.attlocal.net has IPv6 address 2600:1700:c010:c40::44
varan.attlocal.net has IPv6 address 2600:1700:c010:c40:d943:2bf6:2800:4ddf
varan.attlocal.net has IPv6 address fe80::167c:2090:9293:c783
varan.attlocal.net has IPv6 address 2600:1700:c010:c40:5e76:d88f:16d3:d8a4
```

## Linode Shell

#### Lish

	$ ssh -t stav@lish-dallas.linode.com COWBOY
	(exit to the Lish prompt by pressing ctrl+a then d)

## Hardening

* https://www.linode.com/docs/security/securing-your-server
* https://www.linode.com/docs/security/firewalls/configure-firewall-with-ufw
* https://www.linode.com/docs/security/firewalls/control-network-traffic-with-iptables

#### `last` - show a listing of last logged in users

```shell
$ last
stav     pts/0        75.39.85.160     Wed May 20 11:58   still logged in
stav     pts/2        75.39.85.160     Wed Mar  4 23:07   still logged in
stav     pts/1        75.39.85.160     Tue May 19 21:13 - 22:49  (01:36)
stav     pts/0        75.39.85.160     Tue May 19 19:29 - 22:49  (03:20)
stav     pts/0        75.39.85.160     Tue May 19 19:11 - 19:29  (00:17)

$ sudo lastb
change   ssh:notty    125.142.63.88    Sun Mar  1 00:00 - 00:00  (00:00)
root     ssh:notty    218.92.0.189     Sun Mar  1 00:00 - 00:00  (00:00)
rstudio1 ssh:notty    92.185.167.201   Sun Mar  1 00:00 - 00:00  (00:00)
```

#### `fail2ban` - read password failure reports and ban the corresponding IP addresses using firewall rules

```shell
$ cat /etc/fail2ban/jail.local
[sshd]
enabled  = true
port     = ssh
filter   = sshd
logpath  = /var/log/auth.log

$ sudo fail2ban-client status
Status
|- Number of jail:      1
`- Jail list:   sshd

$ sudo fail2ban-client status sshd
Status for the jail: sshd
|- Filter
|  |- Currently failed: 0
|  |- Total failed:     0
|  `- File list:        /var/log/auth.log
`- Actions
   |- Currently banned: 0
   |- Total banned:     0
   `- Banned IP list:

$ # sudo fail2ban-client reload sshd
```
