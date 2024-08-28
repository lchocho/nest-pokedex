import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }), //debe estar definido antes que se use la variabke de entorno

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemonsdb'
    }),  
    PokemonModule, 
    CommonModule, 
    SeedModule
  ],  
})
export class AppModule {}
