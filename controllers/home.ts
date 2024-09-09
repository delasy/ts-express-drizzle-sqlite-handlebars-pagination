import { type RequestHandler } from 'express';

const homeController: RequestHandler = async (_, res) => {
  res.render('index');
};

export default homeController;
