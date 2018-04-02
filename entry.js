$(document).ready(function() {
    let portfolio = [
        ["USD", 336325.59],
        ["EUR", 382944.79],
        ["BTC", 464.64],
        ["ETH", 16313.13],
        ["XRP", 4260969.37],
        ["LTC", 411.20],
        ["DASH", 195.81],
        ["BCH", 432.13],
        ["ZEC", 321.02],
        ["XMR", 339.99],
        ["EOS", 11999.36],
        ["BTG", 599.99]
    ]
    let day = "31th march 18"
    let next = "2nd april 18"

    let ethdiv 
    $.getJSON('https://api.coinmarketcap.com/v1/ticker/?convert=EUR', function(data) {

        let btcdata = data.find(itm => itm.symbol == "BTC")
        portfolio[0].push(portfolio[0][1])
        portfolio[1].push(portfolio[1][1] * btcdata.price_usd / btcdata.price_eur)

        ethdiv = parseFloat(data.find(itm => itm.symbol == "ETH").price_btc)

        data.map(itm => {
            let key = portfolio.findIndex(each => each[0] == itm.symbol)
            if (key > -1) {
                portfolio[key].push(parseFloat(itm.price_usd) * portfolio[key][1])
            }
        })

        console.log(portfolio)


        let usdval = portfolio.reduce((sum, itm) => sum + itm[2], 0)
        $("#usd").html(usdval)
        $("#pusd").html(usdval / 100000000)
        $("#pbtc").html(usdval / 100000000 / btcdata.price_usd)
        $("#peth").html(usdval / 100000000 / btcdata.price_usd / ethdiv)
    });

    $.getJSON('https://api.coinmarketcap.com/v1/ticker/rialto/', function(xrldata) {
        $("#musd").html(xrldata[0].price_usd);
        $("#mbtc").html(xrldata[0].price_btc)
        $("#meth").html(xrldata[0].price_btc / ethdiv)
    })
})