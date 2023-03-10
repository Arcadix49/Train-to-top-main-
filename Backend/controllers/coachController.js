import Team from '../models/teamsModel.js';


export const createTeam = async (req, res) => {
  const { name, description, code } = req.body;

    const newTeam = new Team({
        name,
        code,
        description,
        coach:req.userID,
    });

  try {
    await newTeam.save();

    res.status(201).json(newTeam);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const deleteTeam = (req, res) => {
    Team.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    
}

export const updateTeam = (req, res) => {
      Team.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
      
}

export const getTeam = (req, res) => {
  Team.findById(req.params.id)
    .then(Team => {
      if (!Team) {
        return res.status(404).json({ error: 'Équipe non trouvée' });
      }
      res.status(200).json({ Team });
    })
    .catch(error => res.status(500).json({ error }));
    
};