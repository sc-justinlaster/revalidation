/* eslint-disable */

export default async function handler(req: any, res: any) {
    console.log(`[echo]: Start. Request: ${JSON.stringify(req.body)}`);
    return res.status(200);
  }