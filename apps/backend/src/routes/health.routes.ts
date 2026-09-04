import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: '1Fi Assessment API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
