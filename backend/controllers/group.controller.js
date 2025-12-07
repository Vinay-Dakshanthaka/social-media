// const { Group, GroupMember, User, Album } = require("../models");

// exports.getAll = async (req, res) => {
//   const groups = await Group.findAll({
//     order: [["createdAt", "DESC"]],
//   });
//   res.json(groups);
// };

// exports.create = async (req, res) => {
//   try {
//     const group = await Group.create(req.body);
//     res.json(group);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // exports.getOne = async (req, res) => {
// //   const group = await Group.findByPk(req.params.id, {
// //     include: [{ model: GroupMember, include: [{ model: User, as: "user" }] }],
// //   });

// //   if (!group) return res.status(404).json({ message: "Group not found" });

// //   res.json(group);
// // };

// const { Group, GroupMember, User, Album } = require("../models");

// exports.getOne = async (req, res) => {
//   try {
//     const group = await Group.findByPk(req.params.id, {
//       include: [
//         {
//           model: GroupMember,
//           as: "groupMembers",         // REQUIRED ALIAS
//           include: [
//             {
//               model: User,
//               as: "user"              // Alias from GroupMember.belongsTo(User)
//             }
//           ]
//         },
//         {
//           model: Album,
//           as: "albums"                // Alias from Group.hasMany(Album)
//         },
//         {
//           model: User,
//           as: "members"               // Alias from belongsToMany(User)
//         }
//       ]
//     });

//     if (!group) return res.status(404).json({ message: "Group not found" });

//     res.json(group);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch group details" });
//   }
// };

// exports.getMembers = async (req, res) => {
//   const members = await GroupMember.findAll({
//     where: { groupId: req.params.id },
//     include: [{ model: User, as: "user" }],
//   });

//   res.json(members);
// };

// exports.addMember = async (req, res) => {
//   const { userId } = req.body;

//   const member = await GroupMember.create({
//     groupId: req.params.id,
//     userId,
//   });

//   res.json(member);
// };

// exports.removeMember = async (req, res) => {
//   await GroupMember.destroy({
//     where: { groupId: req.params.id, userId: req.params.userId },
//   });

//   res.json({ message: "Member removed" });
// };

const { Group, GroupMember, User, Album } = require("../models");

exports.getAll = async (req, res) => {
  const groups = await Group.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(groups);
};

exports.create = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id, {
      include: [
        {
          model: GroupMember,
          as: "groupMembers",
          include: [
            {
              model: User,
              as: "user"
            }
          ]
        },
        {
          model: Album,
          as: "albums"
        },
        {
          model: User,
          as: "members"
        }
      ]
    });

    if (!group) return res.status(404).json({ message: "Group not found" });

    res.json(group);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch group details" });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const members = await GroupMember.findAll({
      where: { groupId: req.params.id },
      include: [{ model: User, as: "user" }]   // MUST MATCH ASSOCIATION
    });

    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch members" });
  }
};


exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId)
      return res.status(400).json({ message: "userId is required" });

    const member = await GroupMember.create({
      groupId: req.params.id,
      userId,
      roleInGroup: "STUDENT",
    });

    res.json(member);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add member" });
  }
};


exports.removeMember = async (req, res) => {
  try {
    await GroupMember.destroy({
      where: {
        groupId: req.params.id,
        userId: req.params.userId,
      },
    });

    res.json({ message: "Member removed" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove member" });
  }
};



exports.remove = async (req, res) => {
  await Group.destroy({ where: { id: req.params.id } });
  res.json({ message: "Group deleted" });
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findByPk(id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    await group.update(req.body);

    res.json({ message: "Group updated", group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update group" });
  }
};
