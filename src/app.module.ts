import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
//import { writeFileSync } from 'fs';
import { EnvConfig } from './core/config/env.config';
import { JoiValidationSchema } from './core/config/joi.validations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PokemonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  /*  constructor() {
    // console.log(process.env);
    writeFileSync('.env.json', JSON.stringify(process.env));
  } */
}
