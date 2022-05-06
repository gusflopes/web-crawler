import { takeScreenshot } from './crawler';
import { getLawsuits } from './crawlers/tjms/get-lawsuit';

(async function main(): Promise<void> {
  const start = Date.now();
  // await takeScreenshot('name', 'https://www.gusflopes.dev/');

  const jobs = [1, 2, 3, 4, 5];
  const queue = [];
  for (const job of jobs) {
    const result = await getLawsuits(job);
    queue.push(result);
  }

  console.log(queue);

  // await getLawsuits();
  // console.log(start);
  console.log(`Finished ${queue.length} jobs in ${Date.now() - start} ms`);
})();
