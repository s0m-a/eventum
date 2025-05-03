import { Module } from '@nestjs/common';
import {  ConfigService } from '@nestjs/config';
import {ModelDefinition,MongooseModule} from "@nestjs/mongoose";
@Module({
    imports:[MongooseModule.forRootAsync({
        useFactory: (configService: ConfigService)=>({
            uri: configService.get('MONGODB_URL'),
        }),
        inject: [ConfigService],
    })]
})
export class DatabaseModule {
    /**
     * creating a helpers function forFeature,
     * MongooseModule.forFeature() function registers specific models onto 
     * that shared connection. 
     */
    static forFeature(models: ModelDefinition[]) {
      return MongooseModule.forFeature(models);
    }
  }
