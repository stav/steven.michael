---
# An instance of the Contact widget.
widget: contact

# This file represents a page section.
headless: true

# Order that this section appears on the page.
weight: 130

title: Contact
subtitle:

content:
  # Automatically link email and phone or display as text?
  autolink: true

  # Email form provider
  form:
    provider: formspree
    formspree:
      id: mayadeod
    netlify:
      # Enable CAPTCHA challenge to reduce spam?
      captcha: false

  # Contact details (edit or remove options as required)
  email: steven.almeroth@gmail.com
  phone: +1 216 666 0300
  address:
    street: 7387 Pine Ridge Ct
    city: Cleveland
    region: Ohio
    postcode: '44130'
    country: United States
    country_code: US
  coordinates:
    latitude: '41.36'
    longitude: '-81.81'
  directions: I-71 to Bagley Rd exit or Pearl Rd exit
  office_hours:
    - 'Monday 10:00 to 13:00'
    - 'Wednesday 09:00 to 10:00'
  appointment_url: 
  contact_links:
    - icon: twitter
      icon_pack: fab
      name: DM Me
      link: 'https://twitter.com/AlmerothSteven'
    - icon: skype
      icon_pack: fab
      name: Skype Me
      link: 'skype:hunterchief?call'
    - icon: telegram
      icon_pack: fab
      name: Telegram
      link: 'https://t.me/stavrosian'
    - icon: comments
      icon_pack: fas
      name: Discuss on Forum
      link: 'https://discourse.gohugo.io'

design:
  columns: '2'
---
