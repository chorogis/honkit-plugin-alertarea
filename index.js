"use strict";

module.exports = {
  website: {
    assets: './assets',
    css: ['style.css']
  },
  hooks: {
    'page:before': async function (page) {
      const alertPat = /^(\s*):::(?<cls>info|success|warning|danger)[\r\n](?<content>(.*[\r\n]+)+?)?(\s*):::$/im
      let match
      while ((match = alertPat.exec(page.content))) {
        const raw = match[0]
        const cls = match.groups.cls
        const content = match.groups.content.trim().replace(/\n/g, "<br />")
        const results = `<div class="alert alert-${cls} part"><p>${content}</p></div>`
        page.content = page.content.replace(raw, results)
      }
      return page;
    }
  }
}