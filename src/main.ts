import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet'
var cors = require('cors');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const options = new DocumentBuilder()
    .setTitle('team API')
    .setDescription('API to fetch/insert team details')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const server = await app.listen(process.env.PORT || 3000, function(){
  console.log("NestJs server listening on port ", process.env.PORT || 3000);
});
  server.setTimeout(9900000);
  app.use(helmet());
  app.enableCors()
}
bootstrap();
