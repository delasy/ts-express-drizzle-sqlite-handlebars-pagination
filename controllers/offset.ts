import { type RequestHandler } from 'express';

const offsetController: RequestHandler = async (_, res) => {
  res.render('offset');
};

export default offsetController;
