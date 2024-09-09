import { type RequestHandler } from 'express';
import apiError from '../lib/api-error';
import apiSuccess from '../lib/api-success';
import cursorPaginationUseCase from '../use-cases/cursor-pagination';
import delay from '../lib/delay';
import queryParam from '../lib/query-param';

const apiCursorController: RequestHandler = async (req, res) => {
  await delay(500);

  try {
    const data = await cursorPaginationUseCase(
      queryParam(req.query.cursor, ''),
      queryParam(req.query.limit, '20'),
    );

    res.json(apiSuccess(data));
  } catch (err) {
    if (err instanceof Error) {
      res.json(apiError(err.message));
    } else {
      res.json(apiError('Internal Server Error'));
    }
  }
};

export default apiCursorController;
