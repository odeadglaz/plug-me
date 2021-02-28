import {
    Request,
    Response
} from 'express';
import getPluginsHash from '../../../lib/getPluginsHash';

export const handler = (req: Request, res: Response) => {
    res
        .status(200)
        .type('text')
        .send(getPluginsHash());
};
