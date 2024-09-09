import { type RequestHandler } from 'express';

const cursorController: RequestHandler = async (_, res) => {
  res.render('cursor');
};

export default cursorController;
