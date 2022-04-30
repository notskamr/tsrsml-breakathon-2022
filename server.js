// import os from 'os'
import express from 'express'
import * as http from 'http'

// Using 'caesar-cipher' package by '@janbican' for simplicity
import { encrypt, decrypt } from '@janbican/caesar-cipher'

// Using 'unique-names-generator' package for generation of texts
import { uniqueNamesGenerator, names, animals, colors } from 'unique-names-generator'

// Setting up last name list
const lastNames = ['Smith','Johnson','Williams','Jones','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Garcia','Martinez','Robinson','Clark','Rodriguez','Lewis','Lee','Walker','Hall','Allen','Young','Hernandez','King','Wright','Lopez','Hill','Scott','Green','Adams','Baker','Gonzalez','Nelson','Carter','Mitchell','Perez','Roberts','Turner','Phillips','Campbell','Parker','Evans','Edwards','Collins','Stewart','Sanchez','Morris','Rogers','Reed','Cook','Morgan','Bell','Murphy','Bailey','Rivera','Cooper','Richardson','Cox','Howard','Ward','Torres','Peterson','Gray','Ramirez','James','Watson','Brooks','Kelly','Sanders','Price','Bennett','Wood','Barnes','Ross','Henderson','Coleman','Jenkins','Perry','Powell','Long','Patterson','Hughes','Flores','Washington','Butler','Simmons','Foster','Gonzales','Bryant','Alexander','Russell','Griffin','Diaz','Hayes','Myers','Ford','Hamilton','Graham','Sullivan','Wallace','Woods','Cole','West','Jordan','Owens','Reynolds','Fisher','Ellis','Harrison','Gibson','McDonald','Cruz','Marshall','Ortiz','Gomez','Murray','Freeman','Wells','Webb','Simpson','Stevens','Tucker','Porter','Hunter','Hicks','Crawford','Henry','Boyd','Mason','Morales','Kennedy','Warren','Dixon','Ramos','Reyes','Burns','Gordon','Shaw','Holmes','Rice','Robertson','Hunt','Black','Daniels','Palmer','Mills','Nichols','Grant','Knight','Ferguson','Rose','Stone','Hawkins','Dunn','Perkins','Hudson','Spencer','Gardner','Stephens','Payne','Pierce','Berry','Matthews','Arnold','Wagner','Willis','Ray','Watkins','Olson','Carroll','Duncan','Snyder','Hart','Cunningham','Bradley','Lane','Andrews','Ruiz','Harper','Fox','Riley','Armstrong','Carpenter','Weaver','Greene','Lawrence','Elliott','Chavez','Sims','Austin','Peters','Kelley','Franklin','Lawson','Fields','Gutierrez','Ryan','Schmidt','Carr','Vasquez','Castillo','Wheeler','Chapman','Oliver','Montgomery','Richards','Williamson','Johnston','Banks','Meyer','Bishop','McCoy','Howell','Alvarez','Morrison','Hansen','Fernandez','Garza','Harvey','Little','Burton','Stanley','Nguyen','George','Jacobs','Reid','Kim','Fuller','Lynch','Dean','Gilbert','Garrett','Romero','Welch','Larson','Frazier','Burke','Hanson','Day','Mendoza','Moreno','Bowman','Medina','Fowler','Brewer','Hoffman','Carlson','Silva','Pearson','Holland','Douglas','Fleming','Jensen','Vargas','Byrd','Davidson','Hopkins','May','Terry','Herrera','Wade','Soto','Walters','Curtis','Neal','Caldwell','Lowe','Jennings','Barnett','Graves','Jimenez','Horton','Shelton','Barrett','Obrien','Castro','Sutton','Gregory','McKinney','Lucas','Miles','Craig','Rodriquez','Chambers','Holt','Lambert','Fletcher','Watts','Bates','Hale','Rhodes','Pena','Beck','Newman','Haynes','McDaniel','Mendez','Bush','Vaughn','Parks','Dawson','Santiago','Norris','Hardy','Love','Steele','Curry','Powers','Schultz','Barker','Guzman','Page','Munoz','Ball','Keller','Chandler','Weber','Leonard','Walsh','Lyons','Ramsey','Wolfe','Schneider','Mullins','Benson','Sharp','Bowen','Daniel','Barber','Cummings','Hines','Baldwin','Griffith','Valdez','Hubbard','Salazar','Reeves','Warner','Stevenson','Burgess','Santos','Tate','Cross','Garner','Mann','Mack','Moss','Thornton','Dennis','McGee','Farmer','Delgado','Aguilar','Vega','Glover','Manning','Cohen','Harmon','Rodgers','Robbins','Newton','Todd','Blair','Higgins','Ingram','Reese','Cannon','Strickland','Townsend','Potter','Goodwin','Walton','Rowe','Hampton','Ortega','Patton','Swanson','Joseph','Francis','Goodman','Maldonado','Yates','Becker','Erickson','Hodges','Rios','Conner','Adkins','Webster','Norman','Malone','Hammond','Flowers','Cobb','Moody','Quinn','Blake','Maxwell','Pope','Floyd','Osborne','Paul','McCarthy','Guerrero','Lindsey','Estrada','Sandoval','Gibbs','Tyler','Gross','Fitzgerald','Stokes','Doyle','Sherman','Saunders','Wise','Colon','Gill','Alvarado','Greer','Padilla','Simon','Waters','Nunez','Ballard','Schwartz','McBride','Houston','Christensen','Klein','Pratt','Briggs','Parsons','McLaughlin','Zimmerman','French','Buchanan','Moran','Copeland','Roy','Pittman','Brady','McCormick','Holloway','Brock','Poole','Frank','Logan','Owen','Bass','Marsh','Drake','Wong','Jefferson','Park','Morton','Abbott','Sparks','Patrick','Norton','Huff','Clayton','Massey','Lloyd','Figueroa','Carson','Bowers','Roberson','Barton','Tran','Lamb','Harrington','Casey','Boone','Cortez','Clarke','Mathis','Singleton','Wilkins','Cain','Bryan','Underwood','Hogan','McKenzie','Collier','Luna','Phelps','McGuire','Allison','Bridges','Wilkerson','Nash','Summers','Atkins','Potter','Singh','Agarwal','Jain','Ahuja','Anand','Patel']

// Setting up pet name list
const petsNames = ["Max","Buddy","Charlie","Jack","Cooper","Rocky","Toby","Tucker","Jake","Bear","Duke","Teddy","Oliver","Riley","Bailey","Bentley","Milo","Buster","Cody","Dexter","Winston","Murphy","Leo","Lucky","Oscar","Louie","Zeus","Henry","Sam","Harley","Baxter","Gus","Sammy","Jackson","Bruno","Diesel","Jax","Gizmo","Bandit","Rusty","Marley","Jasper","Brody","Roscoe","Hank","Otis","Bo","Joey","Beau","Ollie","Tank","Shadow","Peanut","Hunter","Scout","Blue","Rocco","Simba","Tyson","Ziggy","Boomer","Romeo","Apollo","Ace","Luke","Rex","Finn","Chance","Rudy","Loki","Moose","George","Samson","Coco","Benny","Thor","Rufus","Prince","Chester","Brutus","Scooter","Chico","Spike","Gunner","Sparky","Mickey","Kobe","Chase","Oreo","Frankie","Mac","Benji","Bubba","Champ","Brady","Elvis","Copper","Cash","Archie","Walter"]

// Using 'random-birthday' package to generate a random birthday
import randomBirthday from 'random-birthday'

// Ordinal generation function (for general use)
function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}

// Function to generate a 'person' with data like their name, age, birthday, favorite color and pets name (species unused)
function generatePerson() {

    const TYPES = [
        "teen",
        "adult"
    ]

    var birthday = randomBirthday({ type: TYPES[Math.floor(Math.random() * TYPES.length)]})
    
    const out = { 
        person: {
                name: [uniqueNamesGenerator({dictionaries: [names]}).replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase()), uniqueNamesGenerator({dictionaries: [lastNames]}).replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())],
                birthday: [birthday, {day: [birthday.getDay(), birthday.getDay() + nth(birthday)], month: birthday.toLocaleString('default', { month: 'long' }), year: birthday.getFullYear()}],
                color: uniqueNamesGenerator({dictionaries: [colors]}).replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
            },
        pet: {
            name: uniqueNamesGenerator({dictionaries: [petsNames]}).replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase()),
            species: uniqueNamesGenerator({dictionaries: [animals]}).replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase()),
        }
    }
    // console.log(out)
    return out
}


/*function generatePassword(person) {

    // Weights:
    // * Only 3 aspects of a person will be taken into a password

    // Name: 17
    // Birthday => Year: 14, Day: 1, Month: 2
    // Color: 7

    // Pet's Name: 4

    const personName = person['person']['name']
    const personBirthdayYear = person['person']['birthday'][1]['year'].toString().slice(-2)
    const personBirthdayDay = person['person']['birthday'][1]['day'][0].toString()
    const personBirthdayMonth = person['person']['birthday'][1]['month']
    const personFavoriteColor = person['person']['color']

    const petName = person['pet']['name']

    var weighted = []

    weighted = Array(17).fill(personName)
    weighted.push(...Array(14).fill(personBirthdayYear))
    weighted.push(...Array(1).fill(personBirthdayDay))
    weighted.push(...Array(2).fill(personBirthdayMonth))
    weighted.push(...Array(7).fill(personFavoriteColor))

    weighted.push(...Array(4).fill(petName))

    var password = ""
    var aspects = []

    var aspectsTaken = 0
    console.log(weighted)
    while (aspectsTaken <= 2) {
        let aspect = weighted[Math.floor(Math.random() * weighted.length)]
        aspects.push(aspect)
        weighted = weighted.filter( (item) => {
            return item !== aspect
        })
        aspectsTaken++
        password += aspect.toString()
    }

    console.log(aspects)
    return {password: password, aspects: aspects}
}*/

function generatePassword(person) {

    console.log(person)

    const personFirstName = person['person']['name'][0]
    const personLastName = person['person']['name'][1]
    const personBirthdayYear = person['person']['birthday'][1]['year'].toString().slice(-2)
    const personBirthdayDay = ('0' + person['person']['birthday'][1]['day'][0].toString()).slice(-2)
    const personBirthdayMonth = person['person']['birthday'][0].toLocaleDateString(`en`, {month:`2-digit`})
    const personFavoriteColor = person['person']['color']

    const petName = person['pet']['name']


    const types = 
    {
        1: {   
            password: `${personFirstName}${personLastName}${personBirthdayYear}`,
            aspects: ["person.firstName", "person.lastName", "person.birthdayYear"]
        },
        2: {
            password: `${personFirstName}${personBirthdayDay}${personBirthdayMonth}`,
            aspects: ["person.firstName", "person.birthdayDay", "person.birthdayMonth"]
        },
        3: {
            password: `${personLastName.toLowerCase()}${personFirstName.toLowerCase()}@${personBirthdayYear}`,
            aspects: ["person.lastName.lower", "person.firstName.lower", "person.birthdayYear"]
        },
        4: {
            password: `${personFavoriteColor.toLowerCase()}-${personFirstName.toLowerCase()}.${personBirthdayYear}`,
            aspects: ["person.favoriteColor", "hyphen", "name", "dot", "person.birthdayYear"]
        },
        5: {
            password: `${personFavoriteColor.toLowerCase()}-${petName.toLowerCase()}.${personBirthdayYear}`,
            aspects: ["pet.name.lower", "hyphen", "color", "dot", "person.birthdayYear"]
        },
        6: {
            password: `${personFavoriteColor}-${personFirstName}@${personBirthdayDay}${personBirthdayMonth}`,
            aspects: ["person.favoriteColor", "hyphen", "person.name", "at", "person.birthdayYear", "person.birthdayMonth"]
        }
    }

    return types[Math.floor(Math.random() * 6) + 1]
}

const app = express()
const server = http.Server(app)
const port = 3000

app.use(express.json())
app.use(express.static("public"))

app.set('view engine', 'ejs')


// blank route redirecting to 'start' of the breakathon
app.get('/', (req, res) => {
    return res.redirect("start")
})

app.get('/start', (req, res) => {
    var person = generatePerson()

    // console.log(JSON.stringify(person))
    var password = generatePassword(person)
    console.log(password)
    //console.log(password['password'])


    res.render('start', {data: null})
})




server.listen(process.env.PORT || port, () => console.log(`Listening on locahost:${port}`))
