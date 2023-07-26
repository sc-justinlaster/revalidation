/* eslint-disable */

export default async function handler(req: any, res: any) {
    console.log(`[revalidation]: Start. Request: ${JSON.stringify(req.body)}`);

    if (req.query.secret !== process.env.ISR_REVALIDATE_TOKEN) {
      console.log(`[revalidate]: invalid token passed in "secret" param "${req.query.secret}"`)
      return res.status(401).json({ message: 'Invalid token' })
    }
  
    try {
      var layoutUpdates = req.body.updates.filter((update: any) =>  update.entity_definition == "LayoutData");
      console.log(`[revalidate] Discovered ${layoutUpdates.length} layout updates.`);

      for await (const update of layoutUpdates) {
          let edgePpath = update.identifier;
          let actualPath = `/_site_${edgePpath.slice(0,-1)}`;//"/" + edgePpath.substring(edgePpath.indexOf('/') + 1);

          console.log(`[revalidate]: Revalidating edge path "${edgePpath}" as "${actualPath}"`);
         
          // This probably needs its own error handling, to allow the pages to revalidate.
          await res.revalidate(actualPath);
      }
      console.log("[revalidate]: Done!");
      return res.json({ revalidated: true })
    } catch (err) {
      console.log(`[revalidation]: Error during revalidation. Error: ${err}`);
      return res.status(500).send('Error revalidating')
    }
  }