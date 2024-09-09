import { type RequestHandler } from 'express';
import apiError from '../lib/api-error';
import apiSuccess from '../lib/api-success';
import delay from '../lib/delay';
import offsetPaginationUseCase from '../use-cases/offset-pagination';
import queryParam from '../lib/query-param';

const apiOffsetController: RequestHandler = async (req, res) => {
  await delay(500);

  try {
    const data = await offsetPaginationUseCase(
      queryParam(req.query.offset, '0'),
      queryParam(req.query.limit, '20'),
      queryParam(req.query.sort, 'id'),
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

export default apiOffsetController;
