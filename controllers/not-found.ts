import { type RequestHandler } from 'express';

const notFoundController: RequestHandler = async (_, res) => {
  res.render('errors/404');
};

export default notFoundController;
