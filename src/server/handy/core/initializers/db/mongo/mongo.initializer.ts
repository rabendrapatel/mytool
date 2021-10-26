import { Injectable } from "@handy/core/decorators";
import { HandyConfigService, HandyErrorService } from '@services';
import { connect, connection, set as mongooseSet } from 'mongoose';
import { HandyError } from "@handy/types";

@Injectable(true)
export class HandyMongoDbInitializer {

  private connectionUri = this.configService.getMongoConnectionUri();

  constructor (private configService: HandyConfigService, private errorService: HandyErrorService) {

    mongooseSet('debug', this.configService.get().mongoDB.mongooseDebugMode);

  }

  connect(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      connect(this.connectionUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        autoIndex: this.configService.get().mongoDB.mongooseAutoIndexing
      })

      connection.on('error', (connectionErr: Error) => {
        let HandyError: HandyError = this.errorService.register(connectionErr, 'high');
        reject(HandyError);

        this.connect();

      })

      connection.on('connected', () => {

        if (__isMasterCluster) {
          handySuccessLog('Connected to mongoDB: ' + this.configService.get().mongoDB.dbName + ' @ ' + this.configService.get().mongoDB.host);
        }

        resolve(true);

      })

    })

  }

}