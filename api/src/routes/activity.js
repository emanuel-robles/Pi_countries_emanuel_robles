const {Router} = require("express");
const {Country,Activity,cache} = require("../db");
const { getAllCountries}= require("./country");

const router = Router();


router.get('/', async (req, res, next) => {
    try{
        const activtividades = await Activity.findAll();
        res.send(activtividades)
    }catch(error){
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const{name, difficulty, duration, season, countries}= req.body

    try{
        if(!name || !difficulty || !duration || !season || !countries) 
        return res.status(500).send({error: "información incorrecta"})
        if(!cache.allCountries) await getAllCountries();
      }catch(error){
          next(error)
      }

      Activity.create({name,difficulty,duration,season})
      .then(activity=> {
          countries.forEach(id => { 
              Country.findByPk(id).then(async country => {
                  await country.addActivity(activity);
              }).catch(error => {});
              const cacheCountry = cache.allCountries.find(c=> c.id === id);
              cacheCountry.dataValues.Activities.push(activity);
          });
          return res.status(201).send(activity);
      }).catch(error => {   if (error.name === 'Error De Sequelize') 
          return res.status(500).send('Actividad Repetida');
          res.status(500).send(error.message);
      });
});



module.exports = router;
