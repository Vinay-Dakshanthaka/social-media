const { Permission } = require("../models");

exports.set = async (req, res) => {
  const { subjectType, subjectId, resourceType, resourceId, ...rules } = req.body;

  const [perm, created] = await Permission.findOrCreate({
    where: { subjectType, subjectId, resourceType, resourceId },
    defaults: rules,
  });

  if (!created) await perm.update(rules);

  res.json(perm);
};
