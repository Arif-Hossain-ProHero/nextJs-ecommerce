import nc from 'next-connect';
import db from '../../../utils/db';
import User from '../../../models/User';
import { signToken } from '../../../utils/auth';
import bcrypt from 'bcryptjs';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const NewUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });
  const user = await NewUser.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default handler;
