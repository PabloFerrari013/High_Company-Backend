import { Request, Response, NextFunction } from 'express'

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers['x-high-auth']

  if (authToken !== process.env.HEADERS_AUTH_TOKEN) {
    return res
      .status(401)
      .send('You do not have permission to perform this request.')
  }

  next()
}
