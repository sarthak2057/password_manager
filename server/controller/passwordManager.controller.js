const passwordManager = require('../model/PasswordDetail.mongo');
const User = require('../model/User.mongo');

const getAllManagedPassword = async (req, res) => {
  const refreshToken = req.cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  const managedPassword = await passwordManager.find({
    email: foundUser.email,
  });
  res.json(managedPassword);
};

const addNewManagedPassword = async (req, res) => {
  const refreshToken = req.cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!req?.body?.website || !req?.body?.password) {
    return res.status(400).json({ message: 'Website or password required' });
  }
  try {
    const result = await passwordManager.create({
      website: req.body.website,
      email: foundUser.email,
      password: req.body.password,
      detail: req.body.detail,
    });
    res.status(201).json({ message: 'Password set successfully' }); //201 - created
  } catch (err) {
    console.log(err);
  }
};

const updateManagedPassword = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required' });
  }
  const setPassword = await passwordManager
    .findOne({ _id: req.body.id })
    .exec();
  if (!setPassword) {
    return res.status(204).json({ message: `No matchinig password set` });
  }
  if (req.body?.website) setPassword.website = req.body.website;
  if (req.body?.password) setPassword.password = req.body.password;
  if (req.body?.detail) setPassword.detail = req.body.detail;
  await setPassword.save();
  res.json({ message: 'Updated Successfully' });
};

const deleteManagedPassword = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: 'Particular setPassword is net selected' });

  const setPassword = await passwordManager
    .findOne({ _id: req.body.id })
    .exec();
  if (!setPassword) {
    return res.status(204).json({ message: 'No matching password set' }); //204 - No content
  }
  await passwordManager.deleteOne({ _id: req.body.id });
  res.json({ message: 'Delete Successfully' });
};

const getSetPassword = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Managed Password ID required' });

  const setPassword = await passwordManager.findOne({ _id: req.params.id });
  if (!setPassword) {
    return res.status(204).json({ message: 'No matching set password' });
  }
  res.json(setPassword);
};

module.exports = {
  getAllManagedPassword,
  addNewManagedPassword,
  updateManagedPassword,
  deleteManagedPassword,
  getSetPassword,
};
