const xml2js = require("xml2js");
const { Z_FILTERED } = require("zlib");
const fs = require("fs")
const fsp= require("fs/promises")

const parseString = xml2js.parseString;

fs.readFile("feed.xml", "utf-8", function(err, data) {
	if (err) {
        console.log(err);
    }

	parseString(data, function(err, result) {
		if (err) console.log(err);

		var json = result;
		var newJson = json;

		let modificar = [{
				id: "198345",
				nome: "Calça legging simples",
				imageIsCorrect: "",
                index: ""
			},
			{
				id: "234123",
				nome: "Óculos de sol - Unissex",
				imageIsCorrect: "",
                index: ""
			},
			{
				id: "564363",
				nome: "",
				imageIsCorrect: "",
                index: ""
			},
			{
				id: "939134",
				nome: "",
				imageIsCorrect: "",
                index: ""
			}
		]

		let productLink = newJson?.produtos?.item

		for (let i = 0; i < productLink.length; i++) {
			for (let j = 0; j < modificar.length; j++) {
				if (productLink[i].id == modificar[j].id) {
                    modificar[j].index = i
					if (modificar[j].nome != "") {
						productLink[i].nome = modificar[j].nome;
					}

					if (productLink[i].image_link[0].includes('.jpg')) {
						modificar[j].imageIsCorrect = true
					} else {
						modificar[j].imageIsCorrect = false
					}
				}
			}
		}

		for (let i = 0; i < productLink.length; i++) {
			if (productLink[i]?._ != undefined) {
				let linkChunk = productLink[i]._.replace(/(\r\n|\n|\r)/gm, "").replace(',', '')
				productLink[i].image_link[0] += linkChunk
				delete productLink[i]._
			}
		}

		for (let i = 0; i < productLink.length; i++) {
			for (let j = 0; j < modificar.length; j++) {
				if (productLink[i].id == modificar[j].id) {
					if (modificar[j].imageIsCorrect == false) {
						let extension = productLink[i].image_link[0].split('.').pop()
						let newLink = productLink[i].image_link[0].replace(extension, 'jpg')

						productLink[i].image_link[0] = newLink

					}
				}
			}
		}

		var builder = new xml2js.Builder();
		var xml = builder.buildObject(newJson);

		fsp.writeFile("novo-feed.xml", xml, function(err, data) {
			if (err) {
                console.log(err);
            }
           
		}).then(()=>{
            fs.readFile("novo-feed.xml", "utf-8", function(err, data) {
                console.log(data)
            })
        })
	})
})