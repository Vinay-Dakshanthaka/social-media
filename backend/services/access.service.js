const { Album, Media, Permission, GroupMember } = require("../models");

async function getUserGroups(userId) {
  const rows = await GroupMember.findAll({
    where: { userId },
    attributes: ["groupId"],
  });
  return rows.map((r) => r.groupId);
}

async function fetchAlbum(resourceType, resourceId) {
  if (resourceType === "Album") {
    return Album.findByPk(resourceId);
  }
  const media = await Media.findByPk(resourceId, {
    include: [{ model: Album, as: "album" }],
  });
  return media?.album || null;
}

async function canAccess(user, resourceType, resourceId, action) {
  if (!user) return false;

  // Admin can do anything
  if (user.role === "ADMIN") return true;

  const album = await fetchAlbum(resourceType, resourceId);
  if (!album) return false;

  const userGroups = await getUserGroups(user.id);

  // Visibility rules
  switch (album.visibility) {
    case "ADMINS_ONLY":
      return false;
    case "PRIVATE":
      if (album.createdById !== user.id) return false;
      break;
    case "GROUP":
      if (!userGroups.includes(album.groupId)) return false;
      break;
    case "ALL_STUDENTS":
      break;
  }

  // Students restrictions
  if (user.role === "STUDENT" && !["view", "comment", "like"].includes(action)) {
    return false;
  }

  // Custom Permission: User
  const userPerm = await Permission.findOne({
    where: {
      subjectType: "User",
      subjectId: user.id,
      resourceType,
      resourceId,
    },
  });

  if (userPerm) {
    if (action === "view") return userPerm.canView;
    if (action === "comment") return userPerm.canComment;
    if (action === "download") return userPerm.canDownload;
    if (action === "share") return groupPerm.canShare;
  }

  // Custom Permission: Group
  const groupPerm = await Permission.findOne({
    where: {
      subjectType: "Group",
      subjectId: userGroups,
      resourceType,
      resourceId,
    },
  });

  if (groupPerm) {
    if (action === "view") return groupPerm.canView;
    if (action === "comment") return groupPerm.canComment;
    if (action === "download") return groupPerm.canDownload;
    if (action === "share") return groupPerm.canShare;
  }

  return true;
}

module.exports = { canAccess };
