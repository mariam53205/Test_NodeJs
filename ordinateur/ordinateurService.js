var Ordinateur = require('./ordinateurModel')
async function list(req,res,next){
    await Ordinateur.find()
              .then((data,err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
    //res.end('Ordinateur List')
}

const create =async (req,res,next)=>{
    const { modele, categorie, dateFabrication, prix} = req.body 
    console.log(req.body.modele);
    await new Ordinateur({
        modele: modele,
        categorie: categorie,
        dateFabrication: dateFabrication,
        prix:prix
    }).save()
      .then((data, err)=>{
          if(err){
              res.status(500).json(err)
            }
            console.log(data);
      })
    
res.json('Ordinateur added ! modele : '+ modele + ' categorie : '+ categorie+ + ' dateFabrication : '+ dateFabrication+ ' prix : '+ prix )
}

const update = async (req, res, next)=>{
    await Ordinateur.findByIdAndUpdate(req.params.id, req.body)
              .then((data, err)=>{
                res.json(data)
              })
}

async function deleteO(req, res, next) {
    await Ordinateur.findByIdAndDelete(req.params.id)
              .then((data, err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
}
const searchByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    try {
        const ordinateurs = await Ordinateur.find({
            prix: { $gte: minPrice, $lte: maxPrice }
        });
        res.status(200).json(ordinateurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { create, list, update, deleteO,searchByPriceRange }