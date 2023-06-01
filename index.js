const PORT = process.env.PORT || 8000
const axios = require('axios')
const cheerio = require('cheerio')
const { attr } = require('cheerio/lib/api/attributes')
const { first, end, last } = require('cheerio/lib/api/traversing')
const { find } = require('domutils')
const { response } = require('express')
const express = require('express')

const app = express()

// const US_Giveaways = [
//     {
//         name: 'Single-Entry-Sweeps',
//         link: 'https://www.contestgirl.com/contests/contests.pl?f=s&c=us&b=nb&sort=p&ar=na&s=_',
//         link2: 'https://www.contestgirl.com/contests/contests.pl?f=s&c=us&i=10&b=nb&sort=p&ar=na&s=_',
//         base: 'https://www.contestgirl.com',
//     },
//     {
//         name: 'Daily-Sweepstakes',
//         link: 'https://www.contestgirl.com/contests/contests.pl?f=d&c=us&b=nb&sort=p&ar=na&s=_',
//         link2: 'https://www.contestgirl.com/contests/contests.pl?f=d&c=us&i=10&b=nb&sort=p&ar=na&s=_',
//         base: 'https://www.contestgirl.com',
//     },
//     {
//         name: 'Weekly-Sweepstakes',
//         link: 'https://www.contestgirl.com/contests/contests.pl?f=w&c=us&b=nb&sort=p&ar=na&s=_',
//         link2: 'https://www.contestgirl.com/contests/contests.pl?f=w&c=us&i=10&b=nb&sort=p&ar=na&s=_',
//         base: 'https://www.contestgirl.com',
//     },
//     {
//         name: 'Monthly-Sweepstakes',
//         link: 'https://www.contestgirl.com/contests/contests.pl?f=m&c=us&b=nb&sort=p&ar=na&s=_',
//         link2: 'https://www.contestgirl.com/contests/contests.pl?f=m&c=us&i=10&b=nb&sort=p&ar=na&s=_',
//         base: 'https://www.contestgirl.com',
//     },
//     {
//         name: 'Odd-Entry-Sweeps',
//         link: 'https://www.contestgirl.com/contests/contests.pl?f=o&c=us&b=nb&sort=p&ar=na&s=_',
//         link2: 'https://www.contestgirl.com/contests/contests.pl?f=o&c=us&i=10&b=nb&sort=p&ar=na&s=_',
//         base: 'https://www.contestgirl.com',
//     },
//     {
//         name: 'Blog-Giveaways',
//         link: 'https://www.contestgirl.com/contests/contests.pl?f=sdwmo&c=us&b=b&sort=p&ar=na&s=_',
//         link2: 'https://www.contestgirl.com/contests/contests.pl?f=sdwmo&c=us&i=10&b=b&sort=p&ar=na&s=_',
//         base: 'https://www.contestgirl.com',
//     },
//     {
//         name: 'Free-Samples',
//         link: 'https://www.contestgirl.com/contests/contests.pl?f=s&c=us&b=nb&sort=p&ar=na&s=_',
//         link2: 'https://www.contestgirl.com/contests/contests.pl?f=f&c=us&i=12&ar=na&s=_',
//         base: 'https://www.contestgirl.com',
//     }
// ]

const articles = []



    axios.get('https://www.gog.com/partner/free_games')
    // axios.get(giveaway.link2)
    .then(response =>{
        const html = response.data
        const chtml = cheerio.load(html)
        console.log(chtml)

        chtml('.padded', html).each(function() {
        const title = chtml(this).find('a').first().text()
        const link = chtml(this).find('a').attr('href')
        const disc = chtml(this).find('div[style="margin-top:6px;margin-bottom:4px;font-size:15px;"]').text()
        const enddate = chtml(this).find('table[width="100%"]').find('td:eq(0)').text().replace('Featured Sweepstakes', '')
        const feature = chtml(this).find('tbody').find('center').text()
        const restrictions = chtml(this).find('div').find('td[align="left"]').first().text()
        // const $ = chtml(this).find('div.style').text()
        console.log(chtml)
        articles.push({
            feature,
            title,
            disc,
            restrictions,
            enddate,
            link: giveaway.base + link,
            source: giveaway.name
            

        })
    })
    })

    app.get('/', (req,res) => {
        res.json(articles)
    })




app.listen(PORT)