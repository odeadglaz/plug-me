import {
    Request,
    Response
} from 'express';

const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

export const handler = async(req: Request, res: Response) => {
    await wait();

    res.send('Hello World \o/');
};
