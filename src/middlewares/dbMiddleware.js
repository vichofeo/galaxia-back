import {index} from '../models/index';


async function switchSchema(req, res, next) {
    const {schema} = req.headers;
    if (!schema) {
      res.status(401);
      return next(new Error('No schema provided.'));
    }
    try {
      await loadDB(schema);
      return next();
    } catch (err) {
      res.status(401);
      return next(err);
    }
  }
  
  export default switchSchema;