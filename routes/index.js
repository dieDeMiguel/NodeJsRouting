// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router();

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */

	const profiles = {

		emusk: {
			username: 'emusk',
			image: '/images/elonmusk.jpeg',
			name: 'Elon Musk',
			company: 'Tesla',
			languages: ['HTML', 'CSS', 'JavaScript', 'MySql']
		},

		diego: {
			username: 'diego',
			image: '/images/diego.jpeg',
			name: 'Diego de Miguel',
			company: 'self',
			languages: ['HTML', 'CSS', 'JavaScript', 'MySql']
		},
		sjobs: {
			username: 'sjobs',
			image: '/images/stevejobs.jpeg',
			name: 'Steve Jobs',
			company: 'Apple',
			languages: ['objective-c', 'swift', 'c++']
		},
		bgates: {
			username: 'bgates',
			image: '/images/billgates.jpeg',
			name: 'Bill Gates',
			company: 'Microsoft',
			languages: ['c', 'c++', 'c++']
		}
	};

	router.get('/', (req, res) => {
	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
});

/* router.get('/:path', (req, res) => {
	const path = req.params.path;
	res.json({
		data: path
	});
}); */

router.post('/addprofile', (req, res) => {
	const body = req.body;
	//Aqui voy a convetir la info de languages es un array, al reasignar a body[languages] ese array.
	body.languages = req.body.languages.split(', ');
	
	profiles[body.username] = body;
	res.redirect('/profile/' + body.username);

	/* res.json({
		confirmation: 'succes',
		data: body
	}) */
})

router.get('/:profile/:username', (req, res) => {
	//const profile = req.params.profile;
	const username = req.params.username;
	//Busco en el array de objetos 'profile' aquel objeto que  tiene como indice
	//el parametro que se agrego en el URL en la posicion de username
	const activeProfile = profiles[username];

	activeProfile.timestamp = req.timestamp;

	if(activeProfile==null) {
		res.json({
			confirmation: 'fail',
			message: 'Profile ' + username + ' doesn\'t exist'
		})
	}

	res.render('profile', activeProfile);
});


//otra froma de extraer info de la URL
router.get('/query', (req, res) => {
	const name = req.query.name;
	const ocupation = req.query.ocupation;

	const data = {
		name: name,
		ocupation: ocupation
	}

	res.render('profile', data);
});

router.get('/allprofiles', (req, res) => {
	//Con la propiedad Object.keys capturo los indices del objeto y los guardo luego en el array "list"
	const keys = Object.keys(profiles);
	var list = [];
	keys.forEach(key=> {
		list.push(profiles[key])
	});
	//Guardo la fecha actual en la variable currentTime y luego la comparto dentro del objeto data.
	//var currentTime = new Date();
	
	const data = {
		profiles: list,
		timestamp: req.timestamp
	}
	res.render('allprofiles', data);
});

module.exports = router;
