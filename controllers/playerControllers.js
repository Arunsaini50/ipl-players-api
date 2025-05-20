const Player = require("../models/playerModel");
const { playerSchema } = require("../validators/playerValidator");

exports.createPlayer = async (req, res) => {
  const { error } = playerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json({ message: "Player created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPlayers = async (req, res) => {
  try {
    const { page = 1, limit = 10, team, sortBy, search } = req.query;
    const query = {};
    if (team) query.team = team;
    if (search) query.name = { $regex: search, $options: "i" };

    let playersQuery = Player.find(query);
    if (sortBy) {
      const sort = {};
      if (sortBy === "runs" || sortBy === "salary") sort[sortBy] = -1;
      playersQuery = playersQuery.sort(sort);
    }

    const total = await Player.countDocuments(query);
    const players = await playersQuery.skip((page - 1) * limit).limit(Number(limit));

    res.json({ page: Number(page), limit: Number(limit), total, players });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPlayerDescription = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ error: "Player not found" });

    const { name, team, country, runs, image, role, salary } = player;
    res.json({ name, team, country, runs, image, role, salary });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updatePlayer = async (req, res) => {
  const { error } = playerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!player) return res.status(404).json({ error: "Player not found" });

    res.json({ message: "Player updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ error: "Player not found" });
    res.json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};