import { createApiServer } from 'src/servers/api.server';
import { createFilesServer } from 'src/servers/files.server';

async function bootstrap() {
  const apiServerUrl = await createApiServer();
  const filesServerUrl = await createFilesServer();
  return [apiServerUrl, filesServerUrl];
}
bootstrap().then((urls) => {
  console.log(`ApiServer is running on ${urls[0]}`);
  console.log(`AdminServer is running on ${urls[1]}`);
  console.log(`FilesServer is running on ${urls[2]}`);
});
